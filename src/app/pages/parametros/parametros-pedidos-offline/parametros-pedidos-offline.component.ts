import { Component, OnInit } from '@angular/core'
import { SkuService } from '../../../services/sku/sku.service'
import { ContactoService } from '../../../services/contacto.service'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { ListaDePreciosService } from '../../../services/lista-de-precios.service'
import { Offline, OfflineService } from '../../../services/offline.service'
import { IndicesIndexedDbService } from 'src/app/services/indices-indexed-db.service'
import { ReplaySubject } from 'rxjs'

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
    private offlineService: OfflineService,
    private indiceService: IndicesIndexedDbService
  ) {}

  contador = 0
  contar = new ReplaySubject<number>(null)

  ngOnInit(): void {
    this.offlineService.db.subscribe(() => this.gestionRegistros())
    this.contador = 0
    this.contar.subscribe(() => {

      this.contador++
      console.log(this.contador)
      if (this.contador === 4) this.indiceService.cargarIndicesEnMemoria()
    })
  }

  gestionRegistros() {
    this.cargandoUsuarios = true
    this.cargandoContactos = true
    this.cargandoSkus = true
    this.cargandoListasDePrecios = true

    let error = err => console.error(err)

    this.skuService.offline.contarDatos().subscribe(total => {
      this.totalSkus = total
      this.cargandoSkus = false
    }, error)
    this.contactoService.offline.contarDatos().subscribe(total => {
      this.totalContactos = total
      this.cargandoContactos = false
    }, error)
    this.usuarioService.offline.contarDatos().subscribe(total => {
      this.totalUsuarios = total
      this.cargandoUsuarios = false
    }, error)

    this.listaDePreciosService.offline.contarDatos().subscribe(total => {
      this.totalListasDePrecios = total
      this.cargandoListasDePrecios = false
    }, error)
  }

  sincronizar() {
    this.contador = 0
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

  cargarListasDePrecios() {
    // Eliminamos todo

    this.listaDePreciosService.offline.indice = []

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
            this.contar.next()
          },
          () => (this.cargandoListasDePrecios = false)
        )
      })
    }

    this.cargandoListasDePrecios = true
    this.listaDePreciosService.offline.eliminarDatos().subscribe(cb, cbError)
  }

  cargarSkus() {
    this.skuService.offline.indice = []
    this.cargandoSkus = true
    this.skuService.offline.eliminarDatos().subscribe(
      () => {
        this.skuService.offline.obtenerDatos().subscribe(datos => {
          this.skuService.offline.sincronizarDatos(datos).then(
            x => {
              this.totalSkus = x
              this.cargandoSkus = false
              this.contar.next()
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
    this.contactoService.offline.indice = []
    this.cargandoContactos = true
    this.contactoService.offline.eliminarDatos().subscribe(
      () => {
        this.contactoService.offline.obtenerDatos().subscribe(datos => {
          this.contactoService.offline.sincronizarDatos(datos).then(
            x => {
              this.totalContactos = x
              this.cargandoContactos = false
              this.contar.next()
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
    this.usuarioService.offline.indice = []
    this.cargandoUsuarios = true
    this.usuarioService.offline.eliminarDatos().subscribe(
      () => {
        this.usuarioService.offline.obtenerDatos().subscribe(datos => {
          this.usuarioService.offline.sincronizarDatos(datos).then(
            x => {
              this.totalUsuarios = x
              this.cargandoUsuarios = false
              this.contar.next()
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
