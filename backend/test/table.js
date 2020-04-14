import test from 'ava'
import request from 'supertest'
import app from "../app"

test('Get list of tables', async t => {
  t.plan(4)
  const tableToCreate = {
    name: 'Test Table',
    location: 'Leonardo',
    guests: []
  }

  const _ = await request(app)
    .post('/table')
    .send(tableToCreate)

  const res = await request(app).get('/table/all')
  t.is(res.status, 200)

  const resJson = await request(app).get('/table/all/json')
  t.is(resJson.status, 200)
  t.true(Array.isArray(resJson.body), 'Body should be an array')
  t.true(resJson.body.length > 0)
})

test('Create new table', async t => {
  t.plan(4)
  const tableToCreate = {
    name: 'Test Table',
    location: 'Leonardo',
    guests: []
  }

  const res = await request(app)
    .post('/table')
    .send(tableToCreate)

  t.is(res.status, 200)
  t.is(res.body.name, tableToCreate.name)
  t.is(res.body.location, tableToCreate.location)
  t.deepEqual(res.body.attendees, tableToCreate.attendees)
})

test('Fetch a table', async t => {
  t.plan(3)
  const tableToCreate = {
    name: 'Test Table',
    location: 'Leonardo',
    guests: []
  }

  const tableCreated = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  const fetchRes = await request(app).get(`/table/${tableCreated._id}`)
  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/table/${tableCreated._id}/json`)

  const tableFetched = fetchResJson.body

  t.is(fetchResJson.status, 200)
  t.deepEqual(tableFetched, tableCreated)
})

test('Delete a table', async t => {
  t.plan(4)

  const tableToCreate = {
    name: 'Test Table',
    location: 'Leonardo',
    guests: []
  }

  const table = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  const deleteRes = await request(app).delete(`/table/${table._id}`)

  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  const fetchJson = await request(app).get(`/table/${table._id}/json`)
  t.is(fetchJson.status, 404)

  const fetch = await request(app).get(`/table/${table._id}`)
  t.is(fetch.status, 404)
})

// 
