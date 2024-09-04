const mysql = require("mysql2")
let data = []
const express = require("express")
const app = express();
app.set("view engine","ejs");
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kitap_php'
});
connection.query('SELECT * FROM kitaplar', (error, results, fields) => {
    /*app.use("/hayvan/:isim", function(req, res){
        res.send(req.params.isim);
    })*/
    app.use("/kitap/:id", function(req, res){
        //const urun = data.find(u => )
        const x = req.params.id
        res.render("kitap_detay",{
            url: x,
            kitaplar: results
        })
    })
    app.use("/anasayfa", function(req, res){
        res.render("anasayfa",{
            kitaplar: results
        });
    })
    
    app.listen(3001, () => {
        console.log("dinleniyor")
    })
});
connection.end();
