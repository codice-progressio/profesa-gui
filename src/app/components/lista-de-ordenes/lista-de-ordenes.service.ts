import { Injectable, Input, OnDestroy } from '@angular/core'
import { Orden } from '../../models/orden.models'
import { PreLoaderService } from '../pre-loader/pre-loader.service'
import { DEPARTAMENTOS } from '../../config/departamentos'
import { DefaultsService } from 'src/app/services/configDefualts/defaults.service'
import { DefaultModelData } from 'src/app/config/defaultModelData'
import { FolioService } from 'src/app/services/folio/folio.service'
import { UtilidadesService } from 'src/app/services/utilidades/utilidades.service'
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service'

/**
 * Provee los elementos necesarios para mostrar las ordenes
 * por departamento separado en prioridades.
 *
 * @export
 * @class ListaDeOrdenesService
 */
@Injectable({
  providedIn: 'root'
})
export class ListaDeOrdenesService implements OnDestroy {
  // depto: string;
  /**
   * Las ordenes ordenadas por prioridad.
   *
   * @memberof ListaDeOrdenesService
   */
  ordenes = {}
  /**
   * Los niveles de prioridad. Sirve para separar las ordenes ???
   *
   * @type {string[]}
   * @memberof ListaDeOrdenesService
   */
  niveles: string[] = []
  /**
   * Opciones????
   *
   * @memberof ListaDeOrdenesService
   */
  opciones = {}
  /**
   * El departamento del cual se van a obtener las ordenes.
   * Esta variable senala a un modelo.
   *
   * @type {string}
   * @memberof ListaDeOrdenesService
   */
  depto_vm: string = ''

  /**
   *Los id por default.
   *
   * @type {DefaultModelData}
   * @memberof ListaDeOrdenesService
   */
  defaultModelData: DefaultModelData = new DefaultModelData()

  ultimaActualizacion: Date = new Date()

  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public _util: UtilidadesService,
    public _defaultService: DefaultsService,
    public _msjService: ManejoDeMensajesService
  ) {}

  ngOnDestroy(): void {
    clearInterval(this.intervaloDeRefrescoDeOrdenes)
  }

  cargarDefaults(): Promise<DefaultModelData> {
    return new Promise((resolve, reject) => {
      this._defaultService.cargarDefaults().subscribe(resp => {
        resolve(resp)
      })
    })
  }

  /**
   * Extra las ordenes correspondientes a este departamento.
   *
   * @returns {*}
   * @memberof ListaDeOrdenesService
   */
  controlDeProduccion(): any {
    const a: number = this._preLoaderService.loading(
      `Cargando ordenes: ${DEPARTAMENTOS.CONTROL_DE_PRODUCCION._n}`
    )
    this.cargarDefaults()
      .then(d => {
        this.cargarOrdenes(
          d.DEPARTAMENTOS.CONTROL_DE_PRODUCCION,
          this.opciones,
          a
        )
        this.depto_vm = DEPARTAMENTOS.CONTROL_DE_PRODUCCION._vm
      })
      .catch(err => {
        this._msjService.err(err)
      })
  }

  //    /**
  //    * Extra las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  //   almacenDeBoton(): any {
  //     const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.ALMACEN_DE_BOTON._n}`);
  //     this.cargarDefaults().then(d=>{
  //       this.cargarOrdenes(d.DEPARTAMENTOS.ALMACEN_DE_BOTON, this.opciones,a);
  //       this.depto_vm = DEPARTAMENTOS.ALMACEN_DE_BOTON._vm;
  //     }).catch( err =>{
  //       this._msjService.err(err);
  //     })

  //   }

  //   /**
  //    * Extra las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  //   materiales() {
  //     // if ( this.depto ) {
  //       const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.MATERIALES._n}`);
  //       this.cargarDefaults().then(d=>{
  //         this.cargarOrdenes(d.DEPARTAMENTOS.MATERIALES, this.opciones,a);
  //         this.depto_vm = DEPARTAMENTOS.MATERIALES._vm

  //       }).catch( err =>{
  //         this._msjService.err(err);
  //       })

  //     // }
  //   }

  //   /**
  //    * Extra las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  //   pastilla() {
  //     // if ( this.depto ) {
  //       const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PASTILLA._n}`);
  //       this.cargarDefaults().then(d=>{
  //         this.cargarOrdenes(d.DEPARTAMENTOS.PASTILLA, this.opciones,a);
  //       this.depto_vm = DEPARTAMENTOS.PASTILLA._vm

  //       }).catch( err =>{
  //         this._msjService.err(err);
  //       })

  //   // }
  // }

  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // transformacion() {
  //     // if ( this.depto ) {
  //       const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.TRANSFORMACION._n}`);
  //       this.cargarDefaults().then(d=>{
  //         this.cargarOrdenes(d.DEPARTAMENTOS.TRANSFORMACION, this.opciones,a);
  //       this.depto_vm = DEPARTAMENTOS.TRANSFORMACION._vm

  //       }).catch( err =>{
  //         this._msjService.err(err);
  //       })

  //   // }
  // }
  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // laser() {
  //     // if ( this.depto ) {
  //     const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.LASER._n}`);
  //     this.cargarDefaults().then(d=>{
  //       this.cargarOrdenes(d.DEPARTAMENTOS.LASER, this.opciones,a);
  //       this.depto_vm = DEPARTAMENTOS.LASER._vm

  //     }).catch( err =>{
  //       this._msjService.err(err);
  //     })

  //   // }
  // }

  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // pulido(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PULIDO._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.PULIDO, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.PULIDO._vm

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })

  // }

  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // seleccion(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.SELECCION._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.SELECCION, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.SELECCION._vm

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })
  // }

  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // empaque(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.EMPAQUE._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.EMPAQUE, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.EMPAQUE._vm

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })
  // }

  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // metalizado(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.METALIZADO._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.METALIZADO, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.METALIZADO._vm

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })
  // }
  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // burato(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.BURATO._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.BURATO, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.BURATO._vm

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })
  // }
  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // barnizado(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.BARNIZADO._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.BARNIZADO, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.BARNIZADO._vm

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })
  // }

  // /**
  //    * Extrae las ordenes correspondientes a este departamento.
  //    *
  //    * @returns {*}
  //    * @memberof ListaDeOrdenesService
  //    */
  // productoTerminado(): any {
  //   const a: number = this._preLoaderService.loading(`Cargando ordenes: ${DEPARTAMENTOS.PRODUCTO_TERMINADO._n}`);
  //   this.cargarDefaults().then(d=>{
  //     this.cargarOrdenes(d.DEPARTAMENTOS.PRODUCTO_TERMINADO, this.opciones,a);
  //     this.depto_vm = DEPARTAMENTOS.PRODUCTO_TERMINADO._vm;

  //   }).catch( err =>{
  //     this._msjService.err(err);
  //   })

  intervaloDeRefrescoDeOrdenes: any
  /**
   *Este valor es el tiempo que durara en refrescarse la lista
   de ordenes.
   *
   * @memberof ListaDeOrdenesService
   */
  tiempoDeRefrescoDeOrdenes = 5 * 60 * 1000

  /**
   *Este cb almacena la operacion de con todos sus parametros
   * para que se ejecute antes de tiempo.
   *
   * @type {*}
   * @memberof ListaDeOrdenesService
   */
  cbDeRefrescoDeOrden: () => void

  // }
  /**
   * Carga general para clase GeneralesComponents.
   *
   *
   * @param {string} nombreDepto El nombre del departamento que se mostrara en la precarga.
   * @param {string} idDepto El id del departamento del cual se quieren cargar las ordenes.
   * @param {string} vm_Depto El string de la variable de modelo del depto. ( Esto es para buscar la orden en ese depto.)
   * @memberof ListaDeOrdenesService
   */
  cargar(nombreDepto: string, idDepto: string, vm_Depto: string) {
    if (this.intervaloDeRefrescoDeOrdenes)
      clearInterval(this.intervaloDeRefrescoDeOrdenes)
    const a: number = this._preLoaderService.loading(
      `Cargando ordenes: ${nombreDepto}`
    )
    //Almacena el cb con los datos que necesitamos
    // para el boton de refresco y no tener que hacer un
    //desmain agregando el boton.
    this.cbDeRefrescoDeOrden = () => {
      this.ultimaActualizacion = new Date()
      this.cargarOrdenes(idDepto, this.opciones, a)
    }

    //La primera ejecucion de gratis.
    this.cbDeRefrescoDeOrden()

    this.intervaloDeRefrescoDeOrdenes = setInterval(
      () => this.cbDeRefrescoDeOrden(),
      this.tiempoDeRefrescoDeOrdenes
    )

    this.depto_vm = vm_Depto
  }

  /**
   * Esta funcion carga las ordenes de manera genericia. Para un departamento
   * en especifico utilizar las propiad de cada uno.
   *
   * @param {string} depto El id del departamento (FIX en 0.3.0)
   * @param {*} [opciones={}] Opciones para algo????
   * @param {number} a
   * @memberof ListaDeOrdenesService
   */
  cargarOrdenes(depto: string, opciones = {}, a: number) {
    this._folioService
      .cargarOrdenesDepartamento(depto, opciones)
      .subscribe((resp: any) => {
        this.ordenes = resp
        if (this.ordenes) {
          this.niveles = Object.keys(this.ordenes)
        }
        this._preLoaderService.ok(a)
      })
  }

  /**
   * Comprueba si hay ordenes cargadas.
   *
   * @returns
   * @memberof ListaDeOrdenesService
   */
  hayOrdenes() {
    for (const x in this.ordenes) {
      if (this.ordenes[x].length > 0) {
        return true
      }
    }

    return false
  }

  /**
   * Quita una orden de la lista. Esta funcion esta depecrated.
   * Hay que cargar todas las ordenes cada vez que se elimine una
   * para revisar si no se han agregado mas.
   * @deprecated
   *
   * @param {string} id
   * @memberof ListaDeOrdenesService
   */
  remover(id: string) {
    // Removemos la órden que acabamos de eliminar.

    // tslint:disable-next-line:forin
    for (const x in this.ordenes) {
      const a = this.ordenes[x]
      this.ordenes[x] = this.ordenes[x].filter(orden => {
        if (orden._id !== id) {
          return true
        }
      })
    }
  }

  /**
   * Retorna las ordenes del departamento sin los niveles de prioridad.
   *
   * @returns {Orden[]} Un arreglo de todas las ordenes existentes.
   * @memberof ListaDeOrdenesService
   */
  obtenerTodasLasOrdenesDeEsteDepartamentoEnArray(): Orden[] {
    let a: Orden[] = []
    for (const x in this.ordenes) {
      if (this.ordenes.hasOwnProperty(x)) {
        const ordenes = this.ordenes[x]

        a = a.concat(ordenes)
      }
    }

    return a
  }

  /**
   *Obtiene id de las ordenes del departamento definido en un arreglo de strings.
   *
   * @returns {string[]}
   * @memberof ListaDeOrdenesService
   */
  obtenerTodasLasOrdenesDeEsteDepartamentoEnArrayYSoloId(): string[] {
    const ordenes: Orden[] = this.obtenerTodasLasOrdenesDeEsteDepartamentoEnArray()
    const ids: string[] = []
    ordenes.forEach((orden: Orden) => {
      ids.push(orden._id)
    })
    return ids
  }
}
