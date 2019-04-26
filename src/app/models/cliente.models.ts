import { Laser } from './laser.models';
import { ModeloCompletoAutorizacion } from './modeloCompletoAutorizacion.model';
import { Deserializable } from './deserealizable.model';

export class Cliente implements Deserializable{
    constructor(
        public nombre?: string,
        public sae?: string,
        public _id?: string,
        public laserados?: Laser [],
        public modelosCompletosAutorizados: ModeloCompletoAutorizacion [] =[]
        
        ) {}
        
        deserialize(input: Cliente): this {
            Object.assign( this, input)

            this.laserados = input.laserados.map( (laser)=>{
                return new Laser().deserialize( laser)
            } )

            return this
        }
    }
