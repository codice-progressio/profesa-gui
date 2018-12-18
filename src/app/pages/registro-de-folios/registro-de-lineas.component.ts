import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";
import { ModeloCompleto } from "../../models/modeloCompleto.modelo";
import {
  ModeloService,
  ClienteService,
  UtilidadesService,
  OrdenadorVisualService,
  ManejoDeMensajesService
} from "../../services/service.index";
import { FolioLinea, ColoresTenidos } from "../../models/folioLinea.models";
import { FolioService } from "../../services/folio/folio.service";
import { Cliente } from "../../models/cliente.models";
import { ActivatedRoute, Router } from "@angular/router";
import { Folio } from "../../models/folio.models";
import { BuscadorRapidoService } from "../../components/buscador-rapido/buscador-rapido.service";

import { Laser } from "../../models/laser.models";
import { PreLoaderService } from "../../components/pre-loader/pre-loader.service";
import { ModeloCompletoPipe } from "../../pipes/modelo-completo.pipe";
import { BuscadorRapido } from "src/app/components/buscador-rapido/buscador-rapido";
import { log } from "util";
import { ModeloCompletoAutorizacion } from "../../models/modeloCompletoAutorizacion.model";
import { Subscriber } from "rxjs";

@Component({
  selector: "app-registro-de-lineas",
  templateUrl: "./registro-de-lineas.component.html",
  styles: []
})
export class RegistroDeLineasComponent implements OnInit {
  nivelDeUrgencia = [
    { nivel: "ALMACEN", checked: false, class: "radio-col-cyan" },
    { nivel: "PRODUCCIÓN", checked: true, class: "radio-col-black" },
    { nivel: "URGENTE", checked: false, class: "radio-col-red" },
    { nivel: "MUESTRA", checked: false, class: "radio-col-yellow" }
  ];

  // Si la cantidad del pedido supera a la suma de los
  // colores de tenido se pone este en true para mostrar la alerta.
  sumaTenidoSuperaCantidad: boolean = false;

  // Para mas y menos
  mostrandoInfoFolio: boolean = false;

  termino: string = "";
  // modelo: ModeloCompleto;
  modelosBuscados: ModeloCompleto[] = [];
  cliente: Cliente = null;
  folio: Folio;
  folioLinea: FolioLinea = null;
  toStr = JSON.stringify;

  laserSeleccionado: string = "";

  laserarPedido: boolean = false;

  modificandoLinea: boolean = false;

  constructor(
    public _modeloService: ModeloService,
    public _folioService: FolioService,
    public activatedRoute: ActivatedRoute,
    public _clienteService: ClienteService,
    public _buscadorRapidoService: BuscadorRapidoService,
    public router: Router,
    public _util: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _ordenadorVisualService: OrdenadorVisualService,
    private modeloCompletoPipe: ModeloCompletoPipe,
    private _msjService: ManejoDeMensajesService
  ) {
    activatedRoute.params.subscribe(params => {
      // Si trae un id entonces lo buscamos.
      const id = params["id"];
      if (id) {
        this.cargarDatosDeFolio(id);
      }
    });

    this._buscadorRapidoService.limpiarTodo();
    this._buscadorRapidoService.nombreDeElemento = "modelo";
    this._buscadorRapidoService.promesa = () => {
      return new Promise((resolve, reject) => {
        // Primero nos aseguramos que los datos del client esten actualizados.
        this._clienteService.findById(this.cliente._id).subscribe(resp => {
          this.cliente = <Cliente>resp;
          // Buscamos el modelo.
          this._modeloService
            .buscarModeloCompleto(
              this._buscadorRapidoService.termino,
              this._buscadorRapidoService.desde,
              this._buscadorRapidoService.limite
            )
            .subscribe((resp: ModeloCompleto[]) => {
              const d: BuscadorRapido[] = [];
              resp.forEach(mc => {
                const mca = <ModeloCompletoAutorizacion>(
                  this.cliente.modelosCompletosAutorizados.find(x => {
                    return x.modeloCompleto._id === mc._id;
                  })
                );

                const br = new BuscadorRapido();
                br.nombre = this.modeloCompletoPipe.transform(mc);
                br.objeto = mc;

                if (!mca) {
                  br.atenuar = true;
                  br.mensajeAtenuacion = "No autorizado.";
                } else if (!mca.autorizado) {
                  br.atenuar = true;
                  if (mca.autorizacionSolicitada && !mca.autorizado) {
                    br.mensajeAtenuacion = "Aut. pendiente.";
                    br.claseAtenuacion = "text-warning";
                  } else {
                    br.mensajeAtenuacion = "No autorizado.";
                    br.claseAtenuacion = "text-danger";
                  }
                } else {
                  br.atenuar = false;
                  br.mensajeAtenuacion = "Autorizado";
                  br.claseAtenuacion = "text-success ";
                }

                d.push(br);
              });
              this._buscadorRapidoService.totalDeElementosBD = this._modeloService.total;
              resolve(d);
            });
        });
      });
    };
    this._buscadorRapidoService.callbackElementoSeleccionado = () => {
      this.folioLinea.modeloCompleto = <ModeloCompleto>(
        this._buscadorRapidoService.elementoSeleccionado.objeto
      );
      this._ordenadorVisualService.modeloCompleto = this.folioLinea.modeloCompleto;
      this._ordenadorVisualService.generar();
    };

    this._buscadorRapidoService.callbackAtenuar = () => {
      // Comprobamos que el clilente tenga autorizado el modelo.
      const md: ModeloCompleto = <ModeloCompleto>(
        this._buscadorRapidoService.elementoSeleccionado.objeto
      );
    
      if (
        this.cliente.modelosCompletosAutorizados.filter(x => x._id === md._id)
          .length < 1
      ) {
        this._msjService.solicitarPermiso(
          "El modelo no esta autorizado, quieres pedir autorizacion?",
          () => {
            this._clienteService
              .solicitarAutorizacionDeModeloCompleto(this.cliente, md)
              .subscribe();
          }
        );
        return false;
      }
      return true;
    };
  }

  ngOnInit() {}

  cargarDatosDeFolio(id: string) {
    this._folioService.cargarFolio(id).subscribe((folio: any) => {
      this.folio = folio;
      this.folio.folioLineas.forEach(linea => {
        linea.eliminar = false;
      });
      this.cliente = this.folio.cliente;
    });
  }

  guardar() {
    // Comprobar si hay un modelo seleccioando.
    if (!this.folioLinea.modeloCompleto) {
      swal(
        "Modelo no seleccionado.",
        "Es obligatorio seleccionar un modelo.",
        "error"
      );
      return;
    }
    // Comprobar el nivel de urgencia.

    if (!this.folioLinea.nivelDeUrgencia) {
      swal(
        "Prioridad no definida.",
        "Es obligatorio definir la prioridad.",
        "error"
      );
      return;
    }

    // Comprobar la cantidad a teñir.
    if (this.sumaTenidoSuperaCantidad) {
      swal(
        "Cantidad no concordante.",
        "La cantidad a teñir supera la cantidad del pedido.",
        "error"
      );
      return;
    }

    if (this.laserarPedido) {
      if (this.laserSeleccionado) {
        this.folioLinea.laserCliente = this.cliente.laserados.find(
          x => x._id === this.laserSeleccionado
        );
        console.log(this.folioLinea.laserCliente);
      } else {
        swal(
          "Marca laser no seleccionada.",
          // TODO: Cambiar a: "El pedido esta marcado para laserarse..."
          "El pedido esta marcado como laserado pero no seleccionaste una marca laser .",
          "error"
        );
        return;
      }
    } else {
      this.folioLinea.laserCliente = null;
    }

    // Cargamos los procesos especiales en el folio si es que hay.
    this.folioLinea.procesos = this._ordenadorVisualService.obtenerProcesos();

    // Lo guardamos.
    this._folioService
      .guardarLinea(this.folio._id, this.folioLinea)
      .subscribe(folioLinea1 => {
        this.cargarDatosDeFolio(this.folio._id);
        this.cancelarModificacion();
        this._buscadorRapidoService.limpiarTodoMenosCallback();
      });
  }

  seleccionarLaserado(id: string) {
    // TODO: LIMPIAR ESTE LOG  .

    // Filtramos los laserados
    const laserado: Laser = this.cliente.laserados.find(laser => {
      return laser._id === id;
    });

    if (laserado) {
      this.folioLinea.laserCliente = laserado;
      this.laserSeleccionado = laserado._id;
    }
  }

  nuevaMarcaLaser() {
    swal({
      title: `Nueva marca laser`,
      html: `Ingresa la nueva marca laser para ${this.cliente.nombre}.`,
      input: "text",
      inputValue: "",
      showCancelButton: true,
      inputValidator: value => {
        return !value && "¡Necesitas escribir algo!";
      }
    }).then(resp => {
      if (resp.value) {
        this._clienteService
          .guardarNuevaMarcaLaser(this.cliente._id, resp.value)
          .subscribe((cliente: any) => {
            this.cliente = cliente;
          });
      }
    });
  }

  modificar(linea: FolioLinea) {
    // this._buscadorRapidoService.reiniciar();
    this.termino = "";

    this.folioLinea = linea;
    if (this.folioLinea.laserCliente) {
      this.laserSeleccionado = this.folioLinea.laserCliente._id;
      this.laserarPedido = true;
    }
    this.modificandoLinea = true;
    // Seleccionamos el modelo completo en el buscador rápido.
    // this._buscadorRapidoService.seleccionarElemento(null, this.nombrarModelo(linea.modeloCompleto), linea.modeloCompleto);
    // Cargamos los modelos completos en el servicio de selección de procesos.
    this._ordenadorVisualService.cargarParaModifcarLinea(linea);
  }

  eliminarLinea(linea: FolioLinea) {
    swal({
      title: "¿Quieres eliminar este pedido?",
      text: "Esta acción no se puede deshacer.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "No, no lo elimines.",
      confirmButtonText: "¡Si, elimínalo!"
    }).then(result => {
      if (result.value) {
        linea.eliminar = true;
        this._folioService
          .eliminarLinea(this.folio._id, linea._id)
          .subscribe(() => {
            // Removemos para no tener que recargar.

            linea.eliminar = true;
            this._util.delay(700).then(() => {
              this.folio.folioLineas = this.folio.folioLineas.filter(fila => {
                if (linea._id !== fila._id) {
                  return true;
                }
              });
            });
          });
      }
    });
  }

  cancelarModificacion() {
    this.folioLinea = null;
    this.laserSeleccionado = "";
    this.laserarPedido = false;
    this.modificandoLinea = false;
    this.termino = "";
    // this._buscadorRapidoService.reiniciar();
    this.cargarDatosDeFolio(this.folio._id);
    this._ordenadorVisualService.limpiar();
  }

  agregarColorTenido() {
    const subTotal: number = this.calcularSumaTenido();
    const ct = new ColoresTenidos();
    // ct.color = "";
    const restante = this.folioLinea.cantidad - subTotal;
    ct.cantidad = restante > 0 ? restante : 0;
    this.folioLinea.coloresTenidos.push(ct);
  }

  eliminarColorTenido(i: number) {
    this.folioLinea.coloresTenidos.splice(i, 1);
    this.calcularSumaTenido();
  }

  calcularSumaTenido(): number {
    let t = 0;
    this.folioLinea.coloresTenidos.forEach(x => {
      t += x.cantidad;
    });
    this.sumaTenidoSuperaCantidad = t > this.folioLinea.cantidad;
    return t;
  }

  trackByFn(index: any) {
    return index;
  }

  agregarPedido() {
    this.folioLinea = new FolioLinea();

    this.folioLinea.nivelDeUrgencia = this.nivelDeUrgencia[1].nivel;
    this.folioLinea.almacen = false;
    // this._buscadorRapidoService.reiniciar();
  }
}
