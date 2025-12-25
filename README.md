# What is this?
It's gonna be my API personal project. Focused on learning API Fundamentals, so it could help my transition into SDET.

## Stack
Since it's for my testing journey, it'll be simplified.
- Node.js
- Express JS

## Testing tools
- Postman (Manual Testing + Scripts)

## Features
- User Login
- CRUD Post

## Endpoints
- POST /login
- POST /posts
- GET /posts/
- GET /posts/:id
- PATCH /posts/:id
- DELETE /posts/:id

## How to?
### Manual Testing => 
- Clone this repository
- Install the dependencies
- Import this into postman `./test/postman/local-login_posts.postman_collection`

## Testing Scope
Positive:
- pos-login => Login succeed
- pos-create_post => Creating post
- pos-get_post => Get post by ID

Negative:
- neg-login_empty_field => Login with empty field
- neg-get_random_id => get post by id not exist
- neg-delete_random_id => delete post by id not exist


### Notes: Since it's only in-memory storage, so data won't be exists after server restart
