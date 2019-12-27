import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  // Estas comillas vacias, las últimas que se refieren
  // al hospital hacen mach con el value que definimos por
  // defecto que dice "seleccine hospital"
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRouter.params.subscribe( params => {
      // El parametro se llama así por que en las pages.routes definimos el
      // parametro con ese nombre (medico/:id   )
      const id = params['id'];

      // Solo ejecutamos esta función si es un id nuevo.
      if ( id !== 'nuevo') {
        this.cargarMedico( id);
      }
    });
   }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion.subscribe( resp => {
        this.medico.img = resp.medico.img;
    });
  }

  cargarMedico ( id: string) {

    this._medicoService.cargarMedico( id).subscribe(
      medico => {
        this.medico = medico;
        // Aqui sobreescribimos el id de un objeto a solo el ._id.Así el select
        // carga el hospital que se va a modificar.
        this.medico.hospital = medico.hospital._id;
        // Esta función se activa cuando se cambia el hospital
        // dentro del select. Aquí la invocamos cuando cargamos
        // un id que ya existe.
        this.cambioHospital ( this.medico.hospital);
      });
  }

  guardarMedico ( f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._medicoService.guardarMedico(this.medico)
        .subscribe( medico => {
          this.medico._id = medico._id;
          this.router.navigate(['/medico/', medico._id]);

        });

  }

  cambioHospital (id: string ) {
    this._hospitalService.obtenerHospital( id ).subscribe(
      hospital => this.hospital = hospital
    );

  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id);
  }


}
