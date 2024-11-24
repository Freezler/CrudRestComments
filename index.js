const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //For generating ID's
const express = require('express');
const app = express();
const port = 3000;

// Middleware i.e. functions that run between request and response
app.use(express.static(path.join(__dirname, 'public')))
//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// To parse incoming JSON in POST request body:
app.use(express.json())
// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'))
// Views folder and EJS setup:
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Joel',
        comment: `I've struggled a long time with survivin', but no matter what you have to find something to fight for.`,
        lastUpdated: ''
    },
    {
        id: uuid(),
        username: 'The Oregon Trail',
        comment: 'You have died of dysentery.',
        lastUpdated: ''
    },
    {
        id: uuid(),
        username: 'Niko Bellic',
        comment: 'War is where the young and stupid are tricked by the old and bitter into killing each other.',
        lastUpdated: ''
    },
    {
        id: uuid(),
        username: 'general Nikolai Krukov',
        comment: 'All your base are belong to us',
        lastUpdated: ''
    },
    {
        id: uuid(),
        username: 'Old Man',
        comment: 'It’s dangerous to go alone, take this!',
        lastUpdated: ''
    }, {
        id: uuid(),
        username: 'Duke Nukem',
        comment: `It's time to kick ass and chew bubblegum...and I'm all outta gum.`,
        lastUpdated: ''
    }, {
        id: uuid(),
        username: 'Solid Snake',
        comment: `It's easy to forget what a sin is in the middle of a battlefield.`,
        lastUpdated: ''
    }
]
// **********************************
// INDEX - renders multiple comments
// **********************************
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
// **********************************
// NEW - renders a form
// **********************************
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
// **********************************
// CREATE - creates a new comment
// **********************************
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})
// *******************************************
// SHOW - details about one particular comment
// *******************************************
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})
// *******************************************
// EDIT - renders a form to edit a comment
// *******************************************
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})
// *******************************************
// UPDATE - updates a particular comment
// *******************************************
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
});

// *******************************************
// DELETE/DESTROY- removes a single comment
// *******************************************
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})



app.get('/', (req, res) => {
    res.send("GET /tacos response")
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} tacos`)
})

app.listen(port, () => {
    console.log(`ON PORT ${port}!`)
})

module.exports = app;

// GET /comments - list all comments
// POST /comments - Create a new comment
// GET /comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comments/:id - Destroy one comment




















