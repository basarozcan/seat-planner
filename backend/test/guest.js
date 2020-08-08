import test from 'ava'
import request from 'supertest'
import app from '../app'

// fetch guest list
test('fetch all guests as json', async t => {
  t.plan(4)

  const tableToCreate = {
    name: 'Test Table',
    location: 'Leonardo',
    guests: []
  }

  // create a table
  const createdTable = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  // console.log(createdTable._id);

  const personToCreate = {
    name: 'Başar Özcan',
    qty: 1,
    table: createdTable._id
  }

  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate))

  t.is(createdGuest.status, 200)

  // fetch all guests
  const guestsFetched = await request(app).get(`/guest/all/json`)

  t.is(guestsFetched.status, 200)

  // check the response whether it is an array
  t.true(Array.isArray(guestsFetched.body), 'Body should be an array')

  // check the response whether at least there is 1 element
  t.true(guestsFetched.body.length > 0)

})


// CASE : user can sit a table
test('user can add a guest with table', async t => {
  t.plan(4)

  const tableToCreate = {
    name: 'Add a guest w table',
    location: 'Leonardo',
    guests: []
  }

  // create a table
  const createdTable = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  // console.log(createdTable._id);

  const personToCreate = {
    name: 'Guest Adder',
    qty: 1,
    table: createdTable._id
  }

  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate))

  t.is(createdGuest.status, 200)

  const tableAltered = await request(app).get(`/table/${createdTable._id}/json`)
  const tableFetched = tableAltered.body

  // check the server response success
  t.is(tableAltered.status, 200)

  // check that tables are different
  t.notDeepEqual(tableFetched, createdTable)

  // check that guest added to table
  t.is(tableFetched.guests[0]._id, createdGuest.body._id)

})

//fetch a person
test('Fetch a person', async t => {
  t.plan(3)

  const tableToCreate = {
    name: 'Test Table 1',
    location: 'Leonardo',
    guests: []
  }

  // create a table
  const createdTable = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  // console.log(createdTable);

  const personToCreate = {
    name: 'Cahit Başar Özcan',
    qty: 1,
    table: createdTable._id
  }

  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate))

  t.is(createdGuest.status, 200)

  const createdGuestBody = createdGuest.body
  // console.log(createdGuest.body);

  // fetch the person we just created
  const fetchRes = await request(app)
    .get(`/guest/${createdGuestBody._id}`)
  // checking for server response status success
  // this endpoint is rendering into HTML

  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/guest/${createdGuestBody._id}/json`)
  // checking for server response status success
  t.is(fetchResJson.status, 200)
})

// TODO CASE - delete a person
test('Delete a person', async t => {
  t.plan(5)

  const tableToCreate = {
    name: 'Test Table 1',
    location: 'Leonardo',
    guests: []
  }

  // create a table
  const createdTable = (await request(app)
    .post('/table')
    .send(tableToCreate)).body

  // console.log(createdTable);

  const personToCreate = {
    name: 'Deleted Guest',
    qty: 1,
    table: createdTable._id
  }

  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate))

  t.is(createdGuest.status, 200)

  const newUserCreated = createdGuest.body

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


// TODO CASE : user can change a table
test('user can change table of guest', async t => {
  t.plan(8)

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

  // create tables
  const createdFirstTable = (await request(app)
  .post('/table')
  .send(firstTableToCreate))
  const fetchedFirstTable = createdFirstTable.body
  t.is(createdFirstTable.status, 200)
  
  const createdSecondTable = (await request(app)
  .post('/table')
  .send(secondTableToCreate))
  const fetchedSecondTable = createdSecondTable.body
  t.is(createdSecondTable.status, 200)

  // check that tables are different
  t.notDeepEqual(fetchedFirstTable, fetchedSecondTable)

  const personToCreate = {
    name: 'Intertable Guy',
    qty: 1,
    table: fetchedFirstTable._id
  }
  
  // create a guest
  const createdGuest = (await request(app)
    .post('/guest')
    .send(personToCreate))

  t.is(createdGuest.status, 200)
  const GuestOnFirstTable = createdGuest.body

  const changeTableOfGuest = await request(app)
    .post(`/guest/${GuestOnFirstTable._id}/change-table`)
    .send({ table: fetchedSecondTable._id })
  
  // check the server response success of second table
  t.is(changeTableOfGuest.status, 200)

  // response body is the altered data of the guest who changes his table
  const guestOnSecondTable = changeTableOfGuest.body

  // check that guest table changed
  t.notDeepEqual(guestOnSecondTable, GuestOnFirstTable)

  // check that user has second table on their table
  t.is(guestOnSecondTable.table[0]._id, fetchedSecondTable._id)

  // check that guests's table is the table we created
  t.deepEqual(guestOnSecondTable.table[0], fetchedSecondTable)
  
})
