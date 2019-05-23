import { Component, OnInit } from "@angular/core"
import { Cliente } from "src/app/models/cliente.models"
import { ClienteService } from "../../services/cliente/cliente.service"
import { PaginadorService } from "src/app/components/paginador/paginador.service"
import { ClientesCrearModificarComponent } from "./clientes-crear-modificar.component"
import { resolve } from "path"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ManejoDeMensajesService } from "../../services/utilidades/manejo-de-mensajes.service"

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styles: []
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = null
  clienteDetalle: Cliente = null
  clienteEditandose: Cliente = null

  editando: boolean = false
  animando: boolean = false

  crearModificarComponent: ClientesCrearModificarComponent

  constructor(
    public _clienteService: ClienteService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService
  ) {
    this._paginadorService.callback = () => {
      this.cargarClientes()
    }
  }

  ngOnInit() {
    this.cargarClientes()

    new Promise((resolve) => {
      let i = setInterval(() => {
        if (this.crearModificarComponent) {
          clearInterval(i)
          resolve()
        }
      }, 100)
    }).then(() => {
      this.crearModificarComponent.cancelado.subscribe(() => {
        // this.clienteEditandose = null

        this.cargarClientes()
        this.editando = false
        this.animando = false
        setTimeout(() => {
          
        }, 500);
        
      })
      
      this.crearModificarComponent.guardado.subscribe(() => {
        this.animando = false
        this.cargarClientes()
        this.clienteEditandose = null
        this.editando = false
      })
    })
  }

  cargarClientes() {
    this._clienteService
      .todo()
      .subscribe((clientes) => (this.clientes = clientes))
  }

  buscarCliente(termino: string) {
    termino = termino.trim()
    if (!termino) {
      this.cargarClientes()
      return
    }

    this._clienteService.buscar(termino).subscribe((clientes) => {
      this.clientes = clientes
    })
  }

  crearCliente() {
    this.animando = true
    setTimeout( ()=>{
      this.editando = true
      this.crearModificarComponent.crearOModificar()
    }, 500 )


  }

  modificarCliente(cliente: Cliente) {
    this.animando = true
    setTimeout( ()=>{
      this.editando = true
      
      this.clienteEditandose = cliente
      this.crearModificarComponent.crearOModificar(cliente)

    }, 500)
  }

  eliminarCliente(cliente: Cliente) {
    let msj = `Estas a punto de eliminar al cliente '${cliente.nombre}'.
    Esta accion no se puede deshacer. Todos los datos relacionados al cliente
    seran eliminados (folios) y esto alterara las estadisticas de produccion, 
    reportes de ventas, ordenes en proceso y el historial de folios. Aun asi quieres continuar?`

    let msj2 = `Esto es muy importante. Es preferente no borrar el usuario bajo ninguna circunstancia, a menos que estes completamente seguro de que no te afectara en nada. `

    this._msjService.confirmacionDeEliminacion(msj, () => {
      this._msjService.confirmacionDeEliminacion(msj2, () => {
        this._clienteService.eliminar(cliente._id).subscribe((eliminado) => {
          this.cargarClientes()
        })
      })
    })
  }

  cargarComponente(e) {
    this.crearModificarComponent = e
  }

  animar(cb: any, tiempo: number = 500) {
    setTimeout(() => {
      cb()
    })
  }
}
