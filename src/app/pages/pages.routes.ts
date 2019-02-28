import { RouterModule, Routes } from '@angular/router';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { VerificaTokenGuard, PermisosGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { RegistroDeFoliosComponent } from './registro-de-folios/registro-de-folios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { RegistroDeLineasComponent } from './registro-de-folios/registro-de-lineas.component';
import { RevisionDeOrdenesComponent } from './generador-de-ordenes/revision-de-ordenes.component';
import { SeguimientoDeFoliosComponent } from './seguimiento-de-folios/seguimiento-de-folios.component';
import { MaterialesComponent } from './departamentos/materiales/materiales.component';
import { TransformacionComponent } from './departamentos/transformacion/transformacion.component';
import { PulidoComponent } from './departamentos/pulido/pulido.component';
import { SeleccionComponent } from './departamentos/seleccion/seleccion.component';
import { ModelosComponent } from './modelos/modelos.component';
import { VistaParaImprecionComponent } from './generador-de-ordenes/vista-para-imprecion.component';
import { PastillaComponent } from './departamentos/pastilla/pastilla.component';
import { EmpaqueComponent } from './departamentos/empaque/empaque.component';
import { GestionDepartamentoComponent } from './departamentos/gestion-departamento/gestion-departamento.component';
import { ProcesoComponent } from './gestionDeProcesos/proceso/proceso.component';
import { ProcesosEnModeloComponent } from './gestionDeProcesos/procesos-en-modelo/procesos-en-modelo.component';
import { IndicadorDeChecadasComponent } from './reportes/indicador-de-checadas/indicador-de-checadas.component';
import { _ROLES } from '../config/roles.const';
import { ClientesComponent } from './clientes/clientes.component';
import { ControlDeProduccionComponent } from './departamentos/control-de-produccion/control-de-produccion.component';
import { ProductoTerminadoComponent } from './departamentos/producto-terminado/producto-terminado.component';
import { HistorialDeFoliosComponent } from './reportes/historial-de-folios/historial-de-folios.component';
import { MetalizadoComponent } from './departamentos/metalizado/metalizado.component';
import { BarnizadoComponent } from './departamentos/barnizado/barnizado.component';
import { BuratoComponent } from './departamentos/burato/burato.component';
import { LaserComponent } from './departamentos/laser/laser.component';
import { AlmacenDeBotonComponent } from './departamentos/almacen-de-boton/almacen-de-boton.component';
import { ProcesosComponent } from './gestionDeProcesos/procesos/procesos.component';
import { ProcesosDetalleComponent } from './gestionDeProcesos/procesos/procesos-detalle.component';
import { MaquinasComponent } from './gestionDeProcesos/maquinas/maquinas.component';
import { MaquinasDetalleComponent } from './gestionDeProcesos/maquinas/maquinas-detalle.component';
import { FamiliaDeProcesosComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos.component';
import { FamiliaDeProcesosDetalleComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos-detalle.component';
import { TamanosComponent } from './gestionDeProcesos/tamanos/tamanos.component';
import { ColoresComponent } from './gestionDeProcesos/colores/colores.component';
import { TerminadosComponent } from './gestionDeProcesos/terminados/terminados.component';
import { ModelosCompletosComponent } from './gestionDeProcesos/modelos-completos/modelos-completos.component';

const pagesRoutes: Routes = [
// Redirecciona a PagesComponent para separar el login
    // de la estructura principal.
    // {
    //     // Esta es la ruta padre y tiene hijos. Esto permite la separación
    //     // entre el login y el dashboard para los templates.
    //     path: '',
    //     component: PagesComponent,
    //     canActivate: [LoginGuardGuard],
    //     children: [
            // Sección de estudio.
        {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [ VerificaTokenGuard],
            data: {titulo: 'Dashboard'}
        },

        {
            path: 'busqueda/:termino', 
            component: BusquedaComponent, 
            canActivate: [PermisosGuard],
            data: {
                titulo: 'Buscador', 
                roles: [
                    _ROLES.ADMIN_ROLE,
                ]
            }
        },

        // Mantenimientos
        {
            path: 'usuarios',
            component: UsuariosComponent,
            canActivate: [PermisosGuard],
            data: {
                titulo: 'Mantenimientos de usuarios',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
            
        {
            path: 'departamentos',
            component: GestionDepartamentoComponent,
            canActivate: [PermisosGuard],
            data: {
                titulo: 'Mantenimientos de departamentos',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'clientes',
            component: ClientesComponent,
            canActivate: [PermisosGuard],
            data: {
                titulo: 'Mantenimientos de clientes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },

        {path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario.'}},

        // Esta sección es para el trabajo
        {
            path: 'folios', 
            component: RegistroDeFoliosComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de Folios',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'folios/historial', 
            component: HistorialDeFoliosComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Historial de folios',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'folio/:id', 
            component: RegistroDeLineasComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registrar pedidos',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'ordenes/:idFolio', 
            component: RevisionDeOrdenesComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Revisión de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]}
            },
        {
            path: 'ordenes/imprecion/:idFolio', 
            component: VistaParaImprecionComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Impreción de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }

        },
        
        {
            path: 'produccion', 
            component: SeguimientoDeFoliosComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Seguimiento de folios',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        
        {
            path: 'produccion/controlDeProduccion', 
            component: ControlDeProduccionComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/almacenDeBoton', 
            component: AlmacenDeBotonComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Almacen de boton',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/materiales', 
            component: MaterialesComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/pastilla', 
            component: PastillaComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/transformacion', 
            component: TransformacionComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/laser', 
            component: LaserComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/pulido', 
            component: PulidoComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/seleccion', 
            component: SeleccionComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/empaque', component: EmpaqueComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/metalizado', component: MetalizadoComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/barnizado', component: BarnizadoComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/burato', component: BuratoComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'produccion/productoTerminado', component: ProductoTerminadoComponent,
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Registro de órdenes',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        

        // {    
        //     path: 'modelos', 
        //     component: ModelosComponent,
        //     canActivate: [PermisosGuard], 
        //     data: {
        //         titulo: 'Registro y administración de modelos',
        //         roles : [ 
        //             _ROLES.ADMIN_ROLE
        //         ]
        //     }
        // },
        // Gestión de procesos



// <!-- 
// =====================================
//  NUEVA SECCION DE PROCESOS
// =====================================
// -->
        {
            path: 'procesos', 
            component: ProcesosComponent, 
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Gestión de procesos',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },

        {
            path: 'maquinas', 
            component: MaquinasComponent, 
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Gestión de Maquinas',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },

        {
           path: 'modelos', 
           component: ModelosComponent, 
           canActivate: [PermisosGuard], 
           data: {
               titulo: 'Gestion de Modelos',
               roles : [ 
                   _ROLES.ADMIN_ROLE
               ]
           }
        },

        {
           path: 'tamanos', 
           component: TamanosComponent, 
           canActivate: [PermisosGuard], 
           data: {
               titulo: 'Gestion de Tamanos',
               roles : [ 
                   _ROLES.ADMIN_ROLE
               ]
           }
        },

        {
           path: 'colores', 
           component: ColoresComponent, 
           canActivate: [PermisosGuard], 
           data: {
               titulo: 'Gestion de colores',
               roles : [ 
                   _ROLES.ADMIN_ROLE
               ]
           }
        },

        {
           path: 'terminados', 
           component: TerminadosComponent, 
           canActivate: [PermisosGuard], 
           data: {
               titulo: 'Gestion de terminados',
               roles : [ 
                   _ROLES.ADMIN_ROLE
               ]
           }
        },

        {
           path: 'modelosCompletos', 
           component: ModelosCompletosComponent, 
           canActivate: [PermisosGuard], 
           data: {
               titulo: 'Gestion de Modelos Completos',
               roles : [ 
                   _ROLES.ADMIN_ROLE
               ]
           }
        },


// <!-- 
// =====================================
//  END NUEVA SECCION DE PROCESOS
// =====================================
// -->

    

        {
            path: 'familiaDeProcesos', 
            component: FamiliaDeProcesosComponent, 
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Gestión de Familias de Procesos',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'familiaDeProcesos/detalle/:id', 
            component: FamiliaDeProcesosDetalleComponent, 
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Detalle de Familia de Procesos',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },






        {
            path: 'procesos_old', 
            component: ProcesoComponent, 
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Gestión de procesos',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        {
            path: 'procesos/modelos', 
            component: ProcesosEnModeloComponent, 
            canActivate: [PermisosGuard], 
            data: {
                titulo: 'Gestión de procesos de modelo',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        // reportes
        {
            path: 'reportes/indicadorChecadas', 
            component: IndicadorDeChecadasComponent,
            canActivate: [PermisosGuard],
            
            data: {
                titulo: 'Indicador de checas personal ( Beta )',
                roles : [ 
                    _ROLES.ADMIN_ROLE
                ]
            }
        },
        // Redirige al dashboard cuando no se ha puesto nada en la url.
        {
            path: '', 
            redirectTo: '/dashboard', 
            pathMatch: 'full'
        },
        
        {
            path: 'medicos', 
            component: MedicosComponent, 
            canActivate: [PermisosGuard],
            data: {
                titulo: 'Medicos',
                roles: [
                    // _ROLES.SUPER_ADMIN,
                    _ROLES.EMPAQUE_REGISTRO_ROLE,
                    _ROLES.SELECCION_REGISTRO_ROLE,
                ]
            }
        },
        
        
        {
            path: 'hospitales', 
            component: HospitalesComponent, 
            canActivate: [PermisosGuard],
            data: {
                titulo: 'hOSPITALES DESDE ROUTES',
                roles: [
                    _ROLES.SUPER_ADMIN,
                ]
            }
            },
        {
            path: 'progress', 
            component: ProgressComponent, 
            canActivate: [PermisosGuard],
        
            data: {
                titulo: 'Progress', 
                roles: [
                    _ROLES.SUPER_ADMIN,
                ]
            }
            },
            
        {
            path: 'graficas1', 
            component: Graficas1Component, 
            canActivate: [PermisosGuard],
        
            data: {
                titulo: 'Graficas', 
                roles: [
                    _ROLES.SUPER_ADMIN,
                ]
            },
            },
            
        {
            path: 'promesas', 
            component: PromesasComponent, 
            canActivate: [PermisosGuard],
        
            data: {
                titulo: 'Promesas', 
                roles: [
                    _ROLES.SUPER_ADMIN,
                ]
            }
            },
            
        {
            path: 'account-settings', 
            component: AccountsSettingsComponent, 
            canActivate: [PermisosGuard],
        
            data: {
                titulo: 'Informaciónde la cuenta', 
                roles: [
                    _ROLES.SUPER_ADMIN,
                ]
            }
            },
            
        {
            path: 'rxjs', 
            component: RxjsComponent, 
            canActivate: [PermisosGuard],
        
            data: {
                titulo: 'RxJs', roles: [
                    _ROLES.SUPER_ADMIN,
                ]
            }
            },
];




export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
