const express = require('express')
const app = express()
const { Cars } = require('./models')
const upload = require('./server/multer')
const cloudinary = require('./server/cloudinary')
const port = 8002

app.use(express.json())

//get cars
app.get('/', (req, res) => {
  Cars.findAll()
    .then(cars => {
      res.status(200).json(cars)
    })
})

//get by id
app.get('/cars/:id', (req, res) => {
  Cars.findOne({
    where: {id: req.params.id}
  })
    .then(cars => {
      res.status(200).json(cars)
    })
    .catch(err => {
      res.status(404).json({
        msg: 'cant find the car',
        err: err.message
      })
    })
})

//post cars
app.post('/cars', upload, (req, res) => {
  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, function (err, result) {
    if (!!err) {
      console.log(err)
      return res.status(400).json({
        message: "gagal"
      })
    }
    Cars.create({
      name: req.body.name,
      price: req.body.price,
      size: req.body.size,
      image: result.url
    })
      .then(car => {
        res.status(201).json({
          message: "sukses",
          data: car
        })
      })
      .catch(err => {
        res.status(422).json('cant create car')
      })
  })

})

// put cars
app.put('/cars/:id', (req, res) => {
  const url = `/uploads/${req.file.filename}`
  Cars.update({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    image: url
  }, {
    where: { id: req.params.id }
  })
    .then(car => {
      res.status(201).json(car)
    })
    .catch(err => {
      res.status(422).json('can update car')
    })
})

// put endpoint upload file
app.put('/cars/:id/image/cloudinary', upload, (req, res) => {
  const fileBase64 = req.file.buffer.toString('base64');
  const file = `data:${req.file.mimetype};base64,${fileBase64}`;

  cloudinary.uploader.upload(file, function (err, result) {
    if (!!err) {
      console.log(err)
      return res.status(400).json({
        message: "gagal"
      })
    }

    res.status(201).json({
      message: "sukses",
      url: result.url,
    })
  })
})

app.delete('/cars/:id', (req, res) => {
  Cars.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((car) => {
      res.status(200).json(car)
    })
    .catch(err => {
      res.status(422).json(err)
    })
})

app.listen(port, () => {
  console.log(`server up on http://localhost:${port}`)
})