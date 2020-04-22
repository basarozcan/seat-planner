const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const TableService = require('../services/table-service')

// router.get('/all', async (req, res) => {
//   const people = await PersonService.findAll()
//   res.render('list', { items: people })
// })

router.get('/all/json', async (req, res) => {
  const people = await PersonService.findAll()
  //res.render('list', { items: people })
  res.send(people)
})

router.get('/:id', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  if (!user) res.status(404)
  res.render('data', { data: user })
})

router.get('/:id/json', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  if (!user) res.status(404)
  res.send(user)
})

router.post('/', async (req, res) => {
  const user = await PersonService.add(req.body)
  const getTable = await TableService.find(req.body.table)
  await TableService.sitToTable(user, getTable)
  res.send(user)
})

router.post('/:id/add-to-table', async (req, res) => {
  // @body table
  const user = await PersonService.find(req.params.id)
  const newTable = await TableService.find(req.body.table)
  await TableService.sitToTable(user, newTable)
  res.send(user)
})

router.post('/:id/change-table', async (req, res) => {
  // @body table
  const user = await PersonService.find(req.params.id)

  //remove guest from old table
  const oldTable = await TableService.find(user.table)
  await TableService.standUpFromTable(user,oldTable)

  //add guest to new table
  const newTable = await TableService.find(req.body.table)
  await TableService.sitToTable(user, newTable)

  res.send(user)
})

router.delete('/:id', async (req, res) => {
  const user = await PersonService.del(req.params.id)
  res.send(user)
  // console.log(user)
})

module.exports = router
