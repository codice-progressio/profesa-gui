import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { Contacto } from 'src/app/models/contacto.model'
import { ContactoService } from 'src/app/services/contacto.service'
import { UtilidadesService } from '../../../services/utilidades.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { EtiquetaTransporte } from '../../../components/etiquetas-editor/etiquetas-editor.component'
import { ModalService } from '@codice-progressio/modal'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ProveedorComponent implements OnInit {
  contactos: Contacto[] = []
  estaCargandoBuscador: BehaviorSubject<boolean>

  private _termino: string
  public get termino(): string {
    return this._termino
  }
  public set termino(value: string) {
    this._termino = value
    this.buscar(value)
  }

  private _cargando = false
  public get cargando() {
    return this._cargando
  }
  public set cargando(value) {
    this._cargando = value
    this.estaCargandoBuscador?.next(value)
  }

  idModalEtiqueta = Math.random() * 100000 + 'etiquetas'
  contactoSeleccionado: Contacto | null = null
  cargandoEtiquetas = false

  constructor(
    private modalService: ModalService,
    private notiService: ManejoDeMensajesService,
    private utilidadesService: UtilidadesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private proveedorService: ContactoService
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  obtenerPrimerContacto(proveedor: Contacto) {
    return proveedor?.contactos?.[0]
  }

  cargar() {
    this.cargando = true
    this.proveedorService.leerTodo().subscribe(proveedores => {
      this.contactos = proveedores
      this.cargando = false
    })
  }

  buscar(termino: string) {
    if (!termino) return this.cargar()
    this.cargando = true
    this.proveedorService.buscarTermino(termino).subscribe(
      proveedores => {
        this.cargando = false
        this.contactos = proveedores
      },
      () => (this.cargando = false)
    )
  }

  editar(proveedor: Contacto) {
    this.router.navigate(
      [
        'modificar',
        this.utilidadesService.niceUrl(proveedor.nombre),
        proveedor._id
      ],
      { relativeTo: this.activatedRoute }
    )
  }

  detalle(proveedor: Contacto) {
    this.router.navigate(
      [
        'detalle',
        this.utilidadesService.niceUrl(proveedor.nombre),
        proveedor._id
      ],
      { relativeTo: this.activatedRoute }
    )
  }

  eliminar(proveedor: Contacto) {
    this.notiService.confirmacionDeEliminacion(
      'Solo el administrador podra restaurar esta información. ',
      () => {
        this.proveedorService.eliminar(proveedor._id).subscribe(proveedoor => {
          this.cargando = false
          this.contactos = this.contactos.filter(x => x._id !== proveedor._id)
        })
      }
    )
  }

  abrirModalEtiqueta(contacto: Contacto) {
    this.contactoSeleccionado = contacto
    this.modalService.open(this.idModalEtiqueta)
  }

  etiquetaGuardar(contacto: Contacto, payload: EtiquetaTransporte) {
    payload.cargando.next(true)
    this.proveedorService.etiquetas
      .agregar(contacto._id, payload.etiqueta)
      .subscribe(
        etiquetas => {
          contacto.etiquetas = etiquetas
          payload.cargando.next(false)
        },
        _ => payload.cargando.next(false)
      )
  }

  etiquetaEliminar(contacto: Contacto, payload: EtiquetaTransporte) {
    payload.cargando.next(true)
    this.proveedorService.etiquetas
      .eliminar(contacto._id, payload.etiqueta)
      .subscribe(
        () => {
          contacto.etiquetas = contacto.etiquetas.filter(
            x => x !== payload.etiqueta
          )

          payload.cargando.next(false)
        },
        _ => payload.cargando.next(false)
      )
  }

  etiquetaEliminarDeFiltro(etiqueta: string) {
    return () => {
      this.etiquetasParaFiltrarse = this.etiquetasParaFiltrarse.filter(
        x => x !== etiqueta
      )
      this.filtrarConEtiquetasSeleccionadas(this.etiquetasParaFiltrarse)
    }
  }

  etiquetasParaFiltrarse: string[] = []

  filtrarPorEtiquetas(etiqueta: string) {
    return () => {
      if (this.etiquetasParaFiltrarse.includes(etiqueta)) {
        // Removemos la etiqueta

        this.etiquetasParaFiltrarse = this.etiquetasParaFiltrarse.filter(
          x => x !== etiqueta
        )
      } else {
        // Comprobamos que las etiquetas no esten repetidas
        this.etiquetasParaFiltrarse = Array.from(
          new Set(this.etiquetasParaFiltrarse).add(etiqueta)
        )
      }

      this.filtrarConEtiquetasSeleccionadas(this.etiquetasParaFiltrarse)
    }
  }

  filtrarConEtiquetasSeleccionadas(etiquetasParaFiltrarse: string[]) {
    if (etiquetasParaFiltrarse.length === 0) {
      this.buscar(this.termino)
      return
    }

    this.cargando = true
    this.proveedorService.etiquetas
      .filtrarPorEtiquetas(etiquetasParaFiltrarse)
      .subscribe(
        contactos => {
          this.cargando = false
          this.contactos = contactos
        },
        () => (this.cargando = false)
      )
  }

  obtenerIconoDeEtiqueta(etiqueta): string[] {
    let base = ['fas', 'mr-1']
    let sinFiltrar = base.concat('fa-tag')
    let filtrando = base.concat(...['fa-filter', 'text-warning'])

    return this.etiquetasParaFiltrarse.includes(etiqueta)
      ? filtrando
      : sinFiltrar
  }
}
