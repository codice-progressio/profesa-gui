import { Component, OnInit } from '@angular/core';
import { FolioService } from '../../services/folio/folio.service';
import { Folio } from '../../models/folio.models';
import {  ActivatedRoute, Router } from '@angular/router';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';
import { Orden } from '../../models/orden.models';
import { FolioLinea } from '../../models/folioLinea.models';
import swal from 'sweetalert2';
import { ManejoDeMensajesService } from 'src/app/services/utilidades/manejo-de-mensajes.service';

@Component({
  selector: 'app-revision-de-ordenes',
  templateUrl: './revision-de-ordenes.component.html',
  styles: [`
  input {
    
     text-align: center;
     
  }

  `]
})
export class RevisionDeOrdenesComponent implements OnInit {

  folio: Folio = new Folio( );
  ordenRespaldo: Orden = new Orden();
  sePuedenGenerarOrdenes: boolean = true;

  constructor(
    public _folioService: FolioService,
    public activatedRoute: ActivatedRoute,
    public _preLoaderService: PreLoaderService,
    public router: Router,
    public _msjService: ManejoDeMensajesService
    
  ) { 

    activatedRoute.params.subscribe(params => {
      const idFolio = params['idFolio'];
      this._folioService.cargarFolio(idFolio).subscribe( folio => {
        this.folio = folio;
        
        this.folio.folioLineas.forEach(linea => {
          if ( linea.modeloCompleto.medias ) {
            
            this.generarOrdenes(linea, 0.5);
            
          } else {
            this.generarOrdenes(linea);
          }
        });
      

      });
    });


  }

  ngOnInit() {
  }

  generarOrdenes(linea: FolioLinea, unidad: number = 1, ) {
    
    linea.ordenes = [];
      
    if( linea.almacen ){
      const orden = new Orden();
        orden.numeroDeOrden = 1;
        orden.observaciones = '';
        orden.piezasTeoricas = linea.cantidad
        orden.unidad = 1;
        orden.nivelDeUrgencia = linea.nivelDeUrgencia;
        linea.ordenes.push(orden);

    }else{
      if ( !linea.modeloCompleto.tamano.estandar ) {
        // No se ha definido el estandar y no se pueden generar las órdenes. 
        this.sePuedenGenerarOrdenes = false;
  
        this._msjService.invalido( 
          `No se ha definido el estandar del tamaño ${linea.modeloCompleto.tamano.tamano} `,
          `Imposible generar órdenes para el folio ${this.folio.numeroDeFolio}.`, 7000)
        this.router.navigate(['/folios']);
        return;
      }
      
      // Obtenemos la cantidad de órdenes contra la cantidad del estandar. 
      
      const estandar: number = linea.modeloCompleto.tamano.estandar;
      const cantidad: number = linea.cantidad;
      
  
      let cantidadDeOrdenes: number = 0;
      let decimal: number = 0;
      cantidadDeOrdenes = (cantidad / estandar) ;
      
      // OBTENEMOS EL DECIMAL PARA TRATARLO LUEGO
      decimal = cantidadDeOrdenes % 1;
      // QUITAMOS LOS DECIMALES DE LA CANTIDAD DE ORDENES. 
      cantidadDeOrdenes = Math.trunc(cantidadDeOrdenes);
      linea.modeloCompleto.mediasGeneradas = false;
      if ( unidad === 0.5 ) {
        // SI LA UNIDAD SON MEDIAS ORDENES ENTONCES MULTIPLICAMOS POR DOS. 
        cantidadDeOrdenes = cantidadDeOrdenes * 2;
        linea.modeloCompleto.mediasGeneradas = true;
      } 
      
      
      let ix: number = 1;
      // Ajustamos el contador a 1
      for (let i: number = 0 ; i < cantidadDeOrdenes; i++) {
        // Creamos una nueva órden por cada iteracion.
        const orden = new Orden();
        orden.numeroDeOrden = ix;
        orden.observaciones = '';
        orden.piezasTeoricas = linea.modeloCompleto.tamano.estandar * unidad;
        orden.unidad = unidad;
        orden.nivelDeUrgencia = linea.nivelDeUrgencia;
        linea.ordenes.push(orden);
        ix++;
      }
      if (decimal > 0) {
        const orden = new Orden();
        orden.numeroDeOrden = ix++;
        orden.observaciones = '';
        orden.piezasTeoricas = Math.round(linea.modeloCompleto.tamano.estandar * decimal);
        orden.unidad = +decimal.toFixed(4);
        orden.nivelDeUrgencia = linea.nivelDeUrgencia;
        linea.ordenes.push(orden);
      }
    }
      


  }
  
  recalcularUnidad( unidad: number, orden: Orden, linea: FolioLinea  ) {
    // Revisamos que la unidad no puede ser mayor que uno. 
    orden.unidad = unidad;
    orden.piezasTeoricas = Math.round(orden.unidad * linea.modeloCompleto.tamano.estandar);
  }

    recalcularPiezas( piezas: number, orden: Orden, linea: FolioLinea    ) {
    // No se puede superar úna órden. 
    orden.piezasTeoricas = piezas;
    orden.unidad = +(piezas / linea.modeloCompleto.tamano.estandar).toFixed(4);

  }

  respaldo ( original: Orden, copia: Orden ) {
    copia.piezasTeoricas = original.piezasTeoricas;
    copia.unidad = original.unidad;
    copia.observaciones = original.observaciones;
  }

  editarOrden( orden: Orden ) {
    
    if ( !orden.editando ) {
      // Guardamos una copia de la órden por si cancela.
      this.respaldo(orden, this.ordenRespaldo);
      orden.editando = true;
    } else {
      let valido = true;
      let msj = '';
      // La unidad no puede ser menor que 0.0001.
      if ( orden.unidad < .0001 ) {
        msj = 'La unidad no puede ser menor que 0.0001';
        valido = false;
        orden.editando = false;
        this.msjErrorOrdenes(msj, orden);
        return;
      }

      if ( orden.unidad > 1 ) {
        msj = 'La unidad no puede ser mayor que 1';
        valido = false;
        orden.editando = false;
        this.msjErrorOrdenes(msj, orden);
        return;
      }
      
      // La orden no puede ser 0
      if ( orden.piezasTeoricas < 1 ) {
        msj = 'La cantidad de piezas de la órden no puede ser 0';
        valido = false;
        orden.editando = false;
        this.msjErrorOrdenes(msj, orden);
        return;
      }

      if (valido) {
        orden.editando = false;
      }
    
    }
  }
 
  msjErrorOrdenes( msj: string, orden: Orden ) {
    swal({
      title: 'Hay errores en la órden',
      text: msj,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Editar órden',
      cancelButtonText: 'Revertir',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        orden.editando = true;
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.respaldo( this.ordenRespaldo, orden);
        swal(
          '¡Órden restaurada!',
          'No se aplicarón tus cambios.',
          'success'
        );
        orden.editando = false;
      }
    });
  }

  transformarEnMedias(linea: FolioLinea ) {
    const unidad = linea.modeloCompleto.mediasGeneradas ? 1 : 0.5; 
    swal({
      title: '¿Estas segúro que quieres transformar las órdenes?',
      text: 'Perderas las modificaciones manuales que hayas echo',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, hazlo!',
      cancelButtonText: '¡No, asi dejalo!'
    }).then((result) => {
      if (result.value) {
       this.generarOrdenes(linea, unidad);
      }
    });
  }

  guardarOrdenes() {
    
    let cont = 0;
    this.folio.folioLineas.forEach(linea => {
      linea.ordenes.forEach(orden => {
        if ( orden.editando ) {
          
          cont++;
        }
      });
    });
    
    if ( cont !== 0) {
      
      const ord = cont > 1 ? `las ${cont} órdenes` : `la órden` ;
      swal('Hay  órdenes editandose.', `Acepta o descarta los cambios de ${ord} que estas modificando para poder continuar`, 'warning');
      return;

    }



    swal({
      title: '¿Estas segúro?',
      text: 'Una vez generadas las órdenes no se puede volver atras.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, genera las órdenes.',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._folioService.guardarOrdenes( this.folio )
        .subscribe(() => {
          this.router.navigate(['/folios']);
        } );
        
      }
    });
  }

  
}
