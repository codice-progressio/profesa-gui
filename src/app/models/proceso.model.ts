import { Departamento } from './departamento.models';
import { Paso } from './paso.model';
import { GastoConsumo } from './gastoConsumo.model';
import { Maquina } from './maquina.model';

export class Proceso {

    constructor(
      public _id?: string,
      public departamento?: Departamento,
      public nombre?: string,
      // public pasos?: Paso[], //LO TENEMOS QUE ELIMINAR
      public observaciones?: string,
      public especial?: boolean,
      // public gastos: GastoConsumo[] = [],
      public maquinas: Maquina[] = [],
      public requiereProduccion: boolean = true,
      // SOLO PARA MOSTRAR INFO.
      public ver: boolean = false,
      public editado: boolean = false,
    
    ) {
    }

    static fromJSON(data: any) {
      data.departamento = Object.assign(new Departamento, data.departamento);
      data.pasos = Paso.fromJSON_Array( data.pasos);
      data.gastos = GastoConsumo.fromJSON_Array( data.gastos);
      data.maquinas = Maquina.fromJSON_Array( data.maquinas);
      return Object.assign(new this, data);
  }

  static fromJSON_Array( data: any []) {
      return data.map( x => x = Proceso.fromJSON(x));
  }

   

    
}
