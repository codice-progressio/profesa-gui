import { ArticuloPedido, Pedido } from 'src/app/models/pedido.model'
import { Contacto } from 'src/app/models/contacto.model'

export const PedidosMock: Partial<Pedido>[] = new Array(100)
  .fill({} as Partial<Pedido>)
  .map(() => {
    let p: Partial<Pedido> = {
      _id: 999,
      eliminado: undefined,
      contacto: {
        nombre: 'El nombre',
        razonSocial: 'La razon social'
      } as Contacto,
      usuario: undefined,
      articulos: [{} as ArticuloPedido],
      observaciones: 'Esta es una observación',
      // acciones:undefined,
      createdAt: undefined,
      upadtedAt: undefined,

      //UI
      total: 9999,
      iva: 16,
      importe: 9999,
      folio: 'FOLIOBLABLA', //Usuario +  fecha + hora
      ubicacion: {
        latitud: undefined,
        longitud: undefined
      },

      
      

    }
    return p
  })
