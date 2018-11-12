import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { ModeloCompleto } from '../../models/modeloCompleto.modelo';
import { ModeloService, ClienteService, UtilidadesService, OrdenadorVisualService } from '../../services/service.index';
import { FolioLinea } from '../../models/folioLinea.models';
import { FolioService } from '../../services/folio/folio.service';
import { Cliente } from '../../models/cliente.models';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Folio } from '../../models/folio.models';
import { BuscadorRapidoService } from '../../components/buscador-rapido/buscador-rapido.service';
import { BuscadorRapido } from '../../models/buscador-rapido.models';
import Swal from 'sweetalert2';
import { Laser } from '../../models/laser.models';
import { IfStmt } from '@angular/compiler';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';

@Component({
  selector: 'app-registro-de-lineas',
  templateUrl: './registro-de-lineas.component.html',
  styles: []
})
export class RegistroDeLineasComponent implements OnInit {

  nivelDeUrgencia = [
    {nivel: 'ALMACEN', checked: false, class: 'radio-col-cyan'},
    {nivel: 'PRODUCCIÓN', checked: true, class: 'radio-col-black'},
    {nivel: 'URGENTE', checked: false, class: 'radio-col-red'},
    {nivel: 'MUESTRA', checked: false, class: 'radio-col-yellow'},
  ];

  termino: string = '';
  // modelo: ModeloCompleto;
  modelosBuscados: ModeloCompleto[] = [];
  cliente: Cliente = null;
  folio: Folio;
  folioLinea: FolioLinea = new FolioLinea();
  toStr = JSON.stringify;

  laserSeleccionado: string = '';

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
    public _ordenadorVisualService: OrdenadorVisualService
  ) {

    activatedRoute.params.subscribe(params => {
      // Si trae un id entonces lo buscamos.
      const id = params['id'];
      if (id) {
        this.cargarDatosDeFolio(id);
      }
    });

    this._buscadorRapidoService.nombreDeElemento = 'modelo';
    this._buscadorRapidoService.callback = (modelo: ModeloCompleto) => {
      // Este callback retorna el objeto modeloCompleto para asignarlo
      // y despues guardarlo.
      this.folioLinea.modeloCompleto = modelo;
      this._ordenadorVisualService.modeloCompleto = modelo;
      this._ordenadorVisualService.generar();
      this.termino = '';
    };

    this.folioLinea.nivelDeUrgencia = this.nivelDeUrgencia[1].nivel;
    this.folioLinea.almacen = false;
    this._buscadorRapidoService.reiniciar();      

  }

  ngOnInit() {}
  
  cargarDatosDeFolio( id: string ) {
    this._preLoaderService.cargando = true;
        this._folioService.cargarFolio(id).subscribe((folio: any) => {
          this.folio = folio;
          this.folio.folioLineas.forEach(linea => {
            linea.eliminar = false;
          });
          this.cliente = this.folio.cliente;
          this._preLoaderService.cargando = false;
        });
  }

  guardar() {
    // Comprobar si hay un modelo seleccioando.
    if (!this.folioLinea.modeloCompleto) {
      swal(
        'Modelo no seleccionado.',
        'Es obligatorio seleccionar un modelo.',
        'error'
      );
      return;
    }
    // Comprobar el nivel de urgencia.

    if (!this.folioLinea.nivelDeUrgencia) {
      swal(
        'Prioridad no definida.',
        'Es obligatorio definir la prioridad.',
        'error'
      );
      return;
    }

    if ( this.laserarPedido ) {
      if ( this.laserSeleccionado) {
        this.folioLinea.laserCliente._id = this.laserSeleccionado;
      } else {
        console.log(this.laserSeleccionado);

        swal(
          'Marca laser no seleccionada.',
          // TODO: Cambiar a: "El pedido esta marcado para laserarse..."
          'El pedido esta marcado como laserado pero no seleccionaste una marca laser .',
          'error'
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
      // Si no es nulo entonces si agregamos la nueva linea.
      if (folioLinea1) {
        this.folio.folioLineas.push(folioLinea1);
      }
      
      this.folioLinea = new FolioLinea();
      this._buscadorRapidoService.reiniciar();
      this.laserSeleccionado = '';
      this.modificandoLinea = false;
      this.folioLinea.nivelDeUrgencia = 'PRODUCCIÓN';
      this.laserarPedido = false;  
      this._ordenadorVisualService.limpiar();

    });
  }

  seleccionarLaserado( id: string ) {
    // TODO: LIMPIAR ESTE LOG  . 
    console.log('El id del laserado: ' + id);

    // Filtramos los laserados
    const laserado: Laser = this.cliente.laserados.find( laser => {
      return laser._id === id;
    });

    if ( laserado ) {
      this.folioLinea.laserCliente = laserado;
      this.laserSeleccionado = laserado._id;
    }
  }

  buscarModelo(dato: string) {
    this.termino = dato;

    if (!this.termino) {
      // this.modelosBuscados = [];
      this._buscadorRapidoService.limpiarLista();
      return;
    }

    this._modeloService.buscarModeloCompleto(this.termino).subscribe(resp => {
      // console.log(resp);
      // this.modelosBuscados = resp;
      const datos: BuscadorRapido[] = [];
      resp.forEach(modelo => {
        datos.push( new BuscadorRapido(this.nombrarModelo(modelo), modelo));
      });
      this._buscadorRapidoService.elementos = datos;
    });
  }

  nombrarModelo (modelo: ModeloCompleto) {
    // TODO: Sustituir esta linea por la constante para nombres completos. 
    let nombreCompleto: string =
      modelo.modelo.modelo +
      '-' +
      modelo.tamano.tamano +
      '-' +
      modelo.color.color;

    nombreCompleto = modelo.terminado.terminado
      ? nombreCompleto + '-' + modelo.terminado.terminado
      : nombreCompleto;
    nombreCompleto = modelo.laserAlmacen.laser
      ? nombreCompleto + '-' + modelo.laserAlmacen.laser
      : nombreCompleto;
    nombreCompleto = modelo.versionModelo.versionModelo
      ? nombreCompleto + '-' + modelo.versionModelo.versionModelo
      : nombreCompleto;

      return nombreCompleto;
  }

  // TODO: LIMPIAR ESTE COMENTARIO. 
  // seleccionarModelo(modelo: ModeloCompleto) {
  //   this.modelo = modelo;
  //   this.termino = '';
  // }

  nuevaMarcaLaser() {
    swal({
      title: `Nueva marca laser`,
      html: `Ingresa la nueva marca laser para ${this.cliente.nombre}.`,
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: value => {
        return !value && '¡Necesitas escribir algo!';
      }
    }).then(resp => {

      if ( resp.value) {
        this._clienteService
          .guardarNuevaMarcaLaser(this.cliente._id, resp.value)
          .subscribe((cliente: any) => {
            this.cliente = cliente;
          });
      }
    });
  }

  modificar(linea: FolioLinea) {
    this._buscadorRapidoService.reiniciar();
    this.termino = '';
    
    this.folioLinea = linea;
    if (this.folioLinea.laserCliente) {
      this.laserSeleccionado = this.folioLinea.laserCliente._id;
      this.laserarPedido = true;
    }
    this.modificandoLinea = true;
    // Seleccionamos el modelo completo en el buscador rápido. 
    this._buscadorRapidoService.seleccionarElemento(null, this.nombrarModelo(linea.modeloCompleto), linea.modeloCompleto);
    // Cargamos los modelos completos en el servicio de selección de procesos. 
    this._ordenadorVisualService.cargarParaModifcarLinea(linea);
  }

  eliminarLinea( linea: FolioLinea ) {

    swal({
      title: '¿Quieres eliminar este pedido?',
      text: 'Esta acción no se puede deshacer.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, no lo elimines.',
      confirmButtonText: '¡Si, elimínalo!'
    }).then((result) => {
      if (result.value) {
        linea.eliminar = true;
        this._folioService.eliminarLinea( this.folio._id, linea._id).subscribe( ()  => {
          // Removemos para no tener que recargar.

          linea.eliminar = true;
          this._util.delay(700).then(() => {
            this.folio.folioLineas = this.folio.folioLineas.filter( fila => {
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

    this.folioLinea = new FolioLinea();
    this.laserSeleccionado = '';
    this.laserarPedido = false;
    this.modificandoLinea = false;
    this.termino = '';
    this._buscadorRapidoService.reiniciar();
    this.folioLinea.nivelDeUrgencia = 'PRODUCCIÓN';
    this.cargarDatosDeFolio(this.folio._id);
    this._ordenadorVisualService.limpiar();
  }

  
}