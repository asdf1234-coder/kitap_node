const mongoose = require('mongoose')
const express = require("express")
const net = require('net');
const session = require('express-session');
const app = express();
const path = require("path")
app.set("view engine","ejs");
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/public', express.static(path.join(__dirname, 'public')));
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
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
const AdminSchema = new mongoose.Schema({
  admin_adi: String,
  admin_sifre: String
});
const Kullanici = mongoose.models.Kullanici || mongoose.model('Kullanici', KullaniciSchema, 'kitaplar');
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema, 'admin');
module.exports = mongoose.model('Admin', AdminSchema);
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
async function baglantiAdmin() {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
    console.log('MongoDB bağlantısı başarılı!');
    
    const AdminVeriler = await Admin.find({});
    
    return AdminVeriler.length === 0 ? "bos" : AdminVeriler;
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

app.get('/login', (req, res) => {
  res.render('adminLogin');
});

app.post('/login', async (req, res) => {
  const { password } = req.body;

  try {
      const AdminVeriler = await baglantiAdmin();
      if (AdminVeriler === 'Veri çekme hatası' || AdminVeriler === 'bos') {
          return res.status(500).send('Veri çekme hatası');
      }
      const admin = AdminVeriler[0];
      if (admin && admin.admin_sifre === password) {
          req.session.authenticated = true;
          res.redirect('/admin');
      } else {
          res.status(401).send('Yanlış şifre');
      }
  } catch (error) {
      console.error('Giriş hatası:', error);
      res.status(500).send('Giriş hatası');
  }
});

app.get('/admin', async (req, res) => {
  if (req.session.authenticated) {
    try {
      const kitaplar = await baglanti();
      res.render("admin", {
        kitaplar: kitaplar
      });
    } catch (error) {
      res.status(500).send('Sunucu hatası');
    }
  } else {
      res.status(401).send('Yetkisiz erişim');
  }
});

app.use((req, res, next) => {
  res.status(404).render("404");
});

findAvailablePort(initialPort, (port) => {
  app.listen(port, () => {
    console.log(`Dinleniyor port: ${port}`);
  });
});