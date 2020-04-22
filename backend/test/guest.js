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

  const tableAltered = await request(app).get(`/table/${createdTable._id}/json`)
  const tableFetched = tableAltered.body

  // check the server response success
  t.is(tableAltered.status, 200)

  // check that tables are different
  t.notDeepEqual(tableFetched, createdTable)

  // check that guest added to table
  t.is(tableFetched.guests[0]._id, createdGuest.body._id)

})

// TODO CASE - fetch a person
// test('Fetch a person', async t => {
//   t.plan(3)
//   const personToCreate = {
//     name: 'Başar Özcan',
//     qty: 1,
//     tags: [],
//     table: []
//   }

//   // first create a person
//   const mariaUserCreated = (await request(app)
//     .post('/guest')
//     .send(personToCreate)).body

//   // fetch the person we just created
//   const fetchRes = await request(app).get(`/guest/${mariaUserCreated._id}`)
//   // checking for server response status success
//   // this endpoint is rendering into HTML
//   t.is(fetchRes.status, 200)
//   const fetchResJson = await request(app).get(`/guest/${mariaUserCreated._id}/json`)
//   // checking for server response status success
//   t.is(fetchResJson.status, 200)

//   // this endpoint is responding with the user detail JSON data
//   // compare the fetched user with created user
//   const mariaUserFetched = fetchResJson.body
//   t.deepEqual(mariaUserFetched, mariaUserCreated)
// })

// TODO CASE - delete a person
// test('Delete a person', async t => {
//   t.plan(4)

//   // first create a person
//   const personToCreate = {
//     name: 'Başar Özcan',
//     qty: 1,
//     tags: [],
//     table: []
//   }
//   const newUserCreated = (await request(app)
//     .post('/guest')
//     .send(personToCreate)).body

//   // delete the person
//   const deleteRes = await request(app).delete(`/guest/${newUserCreated._id}`)
//   // checking for server response status success
//   t.is(deleteRes.status, 200)
//   t.is(deleteRes.ok, true)

//   // trying to render the detail page for the deleted user
//   const fetch = await request(app).get(`/guest/${newUserCreated._id}`)
//   // checking for server response status - page not found 404
//   t.is(fetch.status, 404)

//   // trying to fetch the JSON data of the deleted user
//   const fetchJson = await request(app).get(`/guest/${newUserCreated._id}/json`)
//   // checking for server response status - page not found 404
//   t.is(fetchJson.status, 404)
// })


// TODO CASE : user can change a table
// test('user can change guest\'s table', async t => {
//   t.plan(7)

//   const personToCreate = {
//     name: 'Başar Özcan',
//     qty: 1,
//     tags: [],
//     table: []
//   }

//   const firstTableToCreate = {
//     name: 'Test Table 1 ',
//     location: 'Leonardo',
//     guests: []
//   }

//   const secondTableToCreate = {
//     name: 'Test Table 2',
//     location: 'Leonardo',
//     guests: []
//   }

//   // create a guest
//   const createdGuest = (await request(app)
//     .post('/guest')
//     .send(personToCreate)).body

//   // create tables
//   const createdFirstTable = (await request(app)
//     .post('/table')
//     .send(firstTableToCreate)).body

//   const createdSecondTable = (await request(app)
//     .post('/table')
//     .send(secondTableToCreate)).body

//   // add guest to table
//   const addToTableRes = await request(app)
//     .post(`/guest/${createdGuest._id}/add-to-table`)
//     .send({ table: createdFirstTable._id })

//   // check the server response success of first table
//   t.is(addToTableRes.status, 200)

//   // check that tables are different
//   t.notDeepEqual(createdFirstTable, createdSecondTable)

//   // response body is the altered data of the guest
//   const guestOnFirstTable = addToTableRes.body

//   const changeTableOfGuest = await request(app)
//     .post(`/guest/${createdGuest._id}/change-table`)
//     .send({ table: createdSecondTable._id })
  
//   // check the server response success of second table
//   t.is(changeTableOfGuest.status, 200)

//   // response body is the altered data of the guest who changes his table
//   const guestOnSecondTable = changeTableOfGuest.body

//   // check that guest sit his first table
//   t.notDeepEqual(guestOnFirstTable, createdGuest)

//   // check that guest table changed
//   t.notDeepEqual(guestOnFirstTable, guestOnSecondTable)

//   // check that user has second table on their table
//   t.is(guestOnSecondTable.table[0]._id, createdSecondTable._id)

//   // check that guests's table is the table we created
//   t.deepEqual(guestOnSecondTable.table[0], createdSecondTable)
  
// })
