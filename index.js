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
const initialPort = parseInt(3000, 10);
const KullaniciSchema = new mongoose.Schema({
  id: Number,
  isim: String,
  resim: String,
  yayinevi: String,
  tur: String,
  yazar: String,
  ucret: Number
});
const Kullanici = mongoose.models.Kullanici || mongoose.model('Kullanici', KullaniciSchema, 'kitaplar');
async function baglanti() {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB bağlantısı başarılı!');
    
    const veriler = await Kullanici.find({});
    
    return veriler.length === 0 ? "bos" : veriler;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return 'Veri çekme hatası';
  } finally {
    mongoose.connection.close();
  }
}
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

app.use("/kitap/:id", async function(req, res) {
  const x = req.params.id;
  const kitaplar = await baglanti();
  res.render("kitap_detay", {
    url: x,
    kitaplar: kitaplar
  });
});

app.use("/anasayfa", async function(req, res) {
  const kitaplar = await baglanti();
  res.render("anasayfa", {
    kitaplar: kitaplar
  });
});

app.use((req, res, next) => {
  res.status(404).render("404");
});

findAvailablePort(initialPort, (port) => {
  app.listen(port, () => {
    console.log(`Dinleniyor port: ${port}`);
  });
});