import express from 'express';
import bodyParser from 'body-parser';
import { showAllComments, submitNewPost, deleteFromDB } from '../database.js';
import generateHomePage from '../public/views.js';
import { changeCurrentUser, getCurrrentUser } from "./currentUser.js";

const app = express();



// Parse JSON comments
// app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    const data = await showAllComments();;
    changeCurrentUser(data.currentUser);
    const newCommentHTML = generateHomePage(data);
    res.send(newCommentHTML);
});

app.post('/', (req, res) => {
    submitNewPost(getCurrrentUser(), req.body.comment, null);
    res.redirect('/');
});

app.delete('/delete', (req, res) => {
    // deleting comment from database
    console.log('Deleting from database id: ' + req.query.id);
    deleteFromDB(req.query.id);

    // return status success!
    res.sendStatus(200);
});

// Start the server
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});