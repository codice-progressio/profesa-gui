import { Component, OnInit } from '@angular/core'
import { ParametrosService } from '../../services/parametros.service'
import { EtiquetaTransporte } from '../../components/etiquetas-editor/etiquetas-editor.component'
import permisosKeysConfig from 'src/app/config/permisosKeys.config'
import { ContieneElPermisoPipe } from 'src/app/pipes/contiene-el-permiso.pipe'

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  constructor(
    private contieneElPermiso: ContieneElPermisoPipe,
    private parametrosService: ParametrosService
  ) {}
  etiquetasExistentes: string[] = []
  cargandoEtiquetas = false
  permisos = permisosKeysConfig

  ngOnInit(): void {
    this.cargarEtiquetasExitentes()
  }

  cargarEtiquetasExitentes() {
    this.cargandoEtiquetas = true
    this.parametrosService.etiquetas.obtenerTodo().subscribe(
      etiquetas => {
        this.cargandoEtiquetas = false
        this.etiquetasExistentes = etiquetas
      },
      _ => (this.cargandoEtiquetas = false)
    )
  }

  eliminarEtiqueta(payload: EtiquetaTransporte) {
    payload.cargando.next(true)
    this.cargandoEtiquetas = true
    this.parametrosService.etiquetas.eliminar(payload.etiqueta).subscribe(
      () => {
        // Eliminamos de la lista actual de etiquetas.
        payload.cargando.next(false)
        this.cargandoEtiquetas = false
        this.etiquetasExistentes = this.etiquetasExistentes.filter(
          x => x !== payload.etiqueta
        )
      },
      _ => {
        payload.cargando.next(false)
        this.cargandoEtiquetas = false
      }
    )
  }

  permisoEtiquetas() {
    return this.contieneElPermiso.transform(
      this.permisos['configuraciones:etiquetas:administrar']
    )
  }
  permisoListaDePreciosDefault() {
    return this.contieneElPermiso.transform(
      this.permisos['configuraciones:lista-de-precios:administrar']
    )
  }
  permisoListaDePrecioDefault() {
    return this.contieneElPermiso.transform(
      this.permisos['configuraciones:lista-de-precios:administrar']
    )
  }
  permisoSkuEnLotes() {
    return this.contieneElPermiso.transform(
      this.permisos['configuraciones:skus:administrar']
    )
  }
  permisoListaDePrecioEnLotes() {
    return this.contieneElPermiso.transform(
      this.permisos['configuraciones:lista-de-precios:administrar']
    )
  }

  permisoContactosEnLotes() {
    return this.contieneElPermiso.transform(
      this.permisos['configuraciones:contactos:administrar']
    )
  }

  permisoUsuariosEnLotes() {
    return this.contieneElPermiso.transform(this.permisos['usuario:crear'])
  }

  permisosPedidosOffline() {
    return true
  }
}
