import { Component, OnInit, ViewChild } from "@angular/core";
import { CrearModificar_GUI_CRUD } from "../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD";
import { Folio } from "src/app/models/folio.models";
import {
  FolioNewService,
  ValidacionesService,
  ClienteService,
  ModeloCompletoService,
  UsuarioService
} from "src/app/services/service.index";
import {
  FormBuilder,
  Validators,
  FormArray,
  FormGroup,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { Cliente } from "src/app/models/cliente.models";
import { Usuario } from "src/app/models/usuario.model";
import { ModeloCompleto } from "src/app/models/modeloCompleto.modelo";
import { Laser } from "src/app/models/laser.models";
import { forEach } from "@angular/router/src/utils/collection";
import { FoliosCrearModificarAbstractoComponent } from "./abstractos/folios-crear-modificar-abstracto.component";

@Component({
  selector: "app-folios-crear-modificar",
  templateUrl: "./folios-crear-modificar.component.html",
  styles: []
})
export class FoliosCrearModificarComponent
  extends CrearModificar_GUI_CRUD<Folio, FolioNewService>
  implements OnInit {
  componente: FoliosCrearModificarAbstractoComponent;

  folio: Folio;

  constructor(
    public _elementoService: FolioNewService,
    public formBuilder: FormBuilder,
    public _validacionesService: ValidacionesService,
    public _clienteService: ClienteService,
    public _modelosCompletosService: ModeloCompletoService,
    public _usuarioService: UsuarioService
  ) {
    super(_elementoService, formBuilder, _validacionesService);

    this.cbDatosParaEditar = (folio: Folio) => {
      new Promise((resolve, reject) => {
        let int = setInterval(() => {
          if (this.componente) {
            clearInterval(int);
            resolve();
          }
        }, 10);
      })
        .then(() => {
          this.componente.cargarDatosParaEditar(folio);
        })
        .catch(err => {
          throw err;
        });
    };
  }

  ngOnInit() {}

  /**
   *Solo aplica la aninmacion cuando el evento se emite. 
   *
   * @memberof FoliosCrearModificarComponent
   */
  cancelarElFolio() {
    this.cbAnimar();
  }

  /**
   *Carga los elementos cuando se emite un evento desde el componente abstracto. 
   *
   * @memberof FoliosCrearModificarComponent
   */
  recargarElementos() {
    this.cbCargarElementos();
  }

  /**
   *Setea el componente para poder trabajar con el y 
   cargar los datos para modificacion. 
   *
   * @param {FoliosCrearModificarAbstractoComponent} c
   * @memberof FoliosCrearModificarComponent
   */
  cargarComponente(c: FoliosCrearModificarAbstractoComponent) {
    this.componente = c;
  }
}
