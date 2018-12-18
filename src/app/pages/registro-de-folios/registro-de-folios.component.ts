import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.models';
import { Folio } from '../../models/folio.models';
import { ClienteService, UsuarioService, FolioService, UtilidadesService, ManejoDeMensajesService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BuscadorRapidoService } from '../../components/buscador-rapido/buscador-rapido.service';
import { PreLoaderService } from '../../components/pre-loader/pre-loader.service';
import { PaginadorService } from '../../components/paginador/paginador.service';
import { BuscadorRapido } from 'src/app/components/buscador-rapido/buscador-rapido';


@Component({
  selector: 'app-registro-de-folios',
  templateUrl: './registro-de-folios.component.html',
  styles: []
})
export class RegistroDeFoliosComponent implements OnInit {

  selectorDeUsuarios: string = '';
  // clientesBuscados: Cliente[] = [] ;
  folio: Folio = null;

  
  // clienteSeleccionado: string;
  termino: string = '';
  vendedores: Usuario [] = [];
  folios: Folio[] = [];
  // desde: number = 0;
  // clienteParaGuardar: Cliente;

  modificando: boolean = false;
  vendedorSeleccionado: string = '-';

  sePuedeRegistrarFolio: boolean = true;

  constructor(
    public _clienteService: ClienteService,
    public _usuarioService: UsuarioService,
    public _folioService: FolioService,
    public router: Router,
    public _buscadorRapidoService: BuscadorRapidoService,
    public _util: UtilidadesService,
    public _paginadorService: PaginadorService,
    public _msjService: ManejoDeMensajesService,
    public _preLoaderService: PreLoaderService
  ) {
    this._buscadorRapidoService.nombreDeElemento = 'cliente';
    // this._buscadorRapidoService.reiniciar();
    
  
    // this._buscadorRapidoService.callback = () => {
    //  this.folio.cliente = this._buscadorRapidoService.elementoSeleccionado.objeto;
    //  this.termino = '';

    // };
       
    this.cargarFolios();
    this._buscadorRapidoService.limpiarTodo();
    this._buscadorRapidoService.nombreDeElemento = 'cliente';
    this._buscadorRapidoService.promesa =()=>{
      return new Promise( (resolve, reject )=>{
        this._clienteService.buscar( this._buscadorRapidoService.termino ).subscribe(
          (resp:Cliente[])=>{
            const datosBuscados: BuscadorRapido[] = [];
            resp.forEach((cliente:Cliente) => {
              const a: BuscadorRapido =  new BuscadorRapido();
              a.nombre = `${cliente.nombre} | ${cliente.sae}`;
              a.objeto = cliente;
              datosBuscados.push(a);

            });
            resolve( datosBuscados )
        });
      });
    }
  }




  ngOnInit() {
    
    
    this._usuarioService.cargarVendedores().subscribe(
        resp => { 
        
          this.vendedores = resp; 
          if ( this.vendedores.length === 0 ) {
            this._msjService.invalido('Es necesario que registres vendedores para poder seguir.', 'No hay vendedores');
            this.sePuedeRegistrarFolio = false;
          }
        }
    );
    
    this._paginadorService.callback = (desde, limite ) => {
      this.cargarFolios(desde, limite);
    };
    
 
    // this._buscadorRapidoService.reiniciar();  

  }

  nuevoFolio( ) {
    this.folio = new Folio();
  }

  seleccionarVendedor( id: string ) {
    // Filtramos los vendedores
    const vendedor: Usuario = this.vendedores.find( v => {
      return v._id === id;
    });

    if ( vendedor ) {
      this.folio.vendedor = vendedor;
      this.vendedorSeleccionado = vendedor._id;
    }
  }

  cargarFolios(desde: number  = 0, limite: number = 5) {
    this._folioService.cargarFoliosSinOrdenes( desde, limite ).subscribe(resp => {
      this.folios = resp;
      this._paginadorService.activarPaginador(this._folioService.totalFolios );
    });
  }


   
  

  
  guardar() {
    // Validamos que haya un cliente seleccionado.

    this.folio.cliente =<Cliente> this._buscadorRapidoService.elementoSeleccionado.objeto;
    console.log(` El cliente ${JSON.stringify(this._buscadorRapidoService.elementoSeleccionado.objeto)}`);

    if ( !this.folio.cliente   ) {
      swal('No has seleccionado un cliente', 'Es necesario que busques y selecciones un cliente.', 'error');
      return;
    }
    
    if ( !this.folio.vendedor ) {
      swal('No has seleccionado un vendedor', 'Es necesario que selecciones un vendedor.', 'error');
      return;
    }
    // Convertimos las fechas a tipo Date por que el pipe las
    // convierte en string.
    this.folio.fechaFolio = new Date(this.folio.fechaFolio);
    this.folio.fechaEntrega = new Date(this.folio.fechaEntrega);

    // Validamos las fechas. 
    if ( this.folio.fechaEntrega.getTime() <= this.folio.fechaFolio.getTime() ) {
      swal('Error en las fechas.', 'La fecha de creación del folio no puede ser igual '
      + 'o posterior a la fecha de entrega.', 'error');
      return;
    }
    
    const  fechaMinima = new Date();
    fechaMinima.setDate(fechaMinima.getDate() - 5);
    
    if ( this.folio.fechaFolio.getTime() <= fechaMinima.getTime()  ) {
      swal('Error en la fecha.', `La fecha de creación del folio no puede ser anterior a 4 días de la fecha de hoy.`, 'error');
      return;
    }

    this._folioService.guardarFolio( this.folio ).subscribe(
      (resp: any) => {
        if (resp) {
          // Si hay una respuesta es por que el folio que se 
          // creo es nuevo y hay que ir a la sección de agregar pedidos.
          this.router.navigate(['/folio', resp._id ]);
        } else {
          // Si no hay respuesta se modifico el folio.
          // regresamos todo los decoradores a su original. 
          this.modificando = false;
          
        }
      }
    );

  }

  eliminarFolio ( folio: Folio) {
    swal({
      title: '¿Quieres eliminar este folio?',
      text: 'Esta acción no se puede deshacer.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, no lo elimines.',
      confirmButtonText: '¡Si, elimínalo!'
    }).then((result) => {
      if (result.value) {
        
        this._folioService.eliminarFolio( folio._id ).subscribe( ()  => {
          // Removemos para no tener que recargar.
          // folio.eliminar = true;
          // this._util.delay(700).then(() => {
          //   this.folios = this.folios.filter( f => {
          //     if (folio._id !== f._id) {
          //       return true;
          //     }
            // });
          // });
          this.cargarFolios();
          

        });
      }
    });
  }

  
  modificar ( folio: Folio) {
    this.modificando = true;
    this.folio = folio;
    const cliente: string = this.folio.cliente.nombre + ' | ' + this.folio.cliente.sae;
    this._buscadorRapidoService.seleccionarElemento(new BuscadorRapido(cliente, this.folio.cliente));
    this.vendedorSeleccionado = this.folio.vendedor._id;
    
  }

  cancelarModificacion() {
    this.termino ='';
    this.modificando = false;
    this.folio = null;
    this._buscadorRapidoService.limpiarTodo();
    this.vendedorSeleccionado = '-';
  }

}
