export class Paginacion {
    constructor(
        public limite: number = 5,
        public desde: number = 0,
        public orden: 'asc'|'des' = 'des',
        public campoDeOrdenamiento: string
    ){}



}