const mysql = require ('mysql');

const db = mysql.createConnection({   host: "localhost",   user: "babacar",   password: "azerty" });

db.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });

db.query("CREATE DATABASE Examtest", function (err, result) {       if (err) throw err; console.log("Base de données créée !");     });