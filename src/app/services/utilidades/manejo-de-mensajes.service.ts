import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import { mensaje } from '../../../../../pruebas/src/app/basicas/string/string';
import { stringify } from 'querystring';
import { truncate } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class ManejoDeMensajesService {

  
  datos: any;

  constructor() { }

  err( err: any, callback: any = null ) {
    
    const datosSwal: any  = {
      type: 'error',
      title: '¡Algo salio mal!',
    };


    if ( err.error.data ) {
      datosSwal.text = err.error.data.mensaje;
      
      if ( err.error.data.errorGeneral ) {
        if ( err.error.data.errorGeneral.errors ) {
          datosSwal.footer = this.recorrerErrores(err.error.data.errorGeneral.errors);
        } else {

          datosSwal.footer =  
          '<span class="text-center"> <strong>Esta es más información acerca del problema. </strong> <br />' 
          + JSON.stringify(err.error.data.errorGeneral) + '</span>';
        }
      }
    }
    
    swal(datosSwal).then( () => {
      this.cb( callback );
    });
  }

  private recorrerErrores ( errors: any ): string {
    let footer =  
          // tslint:disable-next-line:max-line-length
          '<span > <h4 class="text-muted animated tada text-center">Esta es más información acerca del problema. </h4>';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const objetoError = errors[key];
        footer += `<hr /><span class="text-rigth"><strong class="text-primary" >${key}: </strong>${objetoError.message}`; 
        if ( !!objetoError.properties.value  ) {
          footer += `<br /> El valor erroneo es: <span class="text-danger">${objetoError.properties.value} </span></span> `; 
        }
        footer += '</br>';
        
      }
    }

    return footer;

  }

  ok_( datos: any, callback: any = null ) {
    if ( datos.mensaje ) {
      swal({
        type: 'success',
        text: datos.mensaje,
        title: '¡Muy bien!',
        timer: 2500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
       
      }).then( () => {
        this.cb( callback );
      });
    } else {
      this.cb( callback );
    }

  }

  cb( callback ) {
    if ( callback ) {
      callback();
    }
  }

  eliminado ( msj: string ) {
    this.correcto( msj, 'Eliminado');
  }
  
  // Cuando algúna acción se hizo correctamente como guardar o modificar.
  correcto (  msj: string, titulo: string = 'Acción realizada', timer: number = 3000) {
    
      const d: any = {
        position: 'top-end',
        type: 'success',
        title: titulo,
        text: msj,
        showConfirmButton: false,
        timer: timer, 
        toast: true,
        animation: false,
        customClass: 'animated tada  '
      };
      swal(d);
  }

  // Una validación que fallo. 
  invalido( msj: string, titulo: string = 'Datos erroneos', timer: number = 5000) {
    const d: any = {
      position: 'center',
      type: 'error',
      title: titulo,
      text: msj,
      showConfirmButton: true,
      timer: timer, 
      animation: false,
      customClass: 'animated tada '
    };
    swal(d);
  } 
  
  
  
  confirmacionDeEliminacion( msj: string , callback: any) {
    
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });
    
    swalWithBootstrapButtons({
      title: '¿Estas segúro que quieres eliminar?',
      text: msj,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, hazlo!',
      cancelButtonText: '¡No, no lo hagas!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        callback( );

      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons(
          'Cancelado',
          'No se elimino nada.',
          'error'
        );
      }
    });
  
  }




}



