const path = require('path');
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid'); //universele unieke ID's aanmaken!:D
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))
// parse form data in POST request body:
app.use(express.urlencoded({ extended: true }))
// parse JSON in POST request body:
app.use(express.json())
// om put/patch/delete requests te faken
app.use(methodOverride('_method'))
// views en EJS instellen
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// de fake database
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
// INDEX - render all comments
// **********************************
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
// **********************************
// NEW - render een form voor een nieuwe comment
// **********************************
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
// **********************************
// CREATE - maak een nieuwe comment
// **********************************
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})
// *******************************************
// SHOW - details van een specifiek comment
// *******************************************
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        res.render('comments/notfound', { id })
    } else {
        res.render('comments/show', { comment });
    }
})
// *******************************************
// EDIT - render een form om een comment te bewerken
// *******************************************
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    if (!comment) {
        res.render('comments/notfound', { id })
    } else {
        res.render('comments/edit', { comment })
    }
})
// *******************************************
// UPDATE - update een comment
// *******************************************
app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
});

// *******************************************
// DELETE/DESTROY- verwijder een comment
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





















