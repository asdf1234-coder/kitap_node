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

// Modeli yalnızca bir kez tanımlayın
const Kullanici = mongoose.models.Kullanici || mongoose.model('Kullanici', KullaniciSchema, 'kitaplar');

// Asenkron `baglanti` fonksiyonu
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
/*async function baglanti() {
  const dbUri = process.env.DB_URI;
  try {
    await mongoose.connect(dbUri);
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
    const veriler = await kitaps.find({});

    return veriler.length === 0 ? "bos" : veriler;
  } catch (error) {
    console.error('Veri çekme hatası:', error);
    return 'Veri çekme hatası';
  } finally {
    mongoose.connection.close();
  }
}*/

// `findAvailablePort` fonksiyonu
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

// `/kitap/:id` route
app.use("/kitap/:id", async function(req, res) {
  const x = req.params.id;
  const kitaplar = await baglanti();
  res.render("kitap_detay", {
    url: x,
    kitaplar: kitaplar
  });
});

// `/anasayfa` route
app.use("/anasayfa", async function(req, res) {
  const kitaplar = await baglanti();
  res.render("anasayfa", {
    kitaplar: kitaplar
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).render("404");
});

// Portu bul ve dinlemeye başla
findAvailablePort(initialPort, (port) => {
  app.listen(port, () => {
    console.log(`Dinleniyor port: ${port}`);
  });
});












/*function baglanti(){
  const dbUri = process.env.DB_URI;
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
          mongoose.connection.close();
          return "bos"
        } else {
          mongoose.connection.close();
          return veriler
        }
      })
      .catch((error) => {
        console.error('Veri çekme hatası:', error);
        mongoose.connection.close();
        return 'Veri çekme hatası:', error
      });
  })
  .catch((error) => {
    console.error('MongoDB bağlantı hatası:', error);
    mongoose.connection.close();
    return 'MongoDB bağlantı hatası:', error
  });
}
app.use("/kitap/:id", function(req, res){
  const x = req.params.id
  res.render("kitap_detay",{
      url: x,
      kitaplar: baglanti()
  })
})
app.use("/anasayfa", function(req, res){
  res.render("anasayfa",{
      kitaplar: baglanti()
  });
})
app.use((req, res, next) => {
  res.status(404).render("404");
});
findAvailablePort(initialPort, (port) => {
  app.listen(port, () => {
    console.log(`dinleniyor port: ${port}`);
  });
});*/











/*mongoose.connect(dbUri, {
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
});*/