import { Component, OnInit } from '@angular/core'
import { DepartamentoService } from '../../../services/departamento/departamento.service'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { Departamento } from '../../../models/departamento.models'
import { Usuario } from '../../../models/usuario.model'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { FormControl } from '@angular/forms'
import { ScannerDepartamentoGestion } from '../../../services/parametros.service'
import { ManejoDeMensajesService } from '../../../services/utilidades/manejo-de-mensajes.service'
import { ParametrosService } from '../../../services/parametros.service'
import {
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  transferArrayItem
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-estaciones-de-escaneo',
  templateUrl: './estaciones-de-escaneo.component.html',
  styleUrls: ['./estaciones-de-escaneo.component.css']
})
export class EstacionesDeEscaneoComponent implements OnInit {
  keys = Object.keys
  cargando = {}

  departamentos: ScannerDepartamentoGestion[] = []
  usuarios: Usuario[] = []

  departamentosSeleccionados: ScannerDepartamentoGestion[] = []
  usuariosAutorizadoDepartamento = {}

  constructor(
    public departamentoService: DepartamentoService,
    public usuarioService: UsuarioService,
    private parametrosService: ParametrosService,
    private msjService: ManejoDeMensajesService
  ) {}

  ngOnInit(): void {
    this.cargarDepartamentos()
    this.cargarUsuarios()
    this.subscribirBusquedas()
    this.cargarEstaciones()
  }

  cargarEstaciones() {
    this.cargando['estaciones'] = 'Obteniendo estaciones registradas'

    this.parametrosService.findAllEstacionesDeEscaneo().subscribe(
      estaciones => {
        console.log(estaciones)
        this.departamentosSeleccionados = JSON.parse(JSON.stringify(estaciones))
        this.mostrarDepartamentosSeleccionados = JSON.parse(
          JSON.stringify(estaciones)
        )

        delete this.cargando['estaciones']
      },
      _ => delete this.cargando['estaciones']
    )
  }

  cargarUsuarios() {
    this.cargando['usuarios'] = 'Obteniendo lista de usuarios'

    this.usuarioService.findAll(new Paginacion(100, 0, 1, 'nombre')).subscribe(
      u => {
        this.usuarios = u
        this.mostrarUsuarios = u.map(x => x._id)
        delete this.cargando['usuarios']
      },
      _ => delete this.cargando['usuarios']
    )
  }

  cargarDepartamentos() {
    this.cargando['departamento'] = 'Obteniendo departamentos'

    this.departamentoService
      .findAll(new Paginacion(100, 0, 1, 'nombre'))
      .subscribe(
        d => {
          this.departamentos = d.map(x => ({
            departamento: x,
            usuarios: []
          }))
          this.mostrarDepartamentos = d.map(x => x._id)
          delete this.cargando['departamento']
        },
        _ => delete this.cargando['departamento']
      )
  }

  drop(event: CdkDragDrop<Usuario[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      //Si no es ninguno de las anteriores transferimos.

      let idsUsuarios = event.container.data.map(x => x._id)
      let idUsuarioAgregar =
        event.previousContainer.data[event.previousIndex]._id

      if (!idsUsuarios.includes(idUsuarioAgregar)) {
        if (event.item.data === 'copiar') {
          //Si tiene cdkDragData 'copiar'  utilizamos este chosw

          // Si esta repetido no lo copiamos
          copyArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          )
        } else {
          //Si no movemos
          transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
          )
        }
      }
    }

    this.departamentosSeleccionados = JSON.parse(
      JSON.stringify(this.mostrarDepartamentosSeleccionados)
    )
  }

  listaDeIds() {
    return this.departamentosSeleccionados.map(x => x.departamento._id)
  }

  relacionesParaUsuarios: string[] = []

  obtenerRelacionesConDepartamento() {
    this.relacionesParaUsuarios = this.departamentosSeleccionados.map(
      x => x.departamento._id
    )
  }
  mostrarDepartamentos = []
  mostrarUsuarios = []
  mostrarDepartamentosSeleccionados: ScannerDepartamentoGestion[] = []

  inputDepartamento = new FormControl()
  inputUsuarios = new FormControl()
  inputDepartamentosSeleccionados = new FormControl()

  subscribirBusquedas() {
    this.inputDepartamento.valueChanges.subscribe(termino =>
      this.filtrarDepartamentos(termino)
    )
    this.inputDepartamentosSeleccionados.valueChanges.subscribe(termino =>
      this.filtrarDepartamentosSeleccionados(termino)
    )
    this.inputUsuarios.valueChanges.subscribe(termino =>
      this.filtrarUsuarios(termino)
    )
  }

  filtrarDepartamentos(termino: string) {
    if (!termino.trim()) {
      this.mostrarDepartamentos = this.departamentos.map(
        x => x.departamento._id
      )
      return
    }

    this.mostrarDepartamentos = this.departamentos
      .filter(x =>
        x.departamento.nombre.toLowerCase().includes(termino.toLowerCase())
      )
      .map(x => x.departamento._id)
  }

  filtrarDepartamentosSeleccionados(termino: string) {
    this.mostrarDepartamentosSeleccionados = JSON.parse(
      JSON.stringify(this.departamentosSeleccionados)
    )
    if (!termino.trim()) {
      return
    }

    this.mostrarDepartamentosSeleccionados = this.mostrarDepartamentosSeleccionados.filter(
      x => {
        let depto = x.departamento.nombre
          .toLowerCase()
          .includes(termino.toLowerCase())

        if (depto) return true

        x.usuarios = x.usuarios.filter(user =>
          user.nombre.toLowerCase().includes(termino.toLowerCase())
        )

        return x.usuarios.length > 0
      }
    )
  }
  filtrarUsuarios(termino: string) {
    if (!termino.trim()) {
      this.mostrarUsuarios = this.usuarios.map(x => x._id)
      return
    }

    this.mostrarUsuarios = this.usuarios
      .filter(x => x.nombre.toLowerCase().includes(termino.toLowerCase()))
      .map(x => x._id)
  }

  submit() {
    if (this.departamentosSeleccionados.length === 0) {
      this.msjService.invalido('No has seleccionado ningun departamento.')
      return
    }

    for (let i = 0; i < this.departamentosSeleccionados.length; i++) {
      const x = this.departamentosSeleccionados[i]
      if (x.usuarios.length === 0) {
        this.msjService.invalido(
          `La estacion "${x.departamento.nombre}" no tiene definido ningun usuario. Es necesario que agregues por lo menos uno.`
        )
        return
      }
    }

    this.departamentosSeleccionados = JSON.parse(
      JSON.stringify(this.mostrarDepartamentosSeleccionados)
    )

    this.cargando['submit'] = 'Guardando cambios'

    this.parametrosService
      .saveEstacionesDeEscaneo(this.departamentosSeleccionados)
      .subscribe(
        _ => delete this.cargando['submit'],
        _ => delete this.cargando['submit']
      )
  }

  contieneElDepartamento(id: string): boolean {
    return this.departamentosSeleccionados
      .map(x => x.departamento._id)
      .includes(id)
  }

  agregarOQuitarDepartamento(s: ScannerDepartamentoGestion) {
    let ids = this.departamentosSeleccionados.map(x => x.departamento._id)

    if (ids.includes(s.departamento._id)) {
      let indice = this.departamentosSeleccionados.findIndex(
        x => x.departamento._id === s.departamento._id
      )
      this.departamentosSeleccionados.splice(indice, 1)
    } else {
      this.departamentosSeleccionados.push(s)
    }

    this.mostrarDepartamentosSeleccionados = JSON.parse(
      JSON.stringify(this.departamentosSeleccionados)
    )
  }
}
