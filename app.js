const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const users = require('./user')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/login', (req, res) => {
  const query = req.body
  const filterUser = users.find(user =>
    query.email === user.email && query.password === user.password)
  if (filterUser) {
    res.render('home', { userName: filterUser.firstName })
  } else {
    const wrongMessage = 'Account or Password Is Wrong'
    res.render('index', { wrongMessage })
  }

})
app.listen(port, () => {
  console.log(`Server now is running on localhost:${port}.`)
})