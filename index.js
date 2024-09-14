// const mysql = require("mysql2")
const mongoose = require('mongoose')
let data = []
const express = require("express")
const http = require('http')
const net = require('net');
const app = express();
const path = require("path")
app.set("view engine","ejs");
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/public', express.static(path.join(__dirname, 'public')));
require('dotenv').config();

// Bağlantı URI'nız
const dbUri = process.env.DB_URI;
/*const connection = mysql.createConnection({
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
connection.end();*/
function findAvailablePort(startPort, callback) {
  const server = net.createServer();
  
  server.listen(startPort, () => {
    server.once('close', () => callback(startPort));
    server.close();
  });
  
  server.on('error', () => {
    findAvailablePort(startPort + 1, callback);
  });
}
const initialPort = parseInt(3000);
mongoose.connect(dbUri, {
})
.then(() => {
  console.log('MongoDB bağlantısı başarılı!');
  
  const KullaniciSchema = new mongoose.Schema({
    id: Number,
    isim: String,
    resim: String,
    yayinevi: String,
    tur: String,
    yazar: String,
    ucret: Number
  });

  const kitaps = mongoose.model('Kullanici', KullaniciSchema, 'kitaplar');

  kitaps.find({})
    .then((veriler) => {
      if (veriler.length === 0) {
        console.log('Kullanıcılar koleksiyonunda veri bulunmuyor.');
      } else {
        app.use("/kitap/:id", function(req, res){
            const x = req.params.id
            res.render("kitap_detay",{
                url: x,
                kitaplar: veriler
            })
        })
        app.use("/anasayfa", function(req, res){
            res.render("anasayfa",{
                kitaplar: veriler
            });
        })
        app.use((req, res, next) => {
          res.status(404).render("404");
        });
        // Çevre değişkeninden port numarasını al, eğer varsa
        findAvailablePort(initialPort, (port) => {
          app.listen(port, () => {
            console.log(`dinleniyor port: ${port}`);
          });
        });
        /*app.listen(0, () => {
            console.log(`dinleniyor port: ${port}`)
        })*/
        // console.log('Kullanıcılar:', veriler[0]['isim']);
      }
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('Veri çekme hatası:', error);
      mongoose.connection.close();
    });
})
.catch((error) => {
  console.error('MongoDB bağlantı hatası:', error);
});