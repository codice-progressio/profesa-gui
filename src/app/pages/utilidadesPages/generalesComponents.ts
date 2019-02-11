import { QrScannerService } from "src/app/components/qrScanner/qr-scanner.service";
import { ListaDeOrdenesService } from "src/app/components/lista-de-ordenes/lista-de-ordenes.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FolioService, MaquinaService, UsuarioService, DepartamentoService } from "src/app/services/service.index";
import { DEPARTAMENTOS } from "src/app/config/departamentos";
import { DefaultsService } from "src/app/services/configDefualts/defaults.service";
import { DefaultModelData } from "src/app/config/defaultModelData";
import { Orden } from "src/app/models/orden.models";
import { Materiales } from "src/app/models/materiales.models";
import { FolioLinea } from "src/app/models/folioLinea.models";
import { Usuario } from "src/app/models/usuario.model";

export class GeneralesComponents<T> {
    
    // =========================================
    NOMBRE_DEPTO: string = DEPARTAMENTOS.MATERIALES._n;
    ID_DEPTO: string;
    // =========================================


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

    promesa: Promise<T>;



    /**
     *Creates an instance of GeneralesComponents.
     * @param {QrScannerService} _qrScannerService El scaner qr para las ordenes. 
     * @param {ListaDeOrdenesService} _listaDeOrdenesService Donde se genera la lista de ordenes del departamento. 
     * @param {FormBuilder} formBuilder Para construir el formulario. 
     * @param {FolioService} _folioService
     * @param {DefaultsService} _defaultService
     * @memberof GeneralesComponents
     */
    constructor(
        public _qrScannerService: QrScannerService,
        public _listaDeOrdenesService: ListaDeOrdenesService,
        public formBuilder: FormBuilder,
        public _folioService: FolioService,
        // public _maquinaService: MaquinaService,
        // public _usuarioService: UsuarioService,
        public _defaultService: DefaultsService,
        public _departamentoService: DepartamentoService

    ) {
           
      
    }


    /**
     *Carga la lista de ordenes de este departamento
     en la lista de ordenes service. 
     *
     * @memberof GeneralesComponents
     */
    cargarOrdenedDeDepartamento( ) {
        this._listaDeOrdenesService.cargar();
    }


    /**
     *Ejecuta las tareas de configuracion 
     como lo son:

        - Obtencion del departamento desde la BD.
        - Carga de las ordenes. 

        
     *
     * @param {string} depto_vm El nombre de la variable del departamento que se quiere
     * obtener su id.
     * @memberof GeneralesComponents
     */
    tareasDeConfiguracion( depto_vm: string ): Promise< any > {
        // Obtenemos el id del departamento. 

        return new Promise( (resolve, reject ) =>{
            this._defaultService.cargarDefaults()
           .toPromise()
           .then( (def: DefaultModelData ) =>{
               this.ID_DEPTO = def.DEPARTAMENTOS[ depto_vm ];
               // Obtenemos el nombre. 

               return this._departamentoService.

           }).catch( err => {
               reject( err );
           });
            
        });


        
        // return new Promise( ( resolve, reject ) => {
        //     this._defaultService.cargarDefaults().toPromise().;

        //     console.log('uno')
        //     this.cargarOrdenedDeDepartamento();
        // });
    }


}