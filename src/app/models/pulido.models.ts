import swal from "sweetalert2";
import { Deserializable } from "./deserealizable.model";
export class Pulido implements Deserializable {
  constructor(
    public peso10Botones?: number,
    public pesoTotalBoton?: number,
    public cantidad?: number,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  deserialize(input: this): this {
    Object.assign(this, input);
    return this;
  }
}
