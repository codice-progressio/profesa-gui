export class ColoresTenidos {
    constructor(
        public color?: string, 
        public cantidad?: number,
        public observaciones?: string,
        public terminado: boolean = false,
        public fechaTerminado?: Date,
        // Para gui
        public valido: boolean = true) {
    }
}
