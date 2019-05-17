import { Component, OnInit } from "@angular/core";
import { CrearModificar_GUI_CRUD } from "../../utilidadesPages/utilidades-tipo-crud-para-GUI/CrearModificar_GUI_CRUD";
import { Folio } from "src/app/models/folio.models";
import {
  FormBuilder} from "@angular/forms";
import { FoliosCrearModificarAbstractoComponent } from "./abstractos/folios-crear-modificar-abstracto.component";
import { FolioNewService } from "src/app/services/folio/folio-new.service";
import { ValidacionesService } from "src/app/services/utilidades/validaciones.service";
import { ClienteService } from "src/app/services/cliente/cliente.service";
import { ModeloCompletoService } from "src/app/services/modelo/modelo-completo.service";
import { UsuarioService } from "src/app/services/usuario/usuario.service";

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
      new Promise((resolve) => {
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
