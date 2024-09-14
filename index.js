const mongoose = require('mongoose')
const express = require("express")
const net = require('net');
const app = express();
const path = require("path")
app.set("view engine","ejs");
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/public', express.static(path.join(__dirname, 'public')));
require('dotenv').config();

const dbUri = process.env.DB_URI;

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
        findAvailablePort(initialPort, (port) => {
          app.listen(port, () => {
            console.log(`dinleniyor port: ${port}`);
          });
        });
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