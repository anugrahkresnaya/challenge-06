# Challenge-06

## packages
- express
- nodemon
- pg
- sequelize
- JWT
- Bcrypt
- BcryptJS
- swagger ui express

## Super Admin Account
```
  email: superadmin123@gmail.com
  password: super123
```
## Link to Open API Docs
api-docs: http://localhost:8002/api-docs

## Step to run
- clone the repositories
  ```
  git clone https://github.com/anugrahkresnaya/challenge-06.git
  ```
- install the dependencies
  ```
  npm install or yarn install
  ```
- set config for database
  ```
  setting database.js
  sequelize db:create
  sequelize db:migrate
  sequelize db:seed:all
  ```
- run the server
  ```
  npm run dev
  ```
