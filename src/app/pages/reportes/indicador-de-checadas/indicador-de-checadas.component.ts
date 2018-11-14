import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleados/empleado.model';
import { Dia } from 'src/app/models/empleados/dia.model';

@Component({
  selector: 'app-indicador-de-checadas',
  templateUrl: './indicador-de-checadas.component.html',
  styles: []
})


export class IndicadorDeChecadasComponent implements OnInit {

  datosDeFichero;
  datosConvertiros;
  objectKeys = Object.keys;

  constructor() { }

  empleados: Empleado[] = [];

  random = Math.random;

  ngOnInit() {
  }

  fileUpload(event) {
    const reader = new FileReader();
    reader.readAsText(event.srcElement.files[0]);
    const me = this;
    reader.onload = function () {
      me.convertirCSV( 6, reader );
      
      me.datosDeFichero = reader.result;

    };
  }

  convertirCSV( columnas: number, reader ) {
    const csv = reader.result;
    const allTextLines = csv.split(/\r|\n|\r/);
    const headers = allTextLines[0].split(',');
    this.datosConvertiros = allTextLines;
    this.datosConvertiros.splice(0, 1);
    // Convertirmos acada linea.
    this.datosConvertiros.forEach(lin => {
        
      const linea = lin.split(',');
        
        
        // Buscamos si ya lo tenemos registrado.
        const empleado =  this.empleados.filter((e: Empleado) => e.id === linea[0]);
        let empModi = empleado[0];
        if ( !empModi ) {
          const e = new Empleado();
          e.id = linea[0];
          e.nombre = linea[1];
          this.empleados.push( e );
          empModi = e;
        } 
        
        // Separamos el día. 
       
        const dia = linea[2] == null ? '' : linea[2].split(' ')[0] ;
        if ( empModi.dias.hasOwnProperty(dia) ) {
            const diaAgregado = empModi.dias[dia];
            diaAgregado.checadas.push( linea[2] == null ? '' : linea[2].split(' ')[1] );
        } else {
          if ( !!dia ) {
            const day = new Dia();

            const d =  dia.split('/')[0] ;
            const m =  dia.split('/')[1] - 1;
            const a =  dia.split('/')[2];
            console.log(`${d}-${m}-${a}- => ${dia}`);
            day.dia = new Date();
            day.dia.setDate(d);
            day.dia.setFullYear( a),
            day.dia.setMonth(m);

            day.checadas.push( linea[2] == null ? '' : linea[2].split(' ')[1]);
            day.esSabado = day.dia.getDay() === 6;
            day.visible = false;
            empModi.dias[dia] = day;

          }
        }

         
      //   // Buscamos si el día esta registrado. 
      //   const diaRegistrado = empModi.dias.filter( (d: Dia) =>  d.dia === dia );
      //   let diaTrabajo: Dia;
    
      //   if ( !diaRegistrado[0] ) {
      //     diaTrabajo = new Dia();
      //     diaTrabajo.dia = dia;
      //   } else {
      //     diaTrabajo = diaRegistrado[0];
      //   }
      //   diaTrabajo.checadas.push( new Date(linea[2] == null ? '' : linea[2].split(' ')[1]));
      //   empModi.dias.push(diaTrabajo);
        
      // });

  }

}


