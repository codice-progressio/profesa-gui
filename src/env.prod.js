;(function (window) {
  const URL_DOMINIO = '127.0.0.1:3000'
  const URL_SERVICIOS = `https://${URL_DOMINIO}`

  window.__env = window.__env || {}
  window.__env.enableDebug = true
  window.__env.URL_DOMINIO = URL_DOMINIO
  window.__env.URL_SERVICIOS = URL_SERVICIOS

})(this)
