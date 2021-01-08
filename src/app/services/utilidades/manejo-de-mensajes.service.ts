import { Injectable } from '@angular/core'
import swal from 'sweetalert2'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { ToastrService } from 'ngx-toastr'
interface errorEstructurado {
  type?: string
  title?: string
  text?: string
  footer?: string
}

@Injectable({
  providedIn: 'root'
})
export class ManejoDeMensajesService {
  datos: any
  swalWithBootstrapButtons = swal.mixin({
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger',
    buttonsStyling: false
  })

  constructor(
    public _preLoaderService: PreLoaderService,
    public toast: ToastrService
  ) {}

  err(err: any, callback: any = null) {
    swal(this.gestionarError(err) as any).then(() => {
      this.cb(callback)
    })
  }

  private gestionarError(err): errorEstructurado {
    const datosSwal: errorEstructurado = {
      type: 'error',
      title: '¡Algo salio mal!'
    }
    if (!err.error && err.status !== 403) {
      // Si el error viene del GUI no tiene la propiedad
      // error y no muestra el mensaje. Si pasa esto
      // lo capturamos aqui
      throw err
    }

    datosSwal.text = err.error

    if (err.error.data) {
      datosSwal.text = err.error.data.mensaje

      if (err.error.data.errorGeneral) {
        if (err.error.data.errorGeneral.errors) {
          datosSwal.footer = this.recorrerErrores(
            err.error.data.errorGeneral.errors
          )
        } else {
          datosSwal.footer =
            '<span class="text-center"> <strong>Esta es más información acerca del problema. </strong> <br />' +
            JSON.stringify(err.error.data.errorGeneral) +
            '</span>'
        }
      }
    }

    this._preLoaderService.err()

    return datosSwal
  }

  private recorrerErrores(errors: any): string {
    let footer =
      // tslint:disable-next-line:max-line-length
      '<span > <h4 class="text-muted animated tada text-center">Esta es más información acerca del problema. </h4>'
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        const objetoError = errors[key]
        footer += `<hr /><span class="text-rigth"><strong class="text-primary" >${key}: </strong>${objetoError.message}`

        if (objetoError.properties) {
          if (!!objetoError.properties.value) {
            footer += `<br /> El valor erroneo es: <span class="text-danger">${objetoError.properties.value} </span></span> `
          }
        }

        footer += '</br>'
      }
    }

    return footer
  }

  ok_(datos: any, callback: any = null, idPreLoader?: number) {
    this._preLoaderService.ok(idPreLoader)
    if (datos.mensaje) {
      swal({
        type: 'success',
        text: datos.mensaje,
        title: '¡Muy bien!',
        timer: 3500,
        showConfirmButton: false,
        position: 'top-end',
        toast: true,
        animation: false,
        customClass: 'animated slideInRight  faster '
      }).then(() => {
        this.cb(callback)
      })
    } else {
      this.cb(callback)
    }
  }

  cb(callback) {
    if (callback) {
      callback()
    }
  }

  eliminado(msj: string) {
    this.correcto(msj, 'Eliminado')
  }

  /**
   * Confirmacion en forma de toast.
   * Cuando algúna acción se hizo correctamente como guardar o modificar.
   *
   * @param {string} msj
   * @param {string} [titulo='Acción realizada']
   * @param {number} [timer=3000]
   * @memberof ManejoDeMensajesService
   */
  correcto(
    msj: string,
    titulo: string = 'Acción realizada',
    timer: number = 3000
  ) {
    const d: any = {
      position: 'top-end',
      type: 'success',
      title: titulo,
      text: msj,
      showConfirmButton: false,
      timer: timer,
      toast: true,
      animation: false,
      customClass: 'animated bounceIn  '
    }
    swal(d)
  }

  /**
   * Confirmacion en forma de toast.
   * Cuando algúna acción se hizo de manera instantanea y de tipo info.
   *
   * @param {string} msj
   * @param {string} [titulo='Acción realizada']
   * @param {number} [timer=3000]
   * @memberof ManejoDeMensajesService
   */
  informar(msj: string, titulo: string = 'INFO: ', timer: number = 7000) {
    const d: any = {
      position: 'top-end',
      type: 'info',
      title: titulo,
      text: msj,
      showConfirmButton: false,
      timer: timer,
      toast: true,
      animation: false,
      customClass: 'animated slideInRight  faster'
    }
    swal(d)
  }

  /**
   *Muestra un mensaje para una validacion fallida.
   *
   * @param {string} msj El mensaje que se quiere mostrar.
   * @param {string} [titulo='Datos erroneos'] El titulo del cuadro.
   * @param {number} [timer=5000] El tiempo que se mostrara el mensaje.
   * @memberof ManejoDeMensajesService
   */
  invalido(
    msj: string,
    titulo: string = 'Datos erroneos',
    timer: number = 5000
  ) {
    const d: any = {
      position: 'center',
      type: 'error',
      title: titulo,
      html: msj,
      showConfirmButton: true,
      timer: timer,
      animation: false,
      customClass: 'animated tada '
    }
    swal(d)
  }

  /**
   * Pide confirmacion antes de realizar una accion. Si la
   * accion se confirma entonces se ejecuta el callback.
   *
   * @param {string} msj El mensaje que se mostrara para pedir confirmacion.
   * @param {*} callbackSuccess El callback cuando la accion sea correcta.
   * @param {string} [msjCancelacion=''] El mensaje que se mostrara cuando se cancele.
   * @param {*} [callbackCancel=null] El callback a ejecutar cuando se cancele. Null no ejecuta el callback.
   * @memberof ManejoDeMensajesService
   */
  confirmarAccion(
    msj: string,
    callbackSuccess: any,
    msjCancelacion: string = '',
    callbackCancel: any = null
  ) {
    this.swalWithBootstrapButtons({
      title: '¿Estas segúro de lo que haces?',
      text: msj,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, hazlo!',
      cancelButtonText: '¡No, no lo hagas!',
      cancelButtonClass: 'mr-3 btn btn-danger',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        callbackSuccess()
      } else if (result.dismiss === swal.DismissReason.cancel) {
        this.swalWithBootstrapButtons(
          'Cancelado',
          'No se ejecuto la acción.' + msjCancelacion,
          'error'
        )
        if (callbackCancel) callbackCancel()
      }
    })
  }

  /**
   * Muestra un mensaje de confirmacion de eliminacion. 'Estas seguro que quieres eliminar?'
   *
   * @param {string} msj El mensaje que quieres mostrar.
   * @param {*} callback La accion que se va a ejecutar despues de confirmar con 'Si, hazlo!'.
   * @memberof ManejoDeMensajesService
   */
  confirmacionDeEliminacion(msj: string, callback: any) {
    this.swalWithBootstrapButtons({
      title: '¿Estas segúro que quieres eliminar?',
      text: msj,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Si, hazlo!',
      cancelButtonText: '¡No, no lo hagas!',
      confirmButtonClass: ' ml-3 btn btn-success ',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        callback()
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.swalWithBootstrapButtons(
          'Cancelado',
          'No se elimino nada.',
          'error'
        )
      }
    })
  }

  solicitarPermiso(msj: string, callback: any) {
    this.swalWithBootstrapButtons({
      title: 'Es necesario autorizacion.',
      text: msj,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Solicitar autorizacion',
      cancelButtonText: 'Cancelar',
      cancelButtonClass: 'btn btn-danger mr-3',
      reverseButtons: true
    }).then(result => {
      if (result.value) {
        callback()
      } else if (result.dismiss === swal.DismissReason.cancel) {
        this.swalWithBootstrapButtons(
          'Cancelado',
          'No se solicito permiso..',
          'info'
        )
      }
    })
  }

  ups(msj: string, titulo: string = 'ups', timer: number = 10000): any {
    const d: any = {
      position: 'center',
      type: 'warning',
      title: titulo,
      text: msj,
      showConfirmButton: false,
      timer: timer,
      animation: true
    }
    swal(d)
  }

  toastError(err) {
    const error = this.gestionarError(err)

    this.toast.error(
      error.text ? error.text.concat(' ').concat(error.footer) : error.text,
      error.title
    )
    throw error
  }

  toastErrorMensaje(msj: string) {
    this.toast.error(msj, 'Error')
  }

  toastCorrecto(
    msj: string,
    titulo: string = 'Acción realizada',
    timer: number = 3000
  ): void {
    this.toast.success(msj, titulo, { timeOut: timer })
  }
}
