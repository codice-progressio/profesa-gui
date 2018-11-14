import { BasicosGUI } from '../basicosGUI.model';
  export class Dia implements BasicosGUI {
    editado: boolean;
    constructor(
      public esSabado: boolean = false, 
      public dia?: Date,
      public checadas: String[] = [],
      // GUI
      public visible?: boolean
      ) {
        
      }
      
    
  }
