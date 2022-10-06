const express = require('express')
const app = express()
const { Cars1 } = require('./models')
const port = 8002

app.use(express.json())

//get cars
app.get('/cars', (req, res) => {
  Cars1.findAll()
    .then(cars => {
      res.status(200).json(cars)
    })
})

//get by id
app.get('/cars/:id', (req, res) => {
  Cars1.findOne({
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
app.post('/cars', (req, res) => {
  Cars1.create({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    image: req.body.image
  })
    .then(car => {
      res.status(201).json(car)
    })
    .catch(err => {
      res.status(422).json('cant create car')
    })
})

// put cars
app.put('/cars/:id', (req, res) => {
  Cars1.update({
    name: req.body.name,
    price: req.body.price,
    size: req.body.size,
    image: req.body.image
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

app.listen(port, () => {
  console.log('server jalan')
})