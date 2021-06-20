const moment = require('moment');
const supertest = require('supertest');
const { resetSeeds } = require("./utils/testDBSetup");

const { app } = require('../src/app');
const testClient = supertest(app);


describe('reservations', () => {
  beforeAll(async () => {
    await resetSeeds();
  });

  it('should get the list of all reservations', () => {
    return testClient.get('/api/v1/reservation')
      .expect(200)
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      });
  })

  it('should create a reservation if there is no overlap', async () => {
    const inAMonth = moment().utc().add(1, 'month');
    const inAMonthAnd3Days = inAMonth.add(3, 'days');
    const res = await testClient.post('/api/v1/reservation/book')
      .send({
        "roomId": 1,
        "userId": 2,
        "nbGuests": 3,
        "from": inAMonth.toISOString(),
        "to": inAMonthAnd3Days.toISOString()
      })
      .expect(200);
    return;
  });

  it('should fail to create a reservation with an overlap', async () => {
    const in1Day = moment().utc().add(1, 'day');
    const in4Days = moment().utc().add(4, 'days');
    const res = await testClient.post('/api/v1/reservation/book')
      .send({
        "roomId": 1,
        "userId": 1,
        "nbGuests": 3,
        "from": in1Day.toISOString(),
        "to": in4Days.toISOString()
      })
      .expect(404);
    return;
  });

  it('should fail to create a reservation if the stay is longer than 3 days', async () => {
    const in1Day = moment().utc().add(1, 'day');
    const in6Days = moment().utc().add(6, 'days');
    return testClient.post('/api/v1/reservation/book')
      .send({
        "roomId": 1,
        "userId": 1,
        "nbGuests": 3,
        "from": in1Day.toISOString(),
        "to": in6Days.toISOString()
      })
      .expect(400);
  });

  it('should fail to create a reservation with more than 3 gests', async () => {
    const in1Day = moment().utc().add(1, 'day');
    const in4Days = moment().utc().add(3, 'days');
    return testClient.post('/api/v1/reservation/book')
      .send({
        "roomId": 1,
        "userId": 1,
        "nbGuests": 4,
        "from": in1Day.toISOString(),
        "to": in4Days.toISOString()
      })
      .expect(400);
  });

  it('should fail to create a reservation with less than 1 gest', async () => {
    const in1Day = moment().utc().add(1, 'day');
    const in4Days = moment().utc().add(3, 'days');
    return testClient.post('/api/v1/reservation/book')
      .send({
        "roomId": 1,
        "userId": 1,
        "nbGuests": 0,
        "from": in1Day.toISOString(),
        "to": in4Days.toISOString()
      })
      .expect(400);
  });

  it('should update a reservation if there is no overlap', async () => {
    const reservations = await testClient.get('/api/v1/reservation').then(res => res.body);
    const inAMonth = moment().utc().add(2, 'month');
    const inAMonthAnd3Days = inAMonth.add(3, 'days');
    console.log(reservations)
    const res = await testClient.put(`/api/v1/reservation/${reservations[0].id}`)
      .send({
        "roomId": 1,
        "userId": 1,
        "nbGuests": 3,
        "from": inAMonth.toISOString(),
        "to": inAMonthAnd3Days.toISOString()
      })
      .expect(200);
    const newNbOfReservations = await testClient.get('/api/v1/reservation').then(res => res.body.length);
    expect(newNbOfReservations).toBe(reservations.length);
    return;
  });

  it('should fail to update a reservation created by another user', async () => {
    const reservations = await testClient.get('/api/v1/reservation').then(res => res.body);
    const inAMonth = moment().utc().add(2, 'month');
    const inAMonthAnd3Days = inAMonth.add(3, 'days');
    const res = await testClient.put(`/api/v1/reservation/${reservations[0].id}`)
      .send({
        "roomId": 1,
        "userId": 2,
        "nbGuests": 3,
        "from": inAMonth.toISOString(),
        "to": inAMonthAnd3Days.toISOString()
      })
      .expect(403);
    const newNbOfReservations = await testClient.get('/api/v1/reservation').then(res => res.body.length);
    expect(newNbOfReservations).toBe(reservations.length);
    return;
  });

  it('should be able to cancel/delete a reservation', async () => {
    const reservations = await testClient.get('/api/v1/reservation').then(res => res.body);
    await testClient.delete(`/api/v1/reservation/${reservations[0].id}`)
      .send({
        "userId": 1,
      })
      .expect(200);
    
    const newNbOfReservations = await testClient.get('/api/v1/reservation').then(res => res.body.length);
    expect(newNbOfReservations).toBeLessThan(reservations.length);
    return;
  });
})