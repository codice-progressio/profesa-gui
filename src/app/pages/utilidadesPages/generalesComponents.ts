import { QrScannerService } from "src/app/components/qr-scanner/qr-scanner.service";
import { ListaDeOrdenesService } from "src/app/components/lista-de-ordenes/lista-de-ordenes.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DEPARTAMENTOS } from "src/app/config/departamentos";
import { DefaultsService } from "src/app/services/configDefualts/defaults.service";
import { DefaultModelData } from "src/app/config/defaultModelData";
import { Orden } from "src/app/models/orden.models";
import { FolioLinea } from "src/app/models/folioLinea.models";
import { Departamento } from "src/app/models/departamento.models";
import { VariablesDeptos } from "src/app/config/departamentosConfig";
import { ModeloCompleto } from "src/app/models/modeloCompleto.modelo";
import { FolioService } from "src/app/services/folio/folio.service";
import { DepartamentoService } from "src/app/services/departamento/departamento.service";

/**
 *Gestiona las propiedades generales para la gestion de los 
 departamentos que registrar ordenes. El principal metodo
 a tomar en cuenta es tareasDeConfiguracion que entre otras
 cosas carga los valores por default como los id de los 
 departamentos y la lista de ordenes filtrada.
 *
 * @export
 * @class GeneralesComponents
 * @template T
 */
export class GeneralesComponents<T> {
    
    /**
     *El nombre que se mostrara del departamento. 
     *
     * @type {string}
     * @memberof GeneralesComponents
     */
    NOMBRE_DEPTO: string = DEPARTAMENTOS.MATERIALES._n;


    /**
     * El id del departamento que esta registrado en la BD. 
     *
     * @type {string}
     * @memberof GeneralesComponents
     */
    ID_DEPTO: string;


    /**
     *El formulario del componente. 
     *
     * @type {FormGroup}
     * @memberof GeneralesComponents
     */
    formulario: FormGroup;
    /**
     *La orden que se esta trabajando. 
     *
     * @type {Orden}
     * @memberof GeneralesComponents
     */
    orden: Orden;

    /**
     * El modelo donde se almacenaran los datos.
     *
     * @type {T}
     * @memberof GeneralesComponents
     */
    modelo: T;

    /**
     *La linea a la que pertence la orden.
     *
     * @type {FolioLinea}
     * @memberof GeneralesComponents
     */
    linea: FolioLinea = new FolioLinea();
  

    /**
     *Los id por default de los diferentes procesos. 
     Se almacenan aqui para tenerlos disponibles en cunato la clase
     se cargue. 
     *
     * @type {DefaultModelData}
     * @memberof GeneralesComponents
     */
    defaults: DefaultModelData;



    /**
     * El callback personalizado que se ejecuta dentro de tareasNgOnInit()
     * 
     *
     * @type {*}
     * @memberof GeneralesComponents
     */
    callback_ngOnInit: any = null;

    /**
     *Las variables estaticas de este departamento. 
     *
     * @type {VariablesDeptos}
     * @memberof GeneralesComponents
     */
    variablesDepto: VariablesDeptos = null;

    /**
     * Esta propiedad se encarga de desactivar el boton de onsubmit y cualquier
     * otro que se necesite para que no se dupliquen los envios. Se pone en true cuando
     * se manda a guardar y cuando se termina el guardado y el servidor dio una respuesta
     * vuelve a activarse. 
     *
     * @type {boolean}
     * @memberof GeneralesComponents
     */
    enviando: boolean = false;


    /**
     * El callback que se ejecutara de manera opcional en buscarOrden
     * de el qurScannerService. 
     *
     * @type {*}
     * @memberof GeneralesComponents
     */
    callbackOpcional_QRScannerService: any = null;
    

    modeloCompleto: ModeloCompleto;
    


    /**
     *Creates an instance of GeneralesComponents.
     * @param {QrScannerService} _qrScannerService El scaner qr para las ordenes. 
     * @param {ListaDeOrdenesService} _listaDeOrdenesService Donde se genera la lista de ordenes del departamento. 
     * @param {FormBuilder} formBuilder Para construir el formulario. 
     * @param {FolioService} _folioService Las operaciones de grabado y lectura de las ordenes. 
     * @param {DefaultsService} _defaultService Los id por default. 
     * @memberof GeneralesComponents
     */
    constructor(
        public _qrScannerService: QrScannerService<T>,
        public _listaDeOrdenesService: ListaDeOrdenesService,
        public formBuilder: FormBuilder,
        public _folioService: FolioService,
        public _defaultService: DefaultsService,
        public _departamentoService: DepartamentoService

    ) { }

     /**
     *Ejecuta las tareas de configuracion 
     como lo son:

        - Obtencion del departamento desde la BD.(ID y nombre)
        - Carga de las ordenes. ( Del departamento en cuestion. )

        
     * Esta funcion se ejecuta desde el constructor antes que cualquier cosa.
     * @param {string} variablesDepto El nombre de la variable del departamento que se quiere
     * obtener su id.
     * @memberof GeneralesComponents
     */
    tareasDeConfiguracion( variablesDepto: VariablesDeptos = null ) {
        if( !variablesDepto ){
            throw new Error('No se definieron los nombres de variables para el departamento..');
        }

        this.variablesDepto = variablesDepto;
        let depto_vm = variablesDepto._vm;
        
        // Obtenemos el id del departamento. 
        new Promise( (resolve, reject ) =>{
            this._defaultService.cargarDefaults()
           .toPromise()
           .then( (def: DefaultModelData ) =>{
               this.defaults = def
               this.ID_DEPTO = def.DEPARTAMENTOS[ this.variablesDepto._v ];
               // Obtenemos el nombre. 
               return this._departamentoService.buscarPorId( this.ID_DEPTO )
                    .toPromise();
           }).then( ( departamento: Departamento ) => {
                this.NOMBRE_DEPTO = departamento.nombre
                this.cargarOrdenedDeDepartamento(this.NOMBRE_DEPTO, this.ID_DEPTO, depto_vm )
                this.tareasNgOnInit();
                resolve( )
           }).catch( err => {
               reject( err );
           });
        });
    }

    /**
     * Ejecuta las tareas que deben de ir en el tiempo del ngOnInit.
     * Las tareas que realiza son las siguientes (En ese orden):
     * 
     *  - Define el titulo a mostrar en el scanner.  
     *  - Define el callback de busqueda. 
     *  - Ejecutar el callback de datos personalizado. 
     *
     * @memberof GeneralesComponents
     */
    tareasNgOnInit(){
        this._qrScannerService.titulo = this.NOMBRE_DEPTO;
        this._qrScannerService.buscarOrden( 
            this,
            ()=>{ this.limpiar() },
            ()=>{ if( this.callbackOpcional_QRScannerService ) this.callbackOpcional_QRScannerService();  }           
        )

        this._qrScannerService.iniciar();


    }


    /**
     *Carga la lista de ordenes de este departamento
     en la lista de ordenes service.
     
     * @param {string} nombreDepto El nombre del departamento para mostrarlo en la precarga. 
     * @param {string} idDepto El id del departamento
     * @param {*} vm_depto El nombre de la variable para cargar las ordenes de ese departamento. 
     * @memberof GeneralesComponents
     */
    cargarOrdenedDeDepartamento(nombreDepto: string, idDepto: string, vm_depto: string ) {
        this._listaDeOrdenesService.cargar( nombreDepto, idDepto, vm_depto  );
    }

    /**
     *Limpia los datos ejecutando las siguientes operaciones. 
     * - cargarOrdenesDeDepartamento( )  
     * - qrScannerService.iniciar( )
     * - formulario.reset( )  
     *
     * @memberof GeneralesComponents
     */
    limpiar( ){
        this.cargarOrdenedDeDepartamento(this.NOMBRE_DEPTO, this.ID_DEPTO, this.variablesDepto._vm)
        this._qrScannerService.iniciar( );
        this.formulario.reset( );
    }

    /**
     *La funcion que se ejecutara desde el formulario. 
     *
     * @param {T} modelo El modelo del cual se guardaran los datos. 
     * @param {boolean} isValid Esta funcion solo se ejecuta si este parametro es true. 
     * @param {*} e El evento que previene la ejecucion por defecto del submit del html. 
     * @memberof GeneralesComponents
     */
    onSubmit( modelo: T, isValid: boolean, e ){
        e.preventDefault()
        // No se ejecuta si el formulario no es valido. 
        if( !isValid ) return false;

        this._folioService.modificarOrden(modelo, this.orden._id, this.ID_DEPTO)
            .subscribe( ()=>{ this.limpiar() } )
    }

    /**
     *Marca la orden seleccionada como trabajando y limpia el formulario. 
     *
     * @memberof GeneralesComponents
     */
    iniciarTrabajoDeOrden ( ){
        this._folioService.iniciarTrabajoDeOrden(this.orden, this.ID_DEPTO, this.variablesDepto )
            .subscribe( ()=>{
                this.limpiar();
            })
    }

   


}