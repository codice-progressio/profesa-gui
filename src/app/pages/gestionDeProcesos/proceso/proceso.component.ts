import { Component, OnInit } from '@angular/core';
import {
  ProcesoService,
  ManejoDeMensajesService,
  DepartamentoService,
  GastoService,
  MaquinaService,
  CalculosDeCostosService
} from 'src/app/services/service.index';
import { Proceso } from 'src/app/models/proceso.model';
import {
  FamiliaDeProcesos,
  Procesos
} from 'src/app/models/familiaDeProcesos.model';
import swal from 'sweetalert2';
import { PreLoaderService } from '../../../components/pre-loader/pre-loader.service';
import { Paso } from '../../../models/paso.model';
import { Departamento } from 'src/app/models/departamento.models';
import { Gasto } from 'src/app/models/gasto.model';
import { GastoConsumo } from 'src/app/models/gastoConsumo.model';
import { Maquina } from 'src/app/models/maquina.model';

@Component({
  selector: 'app-proceso',
  templateUrl: './proceso.component.html',
  styles: []
})
export class ProcesoComponent implements OnInit {
  familiaDeProcesos: FamiliaDeProcesos[];
  familiaEditandose: FamiliaDeProcesos = null;
  // familiaNueva: FamiliaDeProcesos = null;

  procesoEditandose: Proceso = null;
  maquinaEditandose: Maquina = null;
  gastoEditandose: Gasto = null;

  procesosEspeciales: Proceso[] = [];
  procesosNormales: Proceso[] = [];
  departamentos: Departamento[];
  gastos: Gasto[] = [];
  maquinas: Maquina[] = [];

  constructor(
    private _procesoService: ProcesoService,
    public _preloaderService: PreLoaderService,
    public _departamentosService: DepartamentoService,
    public _gastoService: GastoService,
    public _maquinaService: MaquinaService,
    public _manejoDeMensajesService: ManejoDeMensajesService,
    public _calculoDeCostosSerivice: CalculosDeCostosService
  ) {
    this._preloaderService.cargando = true;
    this._procesoService.obtenerTodosLosProcesos().subscribe(resp => {
      this._preloaderService.cargando = false;
      this.familiaDeProcesos = resp.familiaDeProcesos;
      this.procesosEspeciales = resp.procesosEspeciales;
      this.procesosNormales = resp.procesosNormales;
    });

    this._departamentosService
      .cargarDepartamentos()
      .subscribe((departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      });

    this._gastoService.cargarTodosLosGastos().subscribe((gastos: Gasto[]) => {
      this.gastos = gastos;
    });

    this._maquinaService
      .obtenerTodasLasMaquinas()
      .subscribe((maquinas: Maquina[]) => {
        this.maquinas = maquinas;
      });
  }

  ngOnInit() {}

  guardarModificacionesAEstaFamilia(familia: FamiliaDeProcesos) {
    this._preloaderService.cargando = true;
    if (familia.procesos.length === 0) {
      swal(
        'Familia de procesos vacia. ',
        'La familia de procesos debe contener por lo menos un proceso.',
        'error'
      );
      this._preloaderService.cargando = false;
      return;
    }

    if (familia._id) {
      this._procesoService
        .modificarFamiliaDeProcesos(familia)
        .subscribe((resp: any) => {
          this.limpiar(familia);
          this._preloaderService.cargando = false;
        });
    } else {
      this._procesoService
        .guardarNuevaFamiliaDeProcesos(familia)
        .subscribe((resp: FamiliaDeProcesos) => {
          familia._id = resp._id;
          this.limpiar();
          this._preloaderService.cargando = false;
        });
    }
  }

  guardarModificacionesAEsteProceso(proceso: Proceso) {
    this._preloaderService.cargando = true;
    if (proceso.pasos.length === 0) {
      swal(
        'Proceso vacio.',
        'El proceso debe contener por lo menos un paso.',
        'error'
      );
      this._preloaderService.cargando = false;
      return;
    }

    if (proceso.nombre === '' || proceso.nombre === null) {
      swal(
        'Proceso sin nombre.',
        'Debes definir el nombre del proceso',
        'error'
      );
      this._preloaderService.cargando = false;
      return;
    }

    if (!proceso._id) {
      this._procesoService
        .guardarNuevoProceso(proceso)
        .subscribe((resp: any) => {
          this.limpiarProceso(proceso);
          this._preloaderService.cargando = false;
        });
    } else {
      this._procesoService
        .modificarProceso(proceso)
        .subscribe((resp: Proceso) => {
          proceso._id = resp._id;
          this.limpiarProceso();
          this._preloaderService.cargando = false;
        });
    }
  }

  eliminarFamilia(i: number) {
    // Si no tiene id solo lo eliminamos del array.
    const familia = this.familiaDeProcesos[i];
    if (!familia._id) {
      this.familiaDeProcesos.splice(i, 1);
      swal(
        'Se eliminó la familia.',
        'La familia que aun no se grabada se elimino. ',
        'success'
      );
    } else {
      swal({
        title: `Vas a eliminar la familia ${familia.nombre}.`,
        text:
          '¿Estas segúro que lo quieres eliminar? Esta acción no se puede deshacer.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, hazlo!'
      }).then(result => {
        if (result.value) {
          swal(
            '¡UPS!!',
            'Actualmente no puedes borrar una familia de procesos.',
            'warning'
          );
        } else {
          swal('¡Cancelado!', 'Se cancelo la operación.', 'warning');
        }
      });
    }
  }

  eliminarProcesoNormal(i: number) {
    this.eliminarProcesoEntero(i, this.procesosNormales);
  }
  eliminarProcesoEspecial(i: number) {
    this.eliminarProcesoEntero(i, this.procesosEspeciales);
  }

  eliminarProcesoEntero(i: number, procesos) {
    const proceso = procesos[i];
    if (!proceso._id) {
      procesos.splice(i, 1);
      swal(
        'Se eliminó el proceso.',
        'El proceso que aun no se grababa se eliminó. ',
        'success'
      );
    } else {
      swal({
        title: `Vas a eliminar el proceso ${proceso.nombre}.`,
        text:
          '¿Estas segúro que lo quieres eliminar? Esta acción no se puede deshacer.',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Si, hazlo!'
      }).then(result => {
        if (result.value) {
          swal('¡UPS!!', 'Actualmente no puedes borrar proceso.', 'warning');
        } else {
          swal('¡Cancelado!', 'Se cancelo la operación.', 'warning');
        }
      });
    }
  }

  familiaContieneProceso(proceso: Proceso): boolean {
    // Si la familia modificandose contiene el proceso entonces
    // retorna false.

    if (!this.familiaEditandose.procesos) {
      return;
    }

    for (let i = 0; i < this.familiaEditandose.procesos.length; i++) {
      const p = this.familiaEditandose.procesos[i].proceso;
      if (p._id === proceso._id) {
        return true;
      }
    }
    return false;
  }

  limpiar(familia?: FamiliaDeProcesos) {
    if (!familia) {
      this.familiaEditandose.editado = false;
      this.familiaEditandose = null;
    } else {
      familia.editado = false;
      this.familiaEditandose = null;
    }
  }

  limpiarProceso(proceso?: Proceso) {
    if (!proceso) {
      this.procesoEditandose.editado = false;
      this.procesoEditandose = null;
    } else {
      proceso.editado = false;
      this.procesoEditandose = null;
    }
  }

  nuevaFamilia() {
    this.familiaEditandose = new FamiliaDeProcesos();
    this.familiaEditandose.nombre = 'Nueva familia de procesos';
    this.familiaEditandose.editado = true;
    this.familiaDeProcesos.push(this.familiaEditandose);
  }

  nuevoProceso(esp: boolean = false) {
    this.procesoEditandose = new Proceso();
    this.procesoEditandose.departamento = this.departamentos[0];
    this.procesoEditandose.editado = true;
    this.procesoEditandose.especial = esp;
    this.procesoEditandose.nombre = esp
      ? 'Nuevo proceso especial'
      : 'Nuevo proceso';
    this.procesoEditandose.observaciones = 'Observaciones del nuevo proceso.';
    this.procesoEditandose.pasos = [
      new Paso(1, 'Paso numero uno a realizar', true, true)
    ];
    this.procesoEditandose.ver = true;
    if (esp) {
      this.procesosEspeciales.push(this.procesoEditandose);
    } else {
      this.procesosNormales.push(this.procesoEditandose);
    }
  }

  agregarProceso(proceso: Proceso) {
    console.log(proceso);
    
    this.reordenarProceso(this.familiaEditandose);
    
    console.log(proceso);
    const proc = new Procesos();
    proc.proceso = proceso;
    proc.orden = this.familiaEditandose.procesos.length + 1;
    console.log(proc);
    
    this.familiaEditandose.procesos.push(proc);
    
    console.log(this.familiaEditandose);
    
  }

  eliminarProceso(i: number) {
    this.familiaEditandose.procesos.splice(i, 1);
    this.reordenarProceso(this.familiaEditandose);
  }

  reordenarProceso(familia: FamiliaDeProcesos) {
    // Reordenamos los procesos.
    for (let i: number = 0; i < familia.procesos.length; i++) {
      const pro = familia.procesos[i];
      pro.orden = i + 1;
    }
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

  agregarPaso(proceso: Proceso) {
    this.reordenarPasos(proceso);
    const p: Paso = new Paso();
    p.descripcion = 'Pon aquí la descripción del paso.';
    p.orden = proceso.pasos.length + 1;
    p.editando = true;
    proceso.pasos.push(p);
  }

  eliminarPaso(i: number) {
    this.procesoEditandose.pasos.splice(i, 1);
    this.reordenarPasos(this.procesoEditandose);
  }

  reordenarPasos(proceso: Proceso): any {
    for (let i = 0; i < proceso.pasos.length; i++) {
      const paso = proceso.pasos[i];
      paso.orden = i + 1;
    }
  }

  editando(): boolean {
    // Si se esta editando algún elemento devuelve false
    return (
      this.familiaEditandose !== null ||
      this.procesoEditandose !== null ||
      this.maquinaEditandose !== null ||
      this.gastoEditandose !== null
    );
  }

  compareFn(a, b) {
    // MEGA IMPORTANTE FUNCIÓN PARA QUE LOS SELECST COINCIDAN
    return a && b && a.num === b.num;
  }

  nuevaMaquina() {
    this.maquinaEditandose = new Maquina();
    this.maquinaEditandose.nombre = 'Maquina nueva ';
    this.maquinaEditandose.editado = true;
    this.maquinas.push(this.maquinaEditandose);
  }

  guardarModificacionesAEstaMaquina(maquina: Maquina) {
    this._preloaderService.cargando = true;

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
          this._preloaderService.cargando = false;
        });
    } else {
      this._maquinaService
        .modificarMaquina(maquina)
        .subscribe((resp: Maquina) => {
          this.limpiarMaquina(maquina);
          this._preloaderService.cargando = false;
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

  eliminarMaquina(i: number) {
    // Si no tiene id solo lo eliminamos del array.
    this.maquinas.splice(i, 1);
    this._manejoDeMensajesService.eliminado('Se elimino la máquina.');
  }

  agregarGasto(gasto: Gasto) {
    this.maquinaEditandose.gastos.push(this.crearGastoConsumo(gasto));
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

  nuevoGasto() {
    this.gastoEditandose = new Gasto();
    this.gastoEditandose.costoPorHora = 1;
    this.gastoEditandose.gastoDirecto = false;
    this.gastoEditandose.nombre = 'Nuevo Gasto ';
    this.gastoEditandose.unidadPorHora = 'unid/h ';
    this.gastoEditandose.editandose = true;
    this.gastos.push(this.gastoEditandose);
  }

  guardarModificacionesAGasto(gasto: Gasto) {
    this._preloaderService.cargando = true;

    if (!gasto._id) {
      this._gastoService
        .guardarUnGasto(gasto)
        .subscribe((gastoGuardado: Gasto) => {
          gasto._id = gastoGuardado._id;
          this.limpiarGasto(gasto);
          this._preloaderService.cargando = false;
        });
    } else {
      this._gastoService
        .modificarUnGasto(gasto)
        .subscribe((gastoGuardado: Gasto) => {
          this.limpiarGasto(gasto);
          this._preloaderService.cargando = false;
        });
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
  eliminarGasto(i: number) {
    this.gastos.splice(i);
    this._manejoDeMensajesService.eliminado('Se elimino el gasto');
  }

  calcular(maquina: Maquina): number {
    return this._calculoDeCostosSerivice.maquinaMinuto(maquina);
  }
}