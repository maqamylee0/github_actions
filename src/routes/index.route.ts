var express = require('express');
var router = express.Router();
const sql2 = require('mssql');
require('dotenv').config()

const config2 = {
    user: process.env.DB_USER, // better stored in an app setting such as process.env.DB_USER
    password: process.env.DB_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
    server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
    port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
    database: 'sqltest', // better stored in an app setting such as process.env.DB_NAME
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}
/* GET home page. */
router.get('/',  async function(req, res, next) {
  var poolConnection = await sql2.connect(config2);

 await poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
    p.name as ProductName 
    FROM [SalesLT].[ProductCategory] pc
    JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`)
    .then(result =>  res.render('home', { resultSet:   result}))
    .catch(err => res.render('error'));
    poolConnection.close();

});

module.exports = router;
