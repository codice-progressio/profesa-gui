export class BuscadorRapido {
    constructor(
        public nombre?: string,
        public objeto?: any,
        public atenuar: boolean = false,
        public mensajeAtenuacion?: string,
        public claseAtenuacion: string ='text-muted'
    ) {}
}