// require('dotenv').config()
// const sql2 = require('mssql');

// const config2 = {
//     user: process.env.DB_USER, // better stored in an app setting such as process.env.DB_USER
//     password: process.env.DB_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
//     server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
//     port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
//     database: 'sqltest', // better stored in an app setting such as process.env.DB_NAME
//     authentication: {
//         type: 'default'
//     },
//     options: {
//         encrypt: true
//     }
// }

// async function getRecords(){
//     var poolConnection = await sql2.connect(config2);

//     var resultSet = await poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
//     p.name as ProductName 
//     FROM [SalesLT].[ProductCategory] pc
//     JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);
//     // resultSet.recordset.forEach(row => {
//     //     console.log("%s\t%s", row.CategoryName, row.ProductName);
//     // });
//     poolConnection.close();
//     // await console.log(resultSet.recordset[0]);
//     return   resultSet;

// }

// module.exports.getRecords = getRecords;