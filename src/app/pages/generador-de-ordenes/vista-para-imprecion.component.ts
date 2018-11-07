import { Component, OnInit } from '@angular/core';
import { Folio } from '../../models/folio.models';
import { FolioService } from '../../services/folio/folio.service';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';
import {  ActivatedRoute } from '@angular/router';
import { Orden } from '../../models/orden.models';


@Component({
  selector: 'app-vista-para-imprecion',
  templateUrl: './vista-para-imprecion.component.html',
  styleUrls: ['./vista-para-imprecion.component.css']
})
export class VistaParaImprecionComponent implements OnInit {

  folio: Folio = new Folio();
  constructor(
    public _folioService: FolioService,
    public _preLoaderService: PreLoaderService,
    public activatedRoute: ActivatedRoute,

  ) {
  }
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
    const id = params['idFolio'];
    
    if (id) {
      this._preLoaderService.cargando = true;
      this._folioService.cargarFolio(id).subscribe((folio: any) => {
        this.folio = folio;
        this._preLoaderService.cargando = false;
      });
    }
  });
  }



}
