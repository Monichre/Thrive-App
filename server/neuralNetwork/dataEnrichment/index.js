const express = require('express')
const bodyParser = require('bodyParser')
const app = express()


app.set('port', (process.env.PORT || 3001))
app.use(bodyParser.json())
app.use(urlencoded({extended: true}))

app.listen(app.get('port'), () => {
    console.log('server running on ' + app.get('port'))
})