//Install express server
const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'))

app.all('/env.js', (req, res) => {
  console.log('env sobre escrito')

  let buffer = fs.readFileSync('./dist/env.js', 'utf-8').split('\n')

  //Obtener variables escritas
  const plantilla = 'window.__env.'

  let variables = buffer
    .filter(x => x.includes(plantilla))
    .map(x => x.split('.')[2])
    .map(x => x.split('=')[0].trim())

  // Obtener variales de ambiente

  let nuevoBuffer = ';(function (window) { \n'
  nuevoBuffer += 'window.__env = window.__env || {}\n'
  variables.forEach(x => {
    if (process.env[x]) nuevoBuffer += `${plantilla}${x}=${process.env[x]} \n`
  })

  nuevoBuffer += '})(this)'

  res.setHeader('content-type', 'text/javascript')
  res.write(nuevoBuffer)
  res.end()
})

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname + '/dist/index.html'))
)

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 5000
console.log(PORT)
app.listen(PORT)
