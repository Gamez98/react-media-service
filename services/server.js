const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')

const port = process.env.PORT || 3030;

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

const auth = require('./routes/auth/auth.route')
const user = require('./routes/user/user.route')
const movie = require('./routes/movie/movie.route')

app.use('/v2/api/auth', auth)
app.use('/v2/api/user', user)
app.use('/v2/api/movie', movie)

app.route('*')
    .get((req, res) => {
        res.send('works')
    })

app.listen(port, () => {
    console.log('server running at http://localhost:'.concat(port))
})