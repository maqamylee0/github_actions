"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const sql = require('mssql');
require('dotenv').config();
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: 1433,
    database: 'sqltest',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
};
/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-vm'
        },
        options: {
            encrypt: true
        }
    }

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        port: process.env["db_port"],
        database: process.env["db_database"],
        authentication: {
            type: 'azure-active-directory-msi-app-service'
        },
        options: {
            encrypt: true
        }
    }
*/
function connectAndQuery() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Starting...");
        try {
            var poolConnection = yield sql.connect(config);
            console.log("Reading rows from the Table...");
            var resultSet = yield poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
            p.name as ProductName 
            FROM [SalesLT].[ProductCategory] pc
            JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);
            // console.log(`${resultSet.recordset.length} rows returned.`);
            // output column headers
            var columns = "";
            for (var column in resultSet.recordset.columns) {
                columns += column + ", ";
            }
            // console.log("%s\t", columns.substring(0, columns.length - 2));
            // ouput row contents from default record set
            // resultSet.recordset.forEach(row => {
            //     console.log("%s\t%s", row.CategoryName, row.ProductName);
            // });
            // close connection only when we're certain application is finished
            poolConnection.close();
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
module.exports.connectAndQuery = connectAndQuery;
