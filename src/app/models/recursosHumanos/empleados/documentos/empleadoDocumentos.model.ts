import { Deserializable } from "../../../deserealizable.model"
export class EmpleadoDocumentos implements Deserializable {
  constructor(
    public actaDeNacimento?: string, // img
    public comprobanteDeDomicilio?: string, //img
    public ine?: string, // img
    public constanciaDeAntecedentesNoPenales?: string, // img
    public licenciaDeManejo?: string, // img
    public cartasDeRecomendacion?: string[], // IMG
    public comprabantesDeEstudios?: string[] // IMG
  ) {}
  deserialize(input: this): this {
    Object.assign(this, input)

    return this
  }
}
