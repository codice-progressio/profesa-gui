import { Injectable } from '@angular/core';
import { GastoConsumo } from 'src/app/models/gastoConsumo.model';
import { Maquina } from 'src/app/models/maquina.model';
import { Proceso } from 'src/app/models/proceso.model';
import { Procesos } from "src/app/models/procesos.model";
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class CalculosDeCostosService {

  constructor() { }

  // El costo del proceso por hora. 
  procesoHora ( proceso: Proceso ): number {
    let total: number  = 0;
    
    // proceso.gastos.forEach((gc: GastoConsumo) => {
    //   total += this.gastoHora( gc );
    // });

    proceso.maquinas.forEach((maq: Maquina) => {
      total += this.maquinaHora( maq );
      
    });
    

    return total;
  }
  
  procesoMin( proceso: Proceso ): number {
    return this.procesoHora( proceso ) / 60;
  }
  
  // Costo de la máquina por hora. 
  maquinaHora( maq: Maquina ): number {
    let total: number = 0;
    
    // maq.gastos.forEach((gc: GastoConsumo) => {
    //   // Multiplicamos costoPorHora * el consumo. 
    //   total += this.gastoHora( gc );
    // });
    // total += this.depreciacionHora( maq );
    return total;
  }

  maquinaMinuto( maq: Maquina ): number {
    return this.maquinaHora( maq ) / 60;
  }

  maquinaSegundo( maq: Maquina ): number {
    return this.maquinaMinuto( maq ) / 60;
  }
  
  // Costo del gasto por hora. 
  gastoHora( gc: GastoConsumo ): number {
    return gc.gasto.costoPorHora * gc.consumo;
  }

  gastoMinuto( gc: GastoConsumo ): number {
    return this.gastoHora(gc) / 60;
  }
  gastoSegundo( gc: GastoConsumo ): number {
    return this.gastoMinuto(gc) / 60;
  }
  
  // Costo de depreciación por hora. 
  depreciacionHora( maq: Maquina ): number {
      // Calculamos la depreciación
      // const de: number =  (maq.costo / maq.depreciacion) / ( 365 * 24) ;
      // return de;
      return 1
  }
  
  depreciacionMinuto( maq: Maquina ): number {
      // Calculamos la depreciación
      return this.depreciacionHora(maq) / 60;
  }
  
  depreciacionSegundo( maq: Maquina ): number {
      // Calculamos la depreciación
      return this.depreciacionMinuto(maq) / 60;
  }
  

  procesoTotalMaquinas( proc: Procesos, mc: ModeloCompleto ): number {
    // Retorna el total de el gasto de máquinas. 
    
    let total: number = 0;
    // Recorremos todas las máquinas. 
    proc.proceso.maquinas.forEach(maquina => {
      const seg = maquina.tiempos[this.id(mc._id, proc.proceso._id, maquina._id)];
      const op = this.maquinaSegundo(maquina) * seg ;
      total += ( Number.isNaN(op) ? 0 : op);
    });
    return total;
  }

  procesoTotalGastos( proc: Procesos, mc: ModeloCompleto ): number {
    // Retorna el total de el gasto de máquinas. 
    
    let total: number = 0;
    // // Recorremos todas las máquinas. 
    // proc.proceso.gastos.forEach((gc: GastoConsumo) => {
    //   const seg = gc.gasto.tiempos[this.id(mc._id, proc.proceso._id, gc.gasto._id)];
    //   const op = this.gastoSegundo( gc ) * seg;
    //   total += isNaN(op) ? 0 : op;
    // });
    return total;
  }

  procesoTotal( proc: Procesos, mc: ModeloCompleto ): number {
    let total: number = 0;
    total += this.procesoTotalMaquinas( proc, mc);
    total += this.procesoTotalGastos( proc, mc);
    return total;
  }

  totalFamiliaDeProcesos( mc: ModeloCompleto ): number {
    
    let total: number = 0;
    mc.familiaDeProcesos.procesos.forEach(proc => {
      total += this.procesoTotal( proc, mc);
    });
    return total;

  }

  totalProcesosEspeciales( mc: ModeloCompleto ): number {
    let total: number = 0;
    mc.procesosEspeciales.forEach(proc => {
      total += this.procesoTotal(proc, mc);
    });
    return total;
  }


  id( ...id): string {
    let a: string = '';
    for (let i = 0; i < id.length; i++) {
      const element = id[i];
      a += id[i];
    }
    
    return a;
  }


}
