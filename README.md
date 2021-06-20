# rest-api-test

## Setup
 - npm or yarn
 - node 12+

## Database
I'm using Sqlite3 as storage/database since it's the requirements fits the need of a relational database, And because sqlite is self contained and doesn't need to install any third party service for the examinator.

To initialize/reset the DB, run: _(required before starting the application)_

`yarn db:reset`

To add some data in it, run:

`yarn seed:all`

## Tests
Run them with the command: `jest`
And for Coverage: `jest --coverage`

## API Endpoints
There's no official difference on public and private endpoint on this API since there's no real authentication, but i still split them conceptially

### Authentication

```
POST /api/public/auth/register
{
  firstName: stirng,
  lastName: string,
  email: string,
  password: string,
}

POST /api/public/auth/login
{
  email: string,
  password: string,
}

```

### Rooms

```
GET /api/v1/room/list
```

### Reservations

```
GET /api/v1/reservation
{
  userId: number, // Optional, will fetch only the user's reservations
}

POST /api/v1/reservation/book
{
  roomId: number, // forein key on room
  userId: number, // forein key on user
  nbGuests: number,
  from: string, // ISO date format
  to: string
}

PUT /api/v1/reservation/*[reservation-id]*
{
  nbGuests: number,
  from: string, // ISO date format
  to: string
}

DELETE /api/v1/reservation/*[reservation-id]*
```