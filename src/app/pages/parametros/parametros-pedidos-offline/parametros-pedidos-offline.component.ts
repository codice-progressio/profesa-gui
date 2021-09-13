import { Component, OnInit } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { ContactoService } from '../../../services/contacto.service'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { ListaDePreciosService } from '../../../services/lista-de-precios.service'
import { Offline, OfflineService } from '../../../services/offline.service'

@Component({
  selector: 'app-parametros-pedidos-offline',
  templateUrl: './parametros-pedidos-offline.component.html',
  styleUrls: ['./parametros-pedidos-offline.component.css']
})
export class ParametrosPedidosOfflineComponent implements OnInit {
  totalUsuarios = 0
  totalContactos = 0
  totalSkus = 0
  totalListasDePrecios = 0

  cargandoUsuarios = false
  cargandoContactos = false
  cargandoSkus = false
  cargandoListasDePrecios = false

  constructor(
    private skuService: SkuService,
    private contactoService: ContactoService,
    private usuarioService: UsuarioService,
    private listaDePreciosService: ListaDePreciosService,
    private offlineService: OfflineService
  ) {}

  ngOnInit(): void {
    this.obtenerRegistros()
  }
  obtenerRegistros() {
    // Esperamos que se cargue la BD
    this.offlineService.db.subscribe(x => {
      if (!x) return

      this.cargandoUsuarios = true
      this.cargandoContactos = true
      this.cargandoSkus = true
      this.cargandoListasDePrecios = true

      this.skuService.offline.contarDatos().then(total => {
        this.totalSkus = total
        this.cargandoSkus = false
      })
      this.contactoService.offline.contarDatos().then(total => {
        this.totalContactos = total
        this.cargandoContactos = false
      })
      this.usuarioService.offline.contarDatos().then(total => {
        this.totalUsuarios = total
        this.cargandoUsuarios = false
      })

      this.listaDePreciosService.offline.contarDatos().then(total => {
        this.totalListasDePrecios = total
        this.cargandoListasDePrecios = false
      })
    })
  }

  sincronizar() {
    this.cargarUsuarios()
    this.cargarContactos()
    this.cargarSkus()
    this.cargarListasDePrecios()
  }

  estaCargando() {
    return (
      this.cargandoUsuarios ||
      this.cargandoContactos ||
      this.cargandoSkus ||
      this.cargandoListasDePrecios
    )
  }

  hayBD(){

   


  }

  cargarListasDePrecios() {
    // Eliminamos todo

    let cbError = err => {
      console.log(err)
      this.cargandoListasDePrecios = false
    }

    let cb = () => {
      this.listaDePreciosService.offline.obtenerDatos().subscribe(listas => {
        this.listaDePreciosService.offline.sincronizarDatos(listas).then(
          x => {
            this.totalListasDePrecios = x
            this.cargandoListasDePrecios = false
          },
          () => (this.cargandoListasDePrecios = false)
        )
      })
    }

    this.cargandoListasDePrecios = true
    this.listaDePreciosService.offline.eliminarDatos().subscribe(cb, cbError)
  }

  cargarSkus() {
    this.cargandoSkus = true
    this.skuService.offline.eliminarDatos().subscribe(
      () => {
        this.skuService.offline.obtenerDatos().subscribe(datos => {
          this.skuService.offline.sincronizarDatos(datos).then(
            x => {
              this.totalSkus = x
              this.cargandoSkus = false
            },
            () => (this.cargandoSkus = false)
          )
        })
      },
      err => {
        this.cargandoSkus = false
      }
    )
  }

  cargarContactos() {
    this.cargandoContactos = true
    this.contactoService.offline.eliminarDatos().subscribe(
      () => {
        this.contactoService.offline.obtenerDatos().subscribe(datos => {
          this.contactoService.offline.sincronizarDatos(datos).then(
            x => {
              this.totalContactos = x
              this.cargandoContactos = false
            },
            () => (this.cargandoContactos = false)
          )
        })
      },
      err => {
        this.cargandoContactos = false
      }
    )
  }

  cargarUsuarios() {
    this.cargandoUsuarios = true
    this.usuarioService.offline.eliminarDatos().subscribe(
      () => {
        this.usuarioService.offline.obtenerDatos().subscribe(datos => {
          this.usuarioService.offline.sincronizarDatos(datos).then(
            x => {
              this.totalUsuarios = x
              this.cargandoUsuarios = false
            },
            () => (this.cargandoUsuarios = false)
          )
        })
      },
      err => {
        this.cargandoUsuarios = false
      }
    )
  }
}
