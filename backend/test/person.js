import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Create new person', async t => {
  t.plan(3)
  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    tags: [],
    table: []
  }

  const res = await request(app)
    .post('/guest')
    .send(personToCreate)

  // checking for server response status success
  t.is(res.status, 200)

  // comparing the created person's data
  t.is(res.body.name, personToCreate.name)
  t.is(res.body.age, personToCreate.age)
})

test('Fetch a person', async t => {
  t.plan(3)
  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    tags: [],
    table: []
  }

  // first create a person
  const mariaUserCreated = (await request(app)
    .post('/guest')
    .send(personToCreate)).body

  // fetch the person we just created
  const fetchRes = await request(app).get(`/guest/${mariaUserCreated._id}`)
  // checking for server response status success
  // this endpoint is rendering into HTML
  t.is(fetchRes.status, 200)
  const fetchResJson = await request(app).get(`/guest/${mariaUserCreated._id}/json`)
  // checking for server response status success
  t.is(fetchResJson.status, 200)

  // this endpoint is responding with the user detail JSON data
  // compare the fetched user with created user
  const mariaUserFetched = fetchResJson.body
  t.deepEqual(mariaUserFetched, mariaUserCreated)
})

test('Delete a person', async t => {
  t.plan(4)

  // first create a person
  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    tags: [],
    table: []
  }
  const newUserCreated = (await request(app)
    .post('/guest')
    .send(personToCreate)).body

  // delete the person
  const deleteRes = await request(app).delete(`/guest/${newUserCreated._id}`)
  // checking for server response status success
  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  // trying to render the detail page for the deleted user
  const fetch = await request(app).get(`/guest/${newUserCreated._id}`)
  // checking for server response status - page not found 404
  t.is(fetch.status, 404)

  // trying to fetch the JSON data of the deleted user
  const fetchJson = await request(app).get(`/guest/${newUserCreated._id}/json`)
  // checking for server response status - page not found 404
  t.is(fetchJson.status, 404)
})

test('Get list of people', async t => {
  t.plan(4)

  // first create a person to ensure that
  // there will be at least 1 user in people's list
  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    tags: [],
    table: []
  }
  const _ = await request(app)
    .post('/guest')
    .send(personToCreate)

  // get the list of people - render view
  const res = await request(app).get('/guest/all')
  // checking for server response status success
  t.is(res.status, 200)

  // get the list of people - JSON
  const jsonRes = await request(app).get('/guest/all/json')
  // checking for server response status success
  t.is(jsonRes.status, 200)

  // check the response whether it is an array
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  // check the response whether at least there is 1 element
  t.true(jsonRes.body.length > 0)
})


// CASE : user can sit a table
test('user can add a guest with table', async t => {
  t.plan(4)
  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    tags: [],
    table: []
  }

  const tableToCreate = {
    name: 'Test Table',
    location: 'Leonardo',
    guests: []
  }

  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate)).body

  // create a meetup
  const createdTable = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  // add guest to table
  const addToTableRes = await request(app)
    .post(`/guest/${createdGuest._id}/add-to-table`)
    .send({ table: createdTable._id })

  // check the server response success
  t.is(addToTableRes.status, 200)

  // response body is the altered data of the guest
  const guestAltered = addToTableRes.body

  // check that user has that table on their tables
  t.is(guestAltered.table[0]._id, createdTable._id)

  // check that user's meetup is the meetup we created
  t.deepEqual(guestAltered.table[0], createdTable)

  // guestAltered is not the same with the first created user
  // createdPerson had no meetups
  // guestAltered has the meetup amongst their list of meetups
  t.notDeepEqual(guestAltered, createdGuest)
  
})

// CASE : user can change a table
test('user can change guest\'s table', async t => {
  t.plan(7)

  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    tags: [],
    table: []
  }

  const firstTableToCreate = {
    name: 'Test Table 1 ',
    location: 'Leonardo',
    guests: []
  }

  const secondTableToCreate = {
    name: 'Test Table 2',
    location: 'Leonardo',
    guests: []
  }

  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate)).body

  // create tables
  const createdFirstTable = (await request(app)
    .post('/table')
    .send(firstTableToCreate)).body

  const createdSecondTable = (await request(app)
    .post('/table')
    .send(secondTableToCreate)).body

  // add guest to table
  const addToTableRes = await request(app)
    .post(`/guest/${createdGuest._id}/add-to-table`)
    .send({ table: createdFirstTable._id })

  // check the server response success of first table
  t.is(addToTableRes.status, 200)

  // check that tables are different
  t.notDeepEqual(createdFirstTable, createdSecondTable)

  // response body is the altered data of the guest
  const guestOnFirstTable = addToTableRes.body

  const changeTableOfGuest = await request(app)
    .post(`/guest/${createdGuest._id}/change-table`)
    .send({ table: createdSecondTable._id })
  
  // check the server response success of second table
  t.is(changeTableOfGuest.status, 200)

  // response body is the altered data of the guest who changes his table
  const guestOnSecondTable = changeTableOfGuest.body

  // check that guest sit his first table
  t.notDeepEqual(guestOnFirstTable, createdGuest)

  // check that guest table changed
  t.notDeepEqual(guestOnFirstTable, guestOnSecondTable)

  // check that user has second table on their table
  t.is(guestOnSecondTable.table[0]._id, createdSecondTable._id)

  // check that guests's table is the table we created
  t.deepEqual(guestOnSecondTable.table[0], createdSecondTable)
  
})
