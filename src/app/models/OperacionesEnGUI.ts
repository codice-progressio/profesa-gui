export class OperacionesEnGUI {
    public cb_Modificar?: any;
    public cb_Guardar?: any;
    public editado: boolean = false;
    public convertido: boolean = false;

    constructor() {
    }
    
    modificar( ) {
        if ( this.cb_Modificar !== null ) {
            this.cb_Modificar(this);
        } else {
            throw new Error('No definiste el callback de modificar');
        }
    }
    
    guardar( ) {
        if ( this.cb_Guardar !== null ) {
            this.cb_Guardar(this);
        } else {
            throw new Error('No definiste el callback de guardar');
        }
    }


}
