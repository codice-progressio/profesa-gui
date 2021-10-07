import { Component, OnInit } from '@angular/core'
import { Pedido } from '../../../models/pedido.model'
import { PedidoService } from '../../../services/pedido.service'
import { ActivatedRoute, Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { ContactoService } from '../../../services/contacto.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { ExcelService } from 'src/app/services/excel.service'
import { Usuario } from 'src/app/models/usuario.model'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { ParametrosService } from 'src/app/services/parametros.service'
import { GpsService, PosicionDeGeolocalizacion } from '@codice-progressio/gps'

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  constructor(
    private parametrosService: ParametrosService,
    private usaurioService: UsuarioService,
    private excelService: ExcelService,
    private notiService: ManejoDeMensajesService,
    private pedidoService: PedidoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gpsService: GpsService
  ) {}
  pedidos: Pedido[] = []
  usuario: Usuario

  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    this.estaCargandoBuscador?.next(value)
  }

  estaCargandoBuscador: BehaviorSubject<boolean>
  private _termino: string
  public get termino(): string {
    return this._termino
  }

  public set termino(value: string) {
    this._termino = value
    this.buscar(value)
  }

  ngOnInit(): void {
    this.cargar()

    this.comprobarUsuario()
    this.comprobarGPS()
  }

  geo: PosicionDeGeolocalizacion = undefined

  comprobarGPS() {
    this.gpsService.posicionActual.subscribe(
      p => {
        this.geo = p
      },
      err => {
        this.geo = undefined
        alert(
          'No se puede acceder a la ubicación. No podras generar nuevos pedidos'
        )
      }
    )
  }

  comprobarUsuario() {
    if (!this.usaurioService.usuarioOffline) {
      this.parametrosService.offline.findById(0).subscribe(
        p => {
          this.usaurioService.usuarioOffline = p.usuario_registrado
          this.usuario = this.usaurioService.usuarioOffline
        },
        err => {
          this.notiService.toastErrorMensaje(
            'No se encontro un registro de usuario valido. Inicia sesión de nuevo.'
          )
          this.router.navigate(['/'])
        }
      )
    } else this.usuario = this.usaurioService.usuarioOffline
  }

  eliminar(pedido: Pedido) {
    this.notiService.confirmacionDeEliminacion(
      'Esta acción no se puede deshacer',
      () => {
        this.pedidoService.offline.delete(pedido._id).subscribe(
          () => {
            this.pedidos = this.pedidos.filter(x => x._id !== pedido._id)
          },
          err => {
            console.log(err)
          }
        )
      }
    )
  }

  cargar() {
    this.cargando = true
    this.pedidoService.offline.contarDatos().subscribe(limit => {
      this.pedidoService.offline.findAll({ skip: 0, limit }).subscribe(
        datos => {
          this.pedidos = datos
          this.cargando = false
        },
        err => {
          console.log(err)
          this.cargando = false
        }
      )
    })
  }

  buscar(termino: string) {
    this.cargando = true
    this.pedidoService.buscarTermino(termino).subscribe(
      pedidos => {
        this.cargando = false
        this.pedidos = pedidos
      },
      () => (this.cargando = false)
    )
  }

  editar(pedido: Pedido) {
    this.router.navigate(['modificar', pedido._id], {
      relativeTo: this.activatedRoute
    })
  }

  detalle(pedido: Pedido) {
    this.router.navigate(['detalle', pedido._id], {
      relativeTo: this.activatedRoute
    })
  }

  compartir(pedido: Pedido) {
    this.excelService.pedidoComoHojaDeExcel(pedido).then(
      () => {},
      e => console.error(e)
    )
  }
}
