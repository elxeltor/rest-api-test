## Language and Frameworks:
Java or JavaScript; you are free to choose the frameworks and libraries at your choice, such as
maven, npm, spring, spring boot, node, express, etc.
## Storage:
In-memory or embedded database

## Problem:
After the contagious pandemic is over, Panoramic Hotel is now accepting booking of its only
presidential suite. You are going to design and develop a back-end service to provide the REST APIs to
manage the booking of the presidential suite. Each booking allows up to 3 people for up to 3 days.

## Solution: Provide REST APIs for
1. Booking the presidential suite. The user provides the following:
    * Email, first name and last name of the principal guest
    * Number of people, including the principal guest
    * Check-in and check-out dates

2. Upon success, the system returns the following:
    * A unique reservation identifier
    * How to retrieve and cancel the reservation
3. Retrieving a reservation with its identifier
4. Cancelling a reservation with its identifier

## We are Looking for:
1. A well-written README.md file which includes the following:
    * The language, framework, and the storage you used
    * How to compile and run your solution
    * How to run the tests
    * The test coverage
    * Any other information you want us to know
2. The REST APIs that can be called for example using Postman or curl.
3. NO user interface please.
4. Clean and clear code with high test coverage
5. Robust and elegant error handling
6. Good git habit
7. The appropriate HTTP methods for different purposes with correct response status codes
8. As it is highly likely that multiple guests may book the presidential suite for the same or
overlapping dates, prove with tests that your service can gracefully handle this scenario.