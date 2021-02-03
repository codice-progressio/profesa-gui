import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { BehaviorSubject } from 'rxjs'
import { Proveedor } from 'src/app/models/proveedor.model'
import { ProveedorService } from 'src/app/services/proveedor.service'
import { UtilidadesService } from '../../../services/utilidades.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedores: Proveedor[] = []
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

  constructor(
    private notiService: ManejoDeMensajesService,
    private utilidadesService: UtilidadesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.cargar()
  }

  obtenerPrimerContacto(proveedor: Proveedor) {
    return proveedor?.contactos?.[0]
  }

  cargar() {
    this.cargando = true
    this.proveedorService.leerTodo().subscribe(proveedores => {
      this.proveedores = proveedores
      this.cargando = false
    })
  }

  buscar(termino: string) {
    if (!termino) return this.cargar()
    this.cargando = true
    this.proveedorService.buscarTermino(termino).subscribe(
      proveedores => {
        this.cargando = false
        this.proveedores = proveedores
      },
      () => (this.cargando = false)
    )
  }

  editar(proveedor: Proveedor) {
    this.router.navigate(
      [
        'modificar',
        this.utilidadesService.niceUrl(proveedor.nombre),
        proveedor._id
      ],
      { relativeTo: this.activatedRoute }
    )
  }

  detalle(proveedor: Proveedor) {
    this.router.navigate(
      [
        'detalle',
        this.utilidadesService.niceUrl(proveedor.nombre),
        proveedor._id
      ],
      { relativeTo: this.activatedRoute }
    )
  }

  eliminar(proveedor: Proveedor) {
    this.notiService.confirmacionDeEliminacion(
      'Solo el administrador podra restaurar esta información. ',
      () => {
        this.proveedorService.eliminar(proveedor._id).subscribe(proveedoor => {
          this.cargando = false
          this.proveedores = this.proveedores.filter(
            x => x._id !== proveedor._id
          )
        })
      }
    )
  }
}
