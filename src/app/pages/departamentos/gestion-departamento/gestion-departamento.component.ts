import { Component, OnInit } from '@angular/core';
import { Departamento } from 'src/app/models/departamento.models';
import { DepartamentoService } from 'src/app/services/departamento/departamento.service';
import { Paginacion } from 'src/app/utils/paginacion.util'

@Component({
  selector: 'app-gestion-departamento',
  templateUrl: './gestion-departamento.component.html',
  styles: []
})
export class GestionDepartamentoComponent implements OnInit {
  
  departamentos: Departamento[];
  depto: Departamento = new Departamento();

  constructor(
    private _departamentoService: DepartamentoService
  ) { 
    this._departamentoService.findAll(new Paginacion(100,0,1,'nombre')).subscribe( 
      (departamentos: Departamento[]) => {
        this.departamentos = departamentos;
      }
    );
  }



  ngOnInit() {
  }

  onSubmit() {
    this._departamentoService.save( this.depto )
    .subscribe( (departamento: Departamento) => {
      this.departamentos.push( departamento);
      this.limpiar();
    });
  }

  limpiar( ) {
    this.depto = new Departamento();
  }

}
