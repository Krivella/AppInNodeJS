const express = require('express')
const PORT = process.env.PORT || 3000
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const insecureHandlebars = allowInsecurePrototypeAccess(Handlebars)

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({extended:true}))
app.use(todoRoutes)
app.use(express.static(path.join(__dirname + '/public')))

async function start(){
    try{
     await mongoose.connect('mongodb+srv://krivella:1q2w3e4r@cluster0.cccb1.mongodb.net/todos', {
            useNewUrlParser: true,
            // useFindAndModify: false,
            retryWrites: true,
            w: "majority",
        });
        
        mongoose.Promise = global.Promise;
    
         app.listen(PORT, ()=> {
            console.log('Server has been started ... ')
        })
    }catch(e){
        console.log(e)
    }
}

start()

