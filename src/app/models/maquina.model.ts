import { Orden } from "./orden.models";
import { Departamento } from "./departamento.models";
import { ModeloCompleto } from "./modeloCompleto.modelo";
import { GastoConsumo } from "./gastoConsumo.model";
import { Deserializable } from "./deserealizable.model";

export class Maquina implements Deserializable {
  constructor(
    public _id?: string,
    public nombre?: string,
    public clave?: string,
    public anio?: number,
    public nombresAnteriores?: {
      nombre?: string;
      clave?: string;
      fechaDeCambio?: Date;
    }[],
    // public ordenes?: Orden[],
    public departamentos: Departamento[] = [],
    public datosDeTrabajo?: { modeloTrabajando?: ModeloCompleto },
    public numeroDeSerie?: string,
    // public gastos: GastoConsumo[] = [],
    // public costo?: number,
    // public depreciacion?: number,

    public observaciones?: string,
    public tiempos: any = {
      // Esta estructura debe buscar asi: tiempo[idModeloCompleto] y obitiene los segundos.
    },
    // Solo para GUI
    public editado: boolean = false
  ) {}

  deserialize(input: this): this {
    if (!input) {
      console.log("Deserialize: No existe el input en maquina");
      return this;
    }
    Object.assign(this, input);
    // this.datosDeTrabajo.modeloTrabajando = new ModeloCompleto().deserialize(
    //   input.datosDeTrabajo.modeloTrabajando
    // );

   this.comprobarDepartamento(input)

    return this;
  }

  private comprobarDepartamento(input ){
    if( input.departamentos ){
      this.departamentos = input.departamentos.map(departamento =>
        new Departamento().deserialize(departamento)
      );

    }
  }

  static fromJSON(data: any) {
    data.ordenes = Orden.fromJSON_Array(data.ordenes);
    data.departamentos = Departamento.fromJSON_Array(data.departamentos);
    // data.datosDeTrabajo.modeloTrabajando = ModeloCompleto.fromJSON_Array( data.datosDeTrabajo.modeloTrabajando);
    data.gastos = GastoConsumo.fromJSON_Array(data.gastos);
    return Object.assign(new this(), data);
  }

  static fromJSON_Array(data: any[]) {
    return data.map(x => (x = Maquina.fromJSON(x)));
  }

  // obtenerTiempo( id: string ): number {
  //     this.crearPropiedad( id );
  //     return this.tiempos[id];
  // }

  // modificarTiempo( id: string, tiempo: number ) {
  //     this.crearPropiedad( id );
  //     this.tiempos[id] = tiempo;
  // }

  // crearPropiedad( id: string ) {
  //     if ( this.tiempos.hasOwnProperty( id) ) {
  //         this.tiempos[id] = 0;
  //     }
  // }
}
