const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blogs')

const { allowedNodeEnvironmentFlags } = require('process')
const { result } = require('lodash')
const { rmSync } = require('fs')
const { render } = require('ejs')
 
const app = express()

// connecting to mongodb
mongoose.connect("mongodb://localhost/BasicBlogWeb")
    .then((result) => app.listen(3002))
    .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')


// middleware and static files

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.redirect('/blogs')
    // res.render('index', { title : 'HOME', blogs : blogs})
})

app.get('/about', (req, res) => {
    res.render('about', {title : 'About'})
})

app.get('/blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('index', {title : 'All blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
})


app.get('/blogs/create', (req, res) => {
    res.render('create', { title : 'Create'})
})

app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => {
            console.log(err)
        })
})

app.get('/blogs/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title : 'Blog details'})
        })
})

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  


app.use((req, res) => {
    res.status(404).render('404')
})