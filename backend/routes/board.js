const express = require('express')
const router = express.Router()

const BoardService = require('../services/board-service')
const TableService = require('../services/table-service')

// TODO - user_id yollayıp boardlarını çekelim
router.get('/all/json', async (req, res) => {
  const boards = await BoardService.findAll()
  res.send(boards)
})

router.get('/all/:uid/json', async (req, res) => {
  console.log(req.params.uid);
  const boards = await BoardService.findFilter({owner_id: req.params.uid})
  res.send(boards)
})

router.get('/:id/json', async (req, res) => {
  console.log(req.params.id);
  await BoardService.find(req.params.id, (err, board) => {
    if(err){
      res.status(404).send('board not found')
    }else{
      res.send(board)
    }
  })
})

// get all tables for selected board
router.get('/:id/get-tables/json', async (req, res) => {
  const tables = await TableService.findFilter({board: req.params.id})
  res.send(tables)
})

router.post('/', async (req, res) => {
  const board = await BoardService.add(req.body)
  res.send(board)
})

router.delete('/:id', async (req, res) => {
  const board = await BoardService.del(req.params.id)
  res.send(board)
})

module.exports = router
