const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const shrinkRay = require('shrink-ray')


const app = express()


app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Cache-Control', 'no-cache')
    next()
})
app.use(shrinkRay({
        brotli: {
            quality: 11 
        }
    }))
app.use(express.static(path.resolve(__dirname, '../app/build')));
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
})


app.listen(app.get('port'), function() {
    console.log('server running on: ' + app.get('port'))
})


