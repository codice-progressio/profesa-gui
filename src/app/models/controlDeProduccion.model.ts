export class ControlDeProduccion {
    constructor(
        public guardar: boolean = true,
        public trabajando: boolean = false,
        public createdAt?: Date,
        public updatedAt?: Date,
        
        public entregadoAProduccion?: Date
    ) {
        
    }
}