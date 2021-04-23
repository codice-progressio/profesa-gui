// // CONFIGURACIONES PARA BD DE PRUEBA
// export const URL_SERVICIOS = 'https://127.0.0.1:3000'
// export const URL_DOMINIO = '127.0.0.1:3000'
// export const URL_BASE = path => `${URL_SERVICIOS}/${path}`
export const URL_DOMINIO = 'imperium-sic-api.herokuapp.com'
export const URL_SERVICIOS = 'https://'.concat(URL_DOMINIO)
export const URL_BASE = path => `${URL_SERVICIOS}/${path}`
