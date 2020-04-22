const express = require('express')
const router = express.Router()

const BoardService = require('../services/board-service')

router.get('/all/json', async (req, res) => {
  const boards = await BoardService.findAll()
  res.send(boards)
})

router.get('/:id/json', async (req, res) => {
  const board = await BoardService.find(req.params.id)
  if (!board) res.status(404)
  res.send(board)
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
