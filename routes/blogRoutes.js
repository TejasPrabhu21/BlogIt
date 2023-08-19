const express = require('express');
const Blog = require('../models/blog');

const router = express.Router();

router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result });
        })
        .catch((err) => {
            res.render('404', { title: '404 Error', message: 'Something went wrong!!!' });
        });
});

router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save().then((result) => {
        res.redirect('/blogs');
    }).catch((err) => {
        console.log(err);
    });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch((err) => {
            res.render('404', { title: '404 Error', message: 'Blog not found !!!' });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {           //since this is AJAX request response cannot be redirect.
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            res.render('404', { title: '404 Error', message: 'Something went wrong!!!' });
        });
});

module.exports = router;