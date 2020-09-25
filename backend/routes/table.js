const express = require('express')
const router = express.Router()

const TableService = require('../services/table-service')

router.get('/all', async (req, res) => {
  const tables = await TableService.findAll()
  res.render('list', {
    items: tables
  })
})

// get all tables
// not suggested
router.get('/all/json', async (req, res) => {
  const tables = await TableService.findAll()
  res.send(tables)
})

router.get('/:id', async (req, res) => {
  const table = await TableService.find(req.params.id)
  if (!table) res.status(404)
  res.render('data', {
    data: table
  })
})

router.get('/:id/json', async (req, res) => {
  const table = await TableService.find(req.params.id)
  if (!table) res.status(404)
  res.send(table)
})

router.post('/', async (req, res) => {
  const table = await TableService.add(req.body)
  res.send(table)
})

router.patch("/edit", async (req, res) => {
  const editedGuest = await TableService.updateOne({
    _id: req.body.id
  }, {
    name: req.body.name
  });
  res.send(editedGuest);
});

router.delete('/:id', async (req, res) => {
  const table = await TableService.del(req.params.id)
  res.send(table)
})

module.exports = router