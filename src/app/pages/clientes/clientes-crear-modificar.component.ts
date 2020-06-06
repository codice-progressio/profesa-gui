import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { Cliente } from 'src/app/models/cliente.models'
import { ClienteService } from 'src/app/services/cliente/cliente.service'
import { Laser } from '../../models/laser.models'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  FormArray
} from '@angular/forms'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ActivatedRoute } from '@angular/router'
import { Location } from '@angular/common'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-clientes-crear-modificar',
  templateUrl: './clientes-crear-modificar.component.html',
  styles: []
})
export class ClientesCrearModificarComponent implements OnInit {
  formulario: FormGroup

  cargando = {}
  cliente: Cliente
  keys = Object.keys

  constructor(
    public skuService: ClienteService,
    public fb: FormBuilder,
    public vs: ValidacionesService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public msjService: ManejoDeMensajesService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['cargando'] = 'Buscando cliente'
      this.skuService.findById(id).subscribe(
        cliente => {
          this.crearFormulario(cliente)
          this.cliente = cliente
          delete this.cargando['cargando']
        },
        () => this.location.back()
      )
    } else {
      this.crearFormulario()
    }
  }

  crearFormulario(cliente: Cliente = new Cliente()) {
    this.formulario = this.fb.group({
      nombre: [cliente.nombre, [Validators.required]],
      sae: [cliente.sae, [Validators.required]],
      laserados: this.fb.array(
        cliente.laserados.map(x => new FormControl(x.laser))
      )
    })
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  fa(c: string): FormArray {
    return this.formulario.get(c) as FormArray
  }

  submit(cliente: any, invalid: boolean, e) {
    this.formulario.markAllAsTouched()
    this.formulario.updateValueAndValidity()

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.cargando['guardando'] = 'Espera mientras se aplican los cambios'
    let clienteBueno = new Cliente()

    clienteBueno.sae = cliente.sae
    clienteBueno.nombre = cliente.nombre
    clienteBueno.laserados = cliente.laserados.map(x => new Laser(null, x))

    if (this.cliente) {
      clienteBueno._id = this.cliente._id
      this.skuService.update(clienteBueno).subscribe(() => this.location.back())
    } else {
      this.skuService.save(clienteBueno).subscribe(() => {
        this.crearFormulario()
        delete this.cargando['guardando']
      })
    }
  }

  crearNuevaMarcaLaser(n: string) {
    let nombre = n.trim()
    if (!n) {
      this.msjService.toastErrorMensaje('Marca laser no puede estar vacio')
      return
    }

    this.fa('laserados').push(new FormControl(nombre))
  }

  eliminarMarcaLaser(i: number) {
    let cb = () => {
      this.fa('laserados').removeAt(i)
    }

    if (this.cliente) {
      let msj = `Esta a punto de eliminar la marca laser de este cliente, lo 
      que provocara que se pierdan sus registros como imagenes y demas
       informacion dependiente de el. Estos datos ya no se podran recuperar y
       tendras que registrarlos de nuevo.`

      this.msjService.confirmacionDeEliminacion(msj, cb)
    } else {
      cb()
    }
  }
}
