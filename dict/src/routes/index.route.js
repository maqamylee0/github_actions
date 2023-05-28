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
var express = require('express');
var router = express.Router();
const sql2 = require('mssql');
require('dotenv').config();
const config2 = {
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
/* GET home page. */
router.get('/', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var poolConnection = yield sql2.connect(config2);
        yield poolConnection.request().query(`SELECT TOP 20 pc.Name as CategoryName,
    p.name as ProductName 
    FROM [SalesLT].[ProductCategory] pc
    JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`)
            .then(result => res.render('home', { resultSet: result }))
            .catch(err => res.render('error'));
        poolConnection.close();
    });
});
module.exports = router;
