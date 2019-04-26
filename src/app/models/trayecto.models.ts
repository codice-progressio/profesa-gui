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
    public recivida: boolean = false
  ) {}

  deserialize(input: this): this {
    console.log("3.4.4.0", input)
    if (!input) {
      console.log("No esta definido  el trayecto ")
      return this
    }
    Object.assign(this, input)
    console.log("3.4.4.1", input.departamento)
    this.departamento = new Departamento().deserialize(input.departamento)
    console.log("3.4.4.2")

    console.log("3.4.4.3")

    this.materiales = new Materiales().deserialize(input.materiales)
    console.log("3.4.4.4")
    this.transformacion = new Transformacion().deserialize(input.transformacion)
    console.log("3.4.4.5")
    this.pulido = new Pulido().deserialize(input.pulido)
    console.log("3.4.4.6")
    this.seleccion = new Seleccion().deserialize(input.seleccion)
    console.log("3.4.4.7")
    this.controlDeProduccion = new ControlDeProduccion().deserialize(
      input.controlDeProduccion
    )
    console.log("3.4.4.8")
    this.pastilla = new Pastilla().deserialize(input.pastilla)
    console.log("3.4.4.9")
    this.empaque = new Empaque().deserialize(input.empaque)
    console.log("3.4.4.10")
    this.productoTerminado = new ProductoTerminado().deserialize(
      input.productoTerminado
    )
    console.log("3.4.4.11")
    this.metalizado = new Metalizado().deserialize(input.metalizado)
    console.log("3.4.4.12")
    this.burato = new Burato().deserialize(input.burato)
    console.log("3.4.4.13")
    this.barnizado = new Barnizado().deserialize(input.barnizado)
    console.log("3.4.4.14")
    this.laser = new Laser().deserialize(input.laser)
    console.log("3.4.4.15")
    this.almacenDeBoton = new AlmacenDeBoton().deserialize(input.almacenDeBoton)
    console.log("3.4.4.16")

    return this
  }
}
