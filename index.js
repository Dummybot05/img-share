const express = require('express')
const app = express()
const fs = require("fs")
const multer  = require('multer')
const PORT = 3000 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"))
app.set('view engine', 'ejs')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+259200000+'.jpg')
  }
})

var upload = multer({ storage: storage })
app.post('/profile', upload.single('imz'), function (req, res, next) {
  res.redirect('/')
})

app.get("/", async (req, res) => {
  fs.readdir('./public', (err, fila) => {
    fila.forEach(a => {
      try {
        if(a <= Date.now()+'.jpg') {
           fs.unlink('public/'+a, (e) => { return });
        }
      } catch(e) { return }
    })
  })

  fs.readdir('./public', (err, fila) => {
    res.render('index.ejs', { fila: fila });
  });
});

app.listen(PORT, () => {
   console.log("App Started...");
})
