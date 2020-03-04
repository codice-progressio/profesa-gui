import { Departamento } from "./departamento.models"
import { Materiales } from "./materiales.models"
import { Transformacion } from "./transformacion.models"
import { Pulido } from "./pulido.models"
import { Seleccion } from "./seleccion.models"
import { ControlDeProduccion } from "./controlDeProduccion.model"
import { Pastilla } from "./pastilla.model"
import { Empaque } from "./empaque.models"
import { ProductoTerminado } from "./productoTerminado.model"
import { Metalizado } from "./metalizado.model"
import { Barnizado } from "./barnizado.model"
import { Burato } from "./burato.model"
import { AlmacenDeBoton } from "./almacenDeBoton.model"
import { Laser } from "./laser.model"
import { Deserializable } from "./deserealizable.model"
export class Trayecto implements Deserializable {
  constructor(
    public orden?: string,
    public departamento?: Departamento,
    public materiales: Materiales = new Materiales(),
    public transformacion: Transformacion = new Transformacion(),
    public pulido: Pulido = new Pulido(),
    public seleccion: Seleccion = new Seleccion(),
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
    public recepcion?:Date
  ) {}

  deserialize(input: this): this {
    
    if (!input) {
      console.log("No esta definido  el trayecto ")
      return this
    }
    Object.assign(this, input)
    
    this.departamento = new Departamento().deserialize(input.departamento)
    

    

    this.materiales = new Materiales().deserialize(input.materiales)
    
    this.transformacion = new Transformacion().deserialize(input.transformacion)
    
    this.pulido = new Pulido().deserialize(input.pulido)
    
    this.seleccion = new Seleccion().deserialize(input.seleccion)
    
    this.controlDeProduccion = new ControlDeProduccion().deserialize(
      input.controlDeProduccion
    )
    
    this.pastilla = new Pastilla().deserialize(input.pastilla)
    
    this.empaque = new Empaque().deserialize(input.empaque)
    
    this.productoTerminado = new ProductoTerminado().deserialize(
      input.productoTerminado
    )
    
    this.metalizado = new Metalizado().deserialize(input.metalizado)
    
    this.burato = new Burato().deserialize(input.burato)
    
    this.barnizado = new Barnizado().deserialize(input.barnizado)
    
    this.laser = new Laser().deserialize(input.laser)
    
    this.almacenDeBoton = new AlmacenDeBoton().deserialize(input.almacenDeBoton)
    

    return this
  }
}
