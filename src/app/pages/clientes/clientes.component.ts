import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Cliente } from 'src/app/models/cliente.models';
import { ValidacionesService, ModeloCompletoService } from 'src/app/services/service.index';
import { ClienteService } from '../../services/cliente/cliente.service';
import { ModeloCompleto } from 'src/app/models/modeloCompleto.modelo';
import { ModelosComponent } from '../modelos/modelos.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {

  clientesForm: FormGroup;
  clienteEditando: Cliente;
  clientes: Cliente[] 
  



  constructor(
    private _validacionesService: ValidacionesService,
    private _fb: FormBuilder,
    private _clienteService:ClienteService,
    private _modeloService: ModeloCompletoService
  ) {

   this.cargarClientes();


   }

  ngOnInit() {
     this.iniciarFormulario();
  }

  iniciarFormulario(){
    // Iniciamos el formulario.
    this.clientesForm = this._fb.group({
      sae: ['', 
      [
        Validators.required,
      ]
    ],
    nombre: ['', [
      Validators.required,
    ]],
    laserados: this._fb.array([
      // Este lo quitamos por que no
      // queremos que por defecto aparezca 
      // un espacio para laser. 
      // this.getLaserado()
   ])
    });
  }

  cargarClientes( ){
    this._clienteService.obtenerTodos().subscribe(
      resp => {
        this.clientes = resp;
    });
  }

  public get _sae ( ){
    return this.clientesForm.get('sae');
  }

  public get _nombre( ) {
    return this.clientesForm.get('nombre');
  }

  public _paso(a: any ){
     return a;
       }

  getLaserado( ) {
    return this._fb.group({
      laser:['', Validators.required],
    });
  }

  

  agregarLaserado(){
    const control = <FormArray>this.clientesForm.controls['laserados'];
    control.push(this.getLaserado());
  };

  public removerLaserado( i: number) {
    const control = <FormArray> this.clientesForm.controls['laserados'];
    control.removeAt(i);
  }

  onSubmit(model: any, isValid: boolean, e: any) {
    e.preventDefault();
  
    const cliente:Cliente = <Cliente>model;
    cliente._id = this.clienteEditando._id;
    if ( this.clienteEditando._id ) {
      this._clienteService.modificar(cliente).subscribe(resp=> {
        this.limpiar();
      });

    }else {
      this._clienteService.guardaNuevo(cliente).subscribe(resp=> {
        this.limpiar();
      });

    }

  }

  limpiar() {
    this.iniciarFormulario();
    this.clientesForm.reset();
    this.clienteEditando = null;
    this.cargarClientes();
  }

  editarCliente( cliente: Cliente) {
    this.clienteEditando = cliente;
    this.clientesForm.reset();


    // Cargamos los datos en el formulario.
    this._sae.setValue(cliente.sae);
    this._nombre.setValue(cliente.nombre);

    const laserados = <FormArray> this.clientesForm.controls['laserados'];
    cliente.laserados.forEach(marca => {
      const nm = this.getLaserado();
      nm.setValue({laser:marca.laser});
      laserados.push(nm);

    });

  }

  nuevoCliente( ){
    this.clienteEditando = new Cliente();
  }

  autorizarModeloCompleto( autorizar: boolean, idAut: string, c: Cliente ) {
    
    if(autorizar ){
      const a = c.modelosCompletosAutorizados.find(x=>{ return x._id === idAut});
      a.autorizado = true;
    }else{
      c.modelosCompletosAutorizados = c.modelosCompletosAutorizados.filter(x => x._id!== idAut);
    }

    this._clienteService.modificar(c).subscribe(resp=>{
      this.cargarClientes();
    });
   
  }

  




}
