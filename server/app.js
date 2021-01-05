const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 5000
const schema = require('./schemas/schema')
const app = express()

mongoose.connect('mongodb+srv://ubuntu:Trumha123@cluster0.lnefx.mongodb.net/graphql?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        err ? console.log(err) : console.log('connected to db')
    })

const bookModel = require('./models/book')
const authModel = require('./models/author')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})
