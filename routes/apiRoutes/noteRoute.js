const router=require('express').Router();
const uuid = require('uuid');
const{ filterByQuery, checkNote, getNotes, createNewNote, deleteNote } = require('../../lib/notes');

const {notes} = require('../../Develop/db/db.json');

router.get('/notes', (req,res) => {
    let noteArr = getNotes();
    // console.log(noteArr);
    res.json(noteArr);
});

router.get('/notes/:id', (req,res) => {
    let noteArr = getNotes();
    const result= filterByQuery(req.params.id,noteArr);
    if(result) {
        res.json(result);
    } else 
    res.send(404);
});

router.post('/notes', (req,res) => {
    let noteArr = getNotes();
    if(!checkNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    req.body.id=uuid.v4();
    const note = createNewNote(req.body, noteArr);
    res.json(note);
    }
});

router.delete('/notes/:id', (req,res) => {
    let noteArr=getNotes();
    const note = deleteNote(req.params.id,noteArr);
    // console.log("notes after the function is done", note);
   res.json(note);
});



module.exports = router;
