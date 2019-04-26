import { Cliente } from "./cliente.models"
import { Usuario } from "./usuario.model"
import { FolioLinea } from "./folioLinea.models"
import { Deserializable } from "./deserealizable.model"

export class Folio implements Deserializable {
  constructor(
    public _id?: string,
    public numeroDeFolio?: string,
    public cliente?: Cliente,
    public fechaFolio: Date = new Date(),
    public fechaEntrega: Date = new Date(),
    public vendedor?: Usuario,
    public observaciones?: string,
    public observacionesVendedor?: string,
    public folioLineas?: FolioLinea[],
    public createdAt?: Date,
    public updatedAt?: Date,
    public eliminar: boolean = false,
    public nivelDeUrgencia?: string,
    public porcentajeAvance?: number,
    public impreso?: boolean,
    public terminado?: boolean,
    public fechaTerminado?: Date,
    public cantidadProducida?: number,
    public ordenesGeneradas?: boolean,
    /**
     * Esta bandera se pone en true cuando las modificaciones al folio se terminador
     * y se pasa el control a control de produccion.
     */
    public entregarAProduccion: boolean = false,
    public fechaDeEntregaAProduccion?: Date,
    // Este es propio del front para
    // interactuar con botones.
    public mostrandoInfo: boolean = false
  ) {}

  deserialize(input: Folio): this {
    Object.assign(this, input)
    this.cliente = new Cliente().deserialize(input.cliente)
    this.vendedor = new Usuario().deserialize(input.vendedor)
    this.folioLineas = input.folioLineas.map(pedido =>
      new FolioLinea().deserialize(pedido)
    )

    return this
  }

  /**
   *Construye las ordenes para todos los pedidos. Esta funcion 
   no guarda estos cambios, si no que los hace de manera temporal 
   antes de realizar el cambio. Solo hace la construccion en el GUI
   *
   * @memberof Folio
   */
  popularOrdenesDeTodosLosPedidos() {
    this.folioLineas.forEach(ped => {
      ped.popularOrdenes()
      // Defininomos en true las ordenes generadas para el
      // al backend genera las ordenes al lanzar el pre save.
      ped.ordenesGeneradas = true
    })
  }

  limpiarParaOrdenesGeneradas() {
    this.folioLineas.forEach(pedido => {
      pedido.ordenes.forEach(orden => {
        delete orden.trayectoNormal
        delete orden.trayectoRecorrido
        delete orden.ubicacionActual
        delete orden.siguienteDepartamento
      })
    })
  }
}
