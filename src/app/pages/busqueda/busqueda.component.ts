import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {


  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  termino: string = '' ;

  navegacion = {
    usuarios: URL_SERVICIOS + '',
  };

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient,
    public router: Router

  ) {

    activatedRoute.params.subscribe( params => {
      const termino = params['termino'];
      this.termino = termino;
      this.buscar( termino );

    });
  }

  ngOnInit() {
  }

  buscar ( termino: string ) {
    const url = URL_SERVICIOS + `/busqueda/todo/${termino}`;
    this.http.get(url).subscribe(
      (busqueda: any) => {
          this.usuarios = busqueda.usuarios;
          this.medicos = busqueda.medicos;
          this.hospitales = busqueda.hospitales;
      }
    );
  }

  // public editar ( id: string, tipo: string ) {
    

  //   this.router.navigate()
  // }


  
  
  

}
