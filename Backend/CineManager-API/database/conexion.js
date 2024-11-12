const mysql = require("mysql");

var mysqlConexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "cinemanagerdb",
    multipleStatements: true,

});

mysqlConexion.connect(
(err)=>{
    if(!err){
        console.log("Se ha conectado la base de datos Mysql");
    }
    else{
        console.log("ERROR, no se ha conectado");
    }
    
}
);

module.exports=mysqlConexion;
