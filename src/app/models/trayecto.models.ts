import { Departamento } from './departamento.models';
import { Materiales } from './materiales.models';
import { Transformacion } from './transformacion.models';
import { Pulido } from './pulido.models';
import { Seleccion } from './seleccion.models';
import { ControlDeProduccion } from './controlDeProduccion.model';
import { Pastilla } from './pastilla.model';
import { Empaque } from './empaque.models';
import { ProductoTerminado } from './productoTerminado.model';
import { Metalizado } from './metalizado.model';
import { Barnizado } from './barnizado.model';
import { Burato } from './burato.model';
import { AlmacenDeBoton } from './almacenDeBoton.model';
import { Laser } from './laser.model';
export class Trayecto {
    constructor(

    public orden?: number,
    public departamento?:  Departamento,

    public materiales: Materiales = new Materiales() ,
    public transformacion: Transformacion = new Transformacion() ,
    public pulido: Pulido = new Pulido() ,
    public seleccion: Seleccion = new Seleccion() ,



    public controlDeProduccion: ControlDeProduccion = new ControlDeProduccion(),  
    public pastilla: Pastilla = new Pastilla(),  
    public empaque: Empaque = new Empaque(),  
    public productoTerminado: ProductoTerminado = new ProductoTerminado(),  
    public metalizado: Metalizado = new Metalizado(),  
    public barnizado: Barnizado = new Barnizado(),  
    public burato: Burato = new Burato(),  
    public laser: Laser = new Laser(),  
    public almacenDeBoton: AlmacenDeBoton = new AlmacenDeBoton(),  

    // public siguiente?: Departamento, 
    // public anterior?: Departamento,
    public entrada?: Date,
    public salida?: Date,
    public recivida: boolean = false,

    ) {}

}
