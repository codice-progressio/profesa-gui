//Install express server
const express = require('express')
const path = require('path')

const app = express()
app.disable('x-powered-by')

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'))

app.use('/.well-known/assetlinks.json', (req, res) => {
  res.send(require('./assetlinks.json'))
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080
console.log(PORT)
app.listen(PORT)
