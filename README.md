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



