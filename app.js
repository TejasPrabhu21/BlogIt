const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
//Express app
const app = express();

app.set('view engine', 'ejs');

//Listen for requests
const dbURI = 'mongodb+srv://netninja:netninja123@blogninja.biealsx.mongodb.net/blogWebsite?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'Blog3',
        snippet: 'My third blog',
        body: 'This is my first ever blog, as I am learning NodeJS and Express along with MongoDB.'
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            req.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use(express.static('public'));                 //to use contents in public folder
app.use(express.urlencoded({ extended: true }));  //to get form data.
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.status(404).render('404', { title: '404 Error.' });
});