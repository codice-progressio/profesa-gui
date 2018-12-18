import { Component, OnInit } from '@angular/core';
import { Proceso } from 'src/app/models/proceso.model';
import {
  ProcesoService,
  MaquinaService,
  GastoService,
  DepartamentoService,
  ManejoDeMensajesService,
  CalculosDeCostosService
} from 'src/app/services/service.index';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { FamiliaDeProcesos } from 'src/app/models/familiaDeProcesos.model';
import swal from 'sweetalert2';
import { Maquina } from 'src/app/models/maquina.model';
import { Gasto } from 'src/app/models/gasto.model';
import { Departamento } from 'src/app/models/departamento.models';
import { GastoConsumo } from 'src/app/models/gastoConsumo.model';
import { log } from 'util';

@Component({
  selector: 'app-costos-de-proceso',
  templateUrl: './costos-de-proceso.component.html',
  styles: []
})
export class CostosDeProcesoComponent implements OnInit {
  procesosNormales: Proceso[];
  procesosEspeciales: Proceso[];
  familiaDeProcesos: FamiliaDeProcesos[];

  procesoEditandose: Proceso = null;
  public maquinaEditandose: Maquina = null;
  gastoEditandose: Gasto = null;

  maquinas: Maquina[] = [];
  gastos: Gasto[] = [];
  departamentos: Departamento[] = [];

  constructor(
    public _procesoService: ProcesoService,
    public _preLoaderService: PreLoaderService,
    public _maquinaService: MaquinaService,
    public _gastoService: GastoService,
    public _departamentosService: DepartamentoService,
    public _manejoDeMensajesService: ManejoDeMensajesService,
    public _calculosDeCostoService: CalculosDeCostosService,
  ) {
    this._procesoService.obtenerTodosLosProcesos().subscribe(resp => {
      this.familiaDeProcesos = resp.familiaDeProcesos;
      this.procesosEspeciales = resp.procesosEspeciales;
      this.procesosNormales = resp.procesosNormales;
    });

    this._maquinaService
      .obtenerTodasLasMaquinas()
      .subscribe((maquinas: Maquina[]) => {
        this.maquinas = maquinas;
      });

    this._gastoService.cargarTodosLosGastos().subscribe((gastos: Gasto[]) => {
      this.gastos = gastos;
    });

    this._departamentosService
      .cargarDepartamentos()
      .subscribe((departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      });
  }

  ngOnInit() {}

  editando() {
    return false;
  }

  // calcularCosto( proceso: Proceso ): number {
  //   return 12;
  // }

  guardarModificacionesAEstaMaquina(maquina: Maquina) {
    // Debe tener por lo menos un gasto.
    if (maquina.gastos.length === 0) {
      swal(
        'No asignaste gastos.',
        'Debes de asignar por lo menos un gasto a la máquina. ',
        'error'
      );
      return;
    }

    // Debe tener por lo menos un departamento.
    if (maquina.departamentos.length === 0) {
      swal(
        'No asignaste departamentos.',
        'Debes de asignar por lo menos un departamento a la máquina. ',
        'error'
      );
      return;
    }

    if (!maquina._id) {
      this._maquinaService
        .guardarNuevaMaquina(maquina)
        .subscribe((resp: Maquina) => {
          this.limpiarMaquina(maquina);
        });
    } else {
      this._maquinaService
        .modificarMaquina(maquina)
        .subscribe((resp: Maquina) => {
          this.limpiarMaquina(maquina);
        });
    }
  }

  limpiarMaquina(maquina: Maquina = null) {
    if (!maquina) {
      this.maquinaEditandose.editado = false;
      this.maquinaEditandose = null;
    } else {
      maquina.editado = false;
      this.maquinaEditandose = null;
    }
  }

  limpiarGasto(gasto: Gasto = null) {
    if (!gasto) {
      this.gastoEditandose.editandose = false;
      this.gastoEditandose = null;
    } else {
      gasto.editandose = false;
      this.gastoEditandose = null;
    }
  }

  limpiarProceso() {
    this.procesoEditandose.editado = false;
    this.procesoEditandose = null;
  }

  nuevaMaquina() {
    this.maquinaEditandose = new Maquina();
    this.maquinaEditandose.nombre = 'Maquina nueva ';
    this.maquinaEditandose.editado = true;
    this.maquinas.push(this.maquinaEditandose);
  }

  nuevoGasto() {
    this.gastoEditandose = new Gasto();
    this.gastoEditandose.costoPorHora = 1;
    this.gastoEditandose.gastoDirecto = false;
    this.gastoEditandose.nombre = 'Nuevo Gasto ';
    this.gastoEditandose.unidadPorHora = 'unid/h ';
    this.gastoEditandose.editandose = true;
    this.gastos.push(this.gastoEditandose);
  }

  compareFn(a, b) {
    // MEGA IMPORTANTE FUNCIÓN PARA QUE LOS SELECST COINCIDAN
    return a && b && a.num === b.num;
  }

  agregarGasto(gasto: Gasto) {
    this.maquinaEditandose.gastos.push(this.crearGastoConsumo(gasto));
  }

  agregarGastoAProceso(gasto: Gasto) {
    this.procesoEditandose.gastos.push(this.crearGastoConsumo(gasto));
  }

  private crearGastoConsumo(gasto: Gasto): GastoConsumo {
    const gc = new GastoConsumo();
    gc.consumo = 0;
    gc.gasto = gasto;
    gc.editando = true;
    return gc;
  }

  eliminarGastoConsumo(i: number) {
    this.maquinaEditandose.gastos.splice(i, 1);
  }

  eliminarDepartamento(i: number) {
    this.maquinaEditandose.departamentos.splice(i, 1);
  }

  maquinaContieneDepartamento(depto: Departamento) {
    if (!this.maquinaEditandose.departamentos) {
      return;
    }
    for (let i = 0; i < this.maquinaEditandose.departamentos.length; i++) {
      const d: Departamento = this.maquinaEditandose.departamentos[i];
      if (d._id === depto._id) {
        return true;
      }
    }
    return false;
  }

  maquinaContieneGasto(gasto: Gasto) {
    if (!this.maquinaEditandose.gastos) {
      return;
    }

    for (let i = 0; i < this.maquinaEditandose.gastos.length; i++) {
      const g: Gasto = this.maquinaEditandose.gastos[i].gasto;
      if (g._id === gasto._id) {
        return true;
      }
    }
    return false;
  }

  eliminarMaquina(i: number) {
    // Si no tiene id solo lo eliminamos del array.
    this.maquinas.splice(i, 1);
    this._manejoDeMensajesService.eliminado('Se elimino la máquina.');
  }

  eliminarGasto(i: number) {
    this.gastos.splice(i);
    this._manejoDeMensajesService.eliminado('Se elimino el gasto');
  }

  guardarModificacionesAGasto(gasto: Gasto) {
    if (!gasto._id) {
      this._gastoService
        .guardarUnGasto(gasto)
        .subscribe((gastoGuardado: Gasto) => {
          gasto._id = gastoGuardado._id;
          this.limpiarGasto(gasto);
        });
    } else {
      this._gastoService
        .modificarUnGasto(gasto)
        .subscribe((gastoGuardado: Gasto) => {
          this.limpiarGasto(gasto);
        });
    }
  }

  procesoContieneGasto(gasto: Gasto): boolean {
    if (!this.procesoEditandose.gastos) {
      return;
    }

    for (let i = 0; i < this.procesoEditandose.gastos.length; i++) {
      const p: Gasto = this.procesoEditandose.gastos[i].gasto;
      if (p._id === gasto._id) {
        return true;
      }
    }
    return false;
  }
  
  procesoContieneMaquina(maquina: Maquina): boolean {
    if (!this.procesoEditandose.maquinas) {
      return;
    }

    for (let i = 0; i < this.procesoEditandose.maquinas.length; i++) {
      const m: Maquina = this.procesoEditandose.maquinas[i];
      if (m._id === maquina._id) {
        return true;
      }
    }
    return false;
  }

  guardarModificacionesAEsteProceso(proceso: Proceso) {
  

    this._procesoService
      .modificarProceso(proceso)
      .subscribe((resp: Proceso) => {
        this.limpiarProceso();
      });
  }
}
