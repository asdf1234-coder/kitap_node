const mysql = require("mysql2")
let data = []
const express = require("express")
const app = express();
const path = require("path")
app.set("view engine","ejs");
app.use('/img', express.static(path.join(__dirname, 'img')));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'kitap_php'
});
connection.query('SELECT * FROM kitaplar', (error, results, fields) => {
    app.use("/kitap/:id", function(req, res){
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
