import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert2';
import { HospitalService } from 'src/app/services/hospital/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  cargando: boolean = false;

  hospitales: Hospital[];

  desde: number = 0;

  termino: string = '';

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    // Desde aquí cargamos el modal para
  //  muestre las imágenes que cambiamos. Es una subscripción
  //  el emmiter que actua cuando las variables del servicio
  //  ModalUploadService son modificadas.
    this._modalUploadService.notificacion.subscribe(
      resp => { this.cargarHospitales(); }
    );
  }

  cargarHospitales ( ) {
    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde ).subscribe(
      (hospitales) => {
        this.hospitales = hospitales;
        this.cargando = false;
      }
    );
  }

  buscarHospital (termino: string) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return true;
    }
    // console.log( 'este es el termino: ' + termino);
    this.termino = termino;
    this.cargando = true;
    this._hospitalService.buscarHospital( this.termino )
      .subscribe(  (hospitales: Hospital []) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  mostrarModal ( id: string) {
    this._modalUploadService.mostrarModal( 'hospitales', id);
  }

  guardarHospital (hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
      .subscribe();
  }

  borrarHospital (hospital: Hospital ) {
    swal({
      title: '¿Estas segúro?',
      text: `Esta a punto de borrar a ${hospital.nombre}.` ,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, eliminalo!'
    }).then((borrar) => {
      if (borrar.value) {

        this._hospitalService.borrarHospital( hospital._id )
              .subscribe( borrado => {
                // console.log(borrado);
                this.cargarHospitales();
              });
      }
    });
  }

  cambiarDesde( valor: number) {
    const desde = this.desde + valor;
    // console.log(desde);
    if ( desde >= this._hospitalService.totalHospitales) {
      return;
    }


    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  async crearHospital () {

   const {value: nombre} = await swal({
      title: 'Ingresa el nombre del hospital',
      input: 'text',
      inputValue: '',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && '¡Es necesario que introduzcas un valor!';
      }
    });

    this._hospitalService.crearHospital( nombre).subscribe( resp => {
      if (nombre) {
          swal({
            // position: 'center',
            type: 'success',
            title: 'Hospital creado',
            html: nombre,
            showConfirmButton: false,
            timer: 2000
          });
          this.cargarHospitales();
        }
      }

    );
  }



}
