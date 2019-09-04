export interface Deserializable {
    deserialize(input: this): this;
  }