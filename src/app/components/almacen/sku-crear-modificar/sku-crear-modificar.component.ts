import { Location } from '@angular/common'
import { Component, OnInit, Optional } from '@angular/core'
import { UntypedFormGroup, UntypedFormControl, UntypedFormArray, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { SKU } from 'src/app/models/sku.model'
import { SkuService } from 'src/app/services/sku/sku.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'

@Component({
  selector: 'app-sku-crear-modificar',
  templateUrl: './sku-crear-modificar.component.html',
  styleUrls: ['./sku-crear-modificar.component.css']
})
export class SkuCrearModificarComponent implements OnInit {
  cargando = false
  formulario: UntypedFormGroup
  estaEditando = false

  constructor(
    private skuService: SkuService,
    public vs: ValidacionesService,
    private route: ActivatedRoute,
    private location: Location,
    private notiService: ManejoDeMensajesService
  ) {}

  ngOnInit(): void {
    this.distinguir()
  }

  distinguir() {
    this.route.paramMap.subscribe(paramMap => {
      this.cargando = true
      let id = paramMap.get('id')

      if (!id) {
        this.crearFormulario({})
      } else {
        this.obtenerSku(id)
      }
    })
  }

  obtenerSku(id: string) {
    this.skuService.buscarId(id).subscribe(
      sku => {
        this.estaEditando = true
        this.crearFormulario(sku)
      },
      () => {
        this.notiService.toast.error('No se pudo cargar el sku para modificar')
        this.location.back()
      }
    )
  }

  f(campo: string) {
    return this.formulario.get(campo)
  }

  crearFormulario(sku: Partial<SKU>) {
    this.formulario = new UntypedFormGroup({
      _id: new UntypedFormControl(sku?._id),
      nombreCompleto: new UntypedFormControl(sku?.nombreCompleto, [
        Validators.required,
        Validators.minLength(4)
      ]),
      unidad: new UntypedFormControl(sku?.unidad),
      descripcion: new UntypedFormControl(sku?.descripcion),
      puedoProducirlo: new UntypedFormControl(sku?.puedoProducirlo),
      puedoComprarlo: new UntypedFormControl(sku?.puedoComprarlo),
      puedoVenderlo: new UntypedFormControl(sku?.puedoVenderlo),
      stockMinimo: new UntypedFormControl(sku?.stockMinimo, [Validators.min(0)]),
      stockMaximo: new UntypedFormControl(sku?.stockMaximo, [Validators.min(0)]),
      etiquetas: new UntypedFormArray(
        sku.etiquetas?.length > 0
          ? sku.etiquetas.map(x => new UntypedFormControl(x))
          : []
      ),

      costoVenta: new UntypedFormControl(sku.costoVenta ?? 0, [Validators.min(0)]), 
      codigo: new UntypedFormControl(sku.codigo)
    })

    this.cargando = false
  }

  agregarEtiqueta(input: any) {
    let etiqueta = input.value.trim()

    if (etiqueta.length < 4) {
      this.notiService.toast.info(
        `${etiqueta} no es valida. Debe tener por lo menos 4 caractéres`
      )
      return
    }

    let etiquetasField = this.f('etiquetas') as UntypedFormArray
    etiquetasField.push(new UntypedFormControl(etiqueta))

    input.value = ''
    input.focus()
  }

  eliminarEtiqueta(i: number) {
    let etiquetasField = this.f('etiquetas') as UntypedFormArray
    etiquetasField.removeAt(i)
  }

  fa(campo) {
    return this.f(campo) as UntypedFormArray
  }

  submit(model: SKU, invalid: boolean) {
    if (invalid) {
      console.log('No es valido')
      this.formulario.markAllAsTouched()
      this.formulario.updateValueAndValidity()

      return
    }

    let err = () => {
      this.formulario.enable()
      this.cargando = false
    }

    let success = sku => {
      this.location.back()
    }

    this.formulario.disable()
    this.cargando = false

    let operacion = model._id
      ? this.skuService.modificar(model)
      : this.skuService.crear(model)
    console.log(model)
    operacion.subscribe(success, err)
  }
}
