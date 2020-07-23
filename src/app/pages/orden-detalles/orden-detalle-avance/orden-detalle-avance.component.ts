import { Component, OnInit, Input, Output, Renderer2 } from '@angular/core'
import {
  FolioNewService,
  OrdenLigera
} from '../../../services/folio/folio-new.service'
import { Orden } from '../../../models/orden.models'
import { Departamento } from '../../../models/departamento.models'
import { Trayecto } from '../../../models/trayecto.models'
import {
  ProcesoService,
  iProcesoPool
} from '../../../services/proceso/proceso.service'
import { KeyValue } from '@angular/common'
import { DepartamentoService } from '../../../services/departamento/departamento.service'
import {
  UsuarioService,
  UsuarioLight
} from '../../../services/usuario/usuario.service'
import {
  ParametrosService,
  ScannerDepartamentoGestion
} from '../../../services/parametros.service'

@Component({
  selector: 'app-orden-detalle-avance',
  templateUrl: './orden-detalle-avance.component.html',
  styleUrls: ['./orden-detalle-avance.component.css']
})
export class OrdenDetalleAvanceComponent implements OnInit {
  _orden: OrdenLigera
  ordenConsultada: Orden
  // trayectoSeleccionado: Trayecto = null

  rutaSeg: any = null

  procesoSeleccionado: string = null

  ignorarHasta = 0
  estaciones: ScannerDepartamentoGestion[]
  usuarios: UsuarioLight[]
  @Input() set orden(orden: OrdenLigera) {
    this.rutaSeg = null
    if (!orden) return
    this.ordenConsultada = null
    this.folioService
      .detalleOrden(orden.folio, orden.pedido, orden.orden)
      .subscribe(ordenRes => {
        this.ordenConsultada = ordenRes
        this._orden = orden as OrdenLigera
      })
  }

  get orden(): OrdenLigera {
    return this._orden
  }
  @Input() set datos({ folio, pedido, orden }) {
    this.rutaSeg = null
    if (!orden) return
    this.ordenConsultada = null
    this.folioService.detalleOrden(folio, pedido, orden).subscribe(ordenRes => {
      if (ordenRes.terminada) {
        this.ignorarHasta = 1000
      } else {
        for (const k in ordenRes.ruta) {
          if (ordenRes.ruta.hasOwnProperty(k)) {
            const value = ordenRes.ruta[k]
            if (value.ubicacionActual) {
              this.ignorarHasta = value.consecutivo
              break
            }
          }
        }
      }

      this.ordenConsultada = ordenRes
    })
  }

  get datos() {
    return null
  }

  constructor(
    private departamentoService: DepartamentoService,
    private folioService: FolioNewService,
    private procesoService: ProcesoService,
    private parametrosService: ParametrosService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.departamentoService.findAllPool()

    this.cargarEstacionesDeEscaneo()
    this.cargarUsuarios()
  }

  cargarEstacionesDeEscaneo() {
    if (!this.parametrosService.poolEstacionesDeEscaneo) {
      this.parametrosService
        .findAllEstacionesDeEscaneo()
        .subscribe(estaciones => {
          this.estaciones = estaciones
        })
    } else {
      this.estaciones = this.parametrosService.poolEstacionesDeEscaneo
    }
  }

  cargarUsuarios() {
    if (
      this.usuarioService.poolLight.length === 0 &&
      !this.usuarioService.cargandoPool
    ) {
      this.usuarioService.findAllLigthPool().subscribe(x => (this.usuarios = x))
    } else {
      this.usuarios = this.usuarioService.poolLight
    }
  }

  cargarDetalle(subRuta: any, proceso: string) {
    if (this.rutaSeg === subRuta) {
      this.rutaSeg = null
    } else {
      this.rutaSeg = subRuta
      this.procesoSeleccionado = proceso
    }
  }

  encontrarProceso(id: string): iProcesoPool {
    return this.procesoService.pool.find(x => x._id === id.split('-')[0])
  }

  ordenarRuta = (a: KeyValue<string, any>, b: KeyValue<string, any>) => {
    return a.value.consecutivo > b.value.consecutivo ? 1 : -1
  }

  encontrarDepartamento(id: string): Departamento {
    if (!id) return null
    return this.departamentoService.pool.find(x => x._id == id)
  }

  calcularTotal(_10: number, total: number): number {
    return (total * 1000) / (_10 / 10)
  }

  totalDeBoton(cantidades: any[]): number {
    return cantidades.reduce(
      (a, b) => (a += this.calcularTotal(b.peso10Botones, b.pesoTotalBoton)),
      0
    )
  }

  esteDepartamento(id) {
    let a = this.estaciones.find(x => x.departamento._id == id)
    delete a.usuarios
    return a
  }

  obtenerDatos(rutaSeg, key) {
    if (rutaSeg.hasOwnProperty('datos')) return rutaSeg.datos[key]
  }

  obtenerUsuario(idUsuario) {
    if (!this.usuarios || !idUsuario) return

    let usuario = this.usuarios.find(x => {
      return x._id === idUsuario
    }).nombre

    if (usuario) return usuario
  }
}
