import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  FormArray,
  AbstractControl
} from '@angular/forms'
import { FoliosCrearModificarAbstractoComponent } from './abstractos/folios-crear-modificar-abstracto.component'
import { FolioNewService } from 'src/app/services/folio/folio-new.service'
import { ValidacionesService } from 'src/app/services/utilidades/validaciones.service'
import { ClienteService } from 'src/app/services/cliente/cliente.service'
import { ModeloCompletoService } from 'src/app/services/modelo/modelo-completo.service'
import { UsuarioService } from 'src/app/services/usuario/usuario.service'
import { Cliente } from 'src/app/models/cliente.models'
import { Usuario } from 'src/app/models/usuario.model'
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'
import { Subscription } from 'rxjs'
import { Laser } from 'src/app/models/laser.models'
import { DEPARTAMENTOS } from 'src/app/config/departamentos'
import { Location, DecimalPipe } from '@angular/common'
import { ActivatedRoute, Data } from '@angular/router'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { Dato } from 'src/app/shared/data-list/dato.model'
import { Paginacion } from 'src/app/utils/paginacion.util'
import { ModeloCompletoLigero } from '../../../services/modelo/modelo-completo.service'
import { FormControl } from '@angular/forms'
import { Format } from 'moment'

@Component({
  selector: 'app-folios-crear-modificar',
  templateUrl: './folios-crear-modificar.component.html',
  styles: []
})
export class FoliosCrearModificarComponent implements OnInit {
  /**
   * Escucha si input que se muestra cliente ha cambiado para asi asignar
   * el valor ( _id ) correspondiente al input que si pertenece al reactive form.
   *
   * @memberof FoliosCrearModificarComponent
   */
  @ViewChild('inputCliente', { static: true }) inputCliente

  /**
   *El cliente que esta actualmente seleccionado.
   *
   * @type {Cliente}
   * @memberof FoliosCrearModificarComponent
   */
  clienteSeleccionado: Cliente
  /**
   *Los vendedores que se van a enlistar en la busqueda.
   *
   * @type {Usuario[]}
   * @memberof FoliosCrearModificarComponent
   */
  vendedores: Usuario[] = []

  /**
   *Version resumida para facilitar el ordenamiento en html
   *
   * @type {ValidacionesService}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  vs: ValidacionesService

  /**
   * El folio que se va a trabajar?
   *
   *
   * @type {Folio}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  folio: Folio

  /**
   *El formulario que emitimos para guardar los datos.
   *
   * @type {FormGroup}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  formulario: FormGroup

  /**
   *Desactiva el boton cuando se esta guardando.
   *
   * @type {false}
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  desactivarBotonEnGuardado: boolean = false
  // lleva: any;

  modeloCompletoPorPedido: ModeloCompletoLigero[] = []

  cargando = {}
  keys = Object.keys

  constructor(
    public folioService: FolioNewService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public clienteService: ClienteService,
    public modeloCompletoService: ModeloCompletoService,
    public _usuarioService: UsuarioService,
    public msjService: ManejoDeMensajesService,
    public location: Location,
    public activatedRoute: ActivatedRoute,
    public numberPipe: DecimalPipe
  ) {
    this.vs = this._validacionesService
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (id) {
      this.cargando['buscando'] = 'Buscando folio'
      this.folioService.findById(id).subscribe(
        folio => {
          this.crearFormulario(folio)
          delete this.cargando['buscando']
        },
        () => delete this.cargando['buscando']
      )
    } else {
      this.crearFormulario()
    }
  }

  /**
   *Emite una notificacion de que el componete se destruyo
   para que la variable que escucha el emitter esteComponente
   sea borrada. De otra manera da error al cargar los folios.  
   * 
   * @memberof FoliosCrearModificarAbstractoComponent
   */
  @Output() destruido = new EventEmitter<any>()
  ngOnDestroy(): void {}

  /**
 *Limpia todos los datos del cliente seleccionado en el input, el data list, la lista
 de clientes buscada, el input para la escucha del campo y el cliente seleccionado. 

 Generalmente la llamo cuando se aprieta el backspece en el input cliente. 
 *
 * @param {*} inputCliente El input con el #
 * @memberof FoliosCrearModificarComponent
 */
  limpiarCliente(inputCliente) {
    this.f('cliente').setValue(null)
    // this.clientes = []
    inputCliente.value = ''
    this.clienteSeleccionado = null
  }

  modificacionCliente: Dato = null
  modificacionesPedidos: Dato[] = []

  /**
   *Crea el formulario de registro.
   *
   * @memberof MaquinasCrearModificarComponent
   */
  crearFormulario(folio: Folio = new Folio()) {
    this.folio = folio
    this.formulario = this.formBuilder.group({
      cliente: [folio.cliente._id, [Validators.required]],
      vendedor: [this._usuarioService.usuario._id, [Validators.required]],
      terminado: [false],
      observacionesVendedor: [folio.observacionesVendedor, []],
      folioLineas: this.formBuilder.array(
        [],
        [this._validacionesService.minSelectedCheckboxes()]
      )
    })

    if (folio._id) {
      // Cargamos todos los diferentes datos a
      // modificar del cliente.
      this.folio = folio

      //Cargamos el cliente
      this.f('cliente').setValue(folio.cliente._id)
      this.clienteSeleccionado = folio.cliente

      this.modificacionCliente = new Dato(
        folio.cliente.nombre,
        undefined,
        folio.cliente.sae
      )
      // ------------------------------------------

      this.f('observacionesVendedor').setValue(folio.observacionesVendedor)
      // Recoreemos los pedidos

      for (let i = 0; i < folio.folioLineas.length; i++) {
        const pedido = folio.folioLineas[i]

        this.agregarPedido()
        // Agregamos el modelo completo
        this.fa(i, 'modeloCompleto').setValue(pedido.modeloCompleto._id)
        this.modificacionesPedidos.push(
          new Dato(pedido.modeloCompleto.nombreCompleto)
        )
        this.obtenerProduccionEnTransito(pedido.modeloCompleto._id, i)

        // // ------------------------------------------

        // Agreegamos la marca laser
        this.fa(i, 'laserCliente').setValue(pedido.laserCliente)

        // // ------------------------------------------

        this.fa(i, 'cantidad').setValue(pedido.cantidad)

        this.fa(i, 'almacen').setValue(pedido.almacen)
        this.fa(i, 'observaciones').setValue(pedido.observaciones)

        // // Todo lo demas para que no se pierda

        this.fa(i, 'pedido').setValue(pedido.pedido)
        this.fa(i, 'porcentajeAvance').setValue(pedido.porcentajeAvance)
        this.fa(i, 'observacionesVendedor').setValue(
          pedido.observacionesVendedor
        )
        this.fa(i, 'fechaTerminado').setValue(pedido.fechaTerminado)
        this.fa(i, 'cantidadProducida').setValue(pedido.cantidadProducida)

        // // Comprobamos si el boton tiene marca laser propia, de manera que no se puede laser aun cuando le demos modifcar.
        this.llevaMarcaLaserDesdeElModelo(i)
      }
    }
  }

  /**
   *Crea un grupo de pedidos con sus respectivas validaciones.
   *
   * @returns {FormGroup}
   * @memberof FoliosCrearModificarComponent
   */
  crearNuevoGrupoDePedidos(): FormGroup {
    return this.formBuilder.group({
      modeloCompleto: ['', [Validators.required]],
      cantidad: [
        '',
        [
          Validators.required,
          Validators.min(1),
          this._validacionesService.numberValidator,
          this._validacionesService.onlyIntegers
        ]
      ],

      laserCliente: [new Laser()],
      almacen: [false],
      observaciones: ['', []],
      pedido: '',
      porcentajeAvance: '',
      observacionesVendedor: ['', []],
      fechaTerminado: '',
      cantidadProducida: ''
    })
  }

  /**
   *Agrega un nuevo pedido al formulario.
   *
   * @memberof FoliosCrearModificarComponent
   */
  agregarPedido() {
    let grupoDePedidos: FormGroup = this.crearNuevoGrupoDePedidos()
    // Deshabilitamos el laser del cliente y la opcion de surtir
    // de almacen por defecto para que primero sea necesario hacer
    // la comprobacion.
    grupoDePedidos.get('laserCliente').disable()
    grupoDePedidos.get('almacen').disable()
    ;(this.formulario.get('folioLineas') as FormArray).push
    this.faLinea().push(grupoDePedidos)
    // this.comprobarModeloLaseradoFun[this.faLinea().length - 1] = false
  }

  /**
   *Elimina un pedido del formulario.
   *
   * @param {number} iPed
   * @memberof FoliosCrearModificarComponent
   */
  eliminarPedido(iPed: number) {
    this.faLinea().removeAt(iPed)
  }

  /**
   *Esta funcion se encarga de comparar los laserados para asi obtener 
   la marca guardada desde el folio. 
   
   *
   * @param {Laser} val1
   * @param {Laser} val2
   * @returns {boolean}
   * @memberof FoliosCrearModificarComponent
   */
  compararLaserados(val1: Laser, val2: Laser): boolean {
    if (!val1 || !val2) return false
    return val1.laser === val2.laser
  }

  onSubmit(model: Folio, invalid: boolean, e) {
    this.formulario.markAllAsTouched
    this.formulario.updateValueAndValidity

    if (invalid) {
      e.preventDefault()
      e.stopPropagation()
      return
    }

    this.desactivarBotonEnGuardado = true

    // Si es una edicion agregamos el id
    if (this.folio._id) {
      model['_id'] = this.folio._id
      this.folioService.update(model).subscribe(() => {
        this.location.back()
      
      })
      return
    }
    // Guardamos los datos.
    this.folioService.save(model).subscribe(() => {
      this.crearFormulario()
    })
  }

  @Output() cancelado = new EventEmitter<any>()

  @Output() seModifico = new EventEmitter<any>()
  @Output() esteComponente = new EventEmitter<
    FoliosCrearModificarAbstractoComponent
  >()

  cancelar() {
    if (this.formulario.dirty) {
      this.msjService.confirmarAccion(
        'Los cambios no guardados se perderan. Deseas continuar?',
        () => {
          this.location.back()
        }
      )
    } else {
      this.location.back()
    }
  }

  comprobandoModeloLaserado = {}

  llevaMarcaLaserDesdeElModelo(iPed: number) {
    //Obtenemos el modelo completo seleccionado

    this.fa(iPed, 'laserCliente').disable()
    this.fa(iPed, 'almacen').disable()

    this.comprobandoModeloLaserado[iPed] = true

    let id: string = this.fa(iPed, 'modeloCompleto').value
    if (!id) {
      this.comprobandoModeloLaserado[iPed] = false
      return
    }

    if (!id && id.trim().length !== 24) {
      this.comprobandoModeloLaserado[iPed] = false
      return
    }

    this.modeloCompletoService.findById(id).subscribe(mc => {
      this.comprobandoModeloLaserado[iPed] = false

      if (!this.compruebaQueTieneUnaMarcaLaser(mc)) {
        this.fa(iPed, 'laserCliente').enable()
        this.fa(iPed, 'almacen').enable()
      } else {
        //Comprobamos que el cliente no tenga la marca laser actualmente.

        let existeMarcaLaser = this.clienteSeleccionado.laserados.find(
          laserado => laserado.laser === mc.laserAlmacen.laser
        )

        if (!existeMarcaLaser) {
          let titulo = 'Marca laser invalida para el cliente'
          let msj =
            'El modelo que seleccionaste requiere laserar pero el cliente no tiene registrada la marca. Es necesario que control de produccion de de alta la marca para el cliente.'

          this.msjService.invalido(msj, titulo, 10000)
          this.fa(iPed, 'modeloCompleto').setValue('')
          this.modificacionesPedidos[iPed] = new Dato()
        } else {
          this.fa(iPed, 'laserCliente').setValue(mc.laserAlmacen)
        }
      }
      mc._servicio = this.modeloCompletoService

      this.modeloCompletoPorPedido[
        iPed
      ] = (mc as unknown) as ModeloCompletoLigero
    })
  }

  compruebaQueTieneUnaMarcaLaser(mc: ModeloCompleto) {
    let deptoLaser = DEPARTAMENTOS.LASER._n
    if (!mc) return false

    // El modelo completo tiene definida una marca laser
    if (mc.laserAlmacen.laser.trim().length > 0) return true

    // Existe por lo menos un departamento que senale a laser dentro de la familia de procesos.
    for (let i = 0; i < mc.familiaDeProcesos.procesos.length; i++) {
      const proceso = mc.familiaDeProcesos.procesos[i].proceso
      if (proceso.departamento.nombre === deptoLaser) return true
    }

    // Existe por lo menoss un departamento que senale a laser dentro de los procesos especiales.
    for (let i = 0; i < mc.procesosEspeciales.length; i++) {
      const proceso = mc.procesosEspeciales[i].proceso
      if (proceso.departamento.nombre === deptoLaser) return true
    }

    // No hay una marca laser definida para el modelo de manera puntual
    //en los procesos o en la familiaDeprocesos, incluso en el modelo mismo
    //por lo tanto podemos habilitar los controles
    return false
  }

  comprobarModeloLaseradoFun(i: number): boolean {
    return this.comprobarModeloLaseradoFun[i]
  }

  f(c: string): AbstractControl {
    return this.formulario.get(c)
  }

  faLinea(): FormArray {
    return this.formulario.get('folioLineas') as FormArray
  }

  fa(i: number, campoDentroLinea: string): AbstractControl {
    return this.faLinea()
      .at(i)
      .get(campoDentroLinea)
  }

  buscarCliente(evento: Data) {
    let clienteF = this.f('cliente')
    clienteF.markAsTouched()
    clienteF.updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.clienteService.findByTerm(termino).subscribe(cliente => {
      let datos: Dato[] = []
      cliente.forEach(cliente => {
        let d = new Dato()
        d.leyendaPrincipal = cliente.nombre
        d.leyendaSecundaria = cliente.sae
        d.objeto = cliente

        datos.push(d)
      })

      dataList.terminoBusqueda(datos)
    })
  }

  seleccionarCliente(evento: Dato) {
    const cliente = this.f('cliente')

    if (!evento) {
      cliente.setValue(null)
      return
    }

    cliente.setValue((evento.objeto as Cliente)._id)
    cliente.markAsDirty()
    cliente.updateValueAndValidity()
    this.clienteSeleccionado = evento.objeto as Cliente
    this.agregarPedido()
  }

  clienteBorrado() {
    this.crearFormulario()
  }

  buscarModeloCompleto(evento: Data, i: number) {
    let modeloCompleto = this.fa(i, 'modeloCompleto')
    modeloCompleto.markAsTouched()
    modeloCompleto.updateValueAndValidity()

    let termino = <string>evento.termino
    let dataList = <DataListComponent>evento.dataList
    this.modeloCompletoService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'nombreCompleto'))
      .subscribe(skus => {
        let datos: Dato[] = []
        skus.forEach(sku => {
          let d = new Dato()
          d.leyendaPrincipal = sku.nombreCompleto
          d.leyendaSecundaria =
            'Existencia: ' + this.numberPipe.transform(sku.existencia)
          d.objeto = sku

          datos.push(d)
        })

        dataList.terminoBusqueda(datos)
      })
  }

  modeloCompletoPorPedidoEnTransito = []
  seleccionarModeloCompleto(evento: Dato, i: number) {
    const mc = this.fa(i, 'modeloCompleto')
    if (!evento) {
      mc.setValue(null)
      return
    }
    let mcLigerop = evento.objeto as ModeloCompletoLigero
    this.modeloCompletoPorPedido[i] = mcLigerop
    mc.setValue(mcLigerop._id)
    mc.markAsDirty()
    mc.updateValueAndValidity()
    this.llevaMarcaLaserDesdeElModelo(i)
    this.obtenerProduccionEnTransito(mcLigerop._id, i)
  }

  obtenerProduccionEnTransito(id: string, i: number) {
    this.modeloCompletoService
      .obtenerProduccionEnTransito(id)
      .subscribe(cantidad => {
        this.modeloCompletoPorPedidoEnTransito[i] = cantidad
      })
  }
}
