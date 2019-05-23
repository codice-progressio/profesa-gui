import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core"
import { Cliente } from "src/app/models/cliente.models"
import { ClienteService } from "src/app/services/cliente/cliente.service"
import { Laser } from "../../models/laser.models"
import { ManejoDeMensajesService } from "src/app/services/utilidades/manejo-de-mensajes.service"
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray
} from "@angular/forms"
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service"

@Component({
  selector: "app-clientes-crear-modificar",
  templateUrl: "./clientes-crear-modificar.component.html",
  styles: []
})
export class ClientesCrearModificarComponent implements OnInit {
  cliente: Cliente

  @Output() esteComponente = new EventEmitter<this>()
  @Output() cancelado = new EventEmitter<any>()
  @Output() guardado = new EventEmitter<any>()

  formulario: FormGroup
  animando: boolean = false

  constructor(
    public _clienteService: ClienteService,
    public _msjService: ManejoDeMensajesService,
    public fb: FormBuilder,
    public vs: ValidacionesService
  ) {}

  ngOnInit() {
    this.crearFormulario()
    this.esteComponente.emit(this)
  }

  crearOModificar(cliente: Cliente = new Cliente()) {
    this.cliente = cliente

    this.crearFormulario()

    this.nombre_FB().setValue(cliente.nombre)
    this.sae_FB().setValue(cliente.sae)

    if (cliente.laserados) {
      cliente.laserados.forEach((laser) => {
        let laserFB: FormGroup = this.crearGrupoDeLaserados()
        laserFB.get("laser").setValue(laser.laser)
        this.laserados_FB.push(laserFB)
      })
    }
  }

  crearNuevaMarcaLaser(nombre: string) {
    if (nombre.trim().length === 0) return

    let nl = this.crearGrupoDeLaserados()
    nl.get("laser").setValue(nombre)
    this.laserados_FB.push(nl)
  }

  eliminarMarcaLaser(i: number) {
    let cb = () => {
      this.laserados_FB.removeAt(i)
      this._msjService.correcto("Se elimino la marca laser.")
    }

    if (this.cliente) {
      let msj = `Esta a punto de eliminar la marca laser de este cliente, lo 
      que provocara que se pierdan sus registros como imagenes y demas
       informacion dependiente de el. Estos datos ya no se podran recuperar y
       tendras que registrarlos de nuevo.`

      this._msjService.confirmacionDeEliminacion(msj, cb)
    } else {
      cb()
    }
  }

  guardar() {
    if (this.formulario.invalid) return

    let c: Cliente = <Cliente>this.formulario.value

    // Si hay un id lo agregamos.
    if (this.cliente._id) c._id = this.cliente._id

    let cb = (cliente) => {
      this.animando = true
      setTimeout(() => {
        this.animando = false
        this.guardado.emit()
        this.cliente = null
      }, 500)
    }

    if (this.cliente._id) this._clienteService.modificar(c).subscribe(cb)
    else this._clienteService.guardar(c).subscribe(cb)
  }

  cancelar() {
    this.animando = true
    setTimeout(() => {
      this.cliente = null
      this.animando = false
      this.cancelado.emit()
    }, 500)
  }

  crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ["", [Validators.required]],
      sae: ["", [Validators.required]],
      laserados: this.fb.array([])
    })
  }

  crearGrupoDeLaserados() {
    return this.fb.group({
      laser: [],
      imagenes: this.fb.array([])
    })
  }

  public nombre_FB(): AbstractControl {
    return this.formulario.get("nombre")
  }
  public sae_FB(): AbstractControl {
    return this.formulario.get("sae")
  }
  public get laserados_FB(): FormArray {
    return <FormArray>this.formulario.get("laserados")
  }

  public laser_FB(i: number): AbstractControl {
    return this.laserados_FB.at(i).get("laser")
  }

  public imagenes_FB(i: number): FormArray {
    return <FormArray>this.laserados_FB.at(i).get("imagenes")
  }
}
