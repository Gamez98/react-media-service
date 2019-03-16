const mysql = require('mysql')
const cnfg = require('./config')

exports.connection = mysql.createConnection(cnfg.database)