import test from 'ava'
import request from 'supertest'
import app from "../app"

test('Get list of boards', async t => {
  t.plan(3)
  const boardToCreate = {
    name: 'Test Board No-1'
  }

  const _ = await request(app)
    .post('/board')
    .send(boardToCreate)

  const resJson = await request(app).get('/table/all/json')
  t.is(resJson.status, 200)
  t.true(Array.isArray(resJson.body), 'Body should be an array')
  t.true(resJson.body.length > 0)
})

test('Create new board', async t => {
  t.plan(2)
    const boardToCreate = {
        name: 'Test Board No-2'
    }

    const res = await request(app)
        .post('/board')
        .send(boardToCreate)

    t.is(res.status, 200)
    t.is(res.body.name, boardToCreate.name)
})