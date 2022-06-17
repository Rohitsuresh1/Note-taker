const router=require('express').Router();
const uuid = require('uuid');
const{ filterByQuery, checkNote, createNewNote, deleteNote } = require('../../lib/notes');

const {notes} = require('../../Develop/db/db.json');

router.get('/notes', (req,res) => {
    res.json(notes);
});

router.get('/notes/:id', (req,res) => {
    const result= filterByQuery(req.params.id,notes);
    if(result) {
        res.json(result);
    } else 
    res.send(404);
});

router.post('/notes', (req,res) => {
    if(!checkNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    req.body.id=uuid.v4();
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});

router.delete('/notes/:id', (req,res) => {
    const note = deleteNote(req.params.id,notes);
   res.json(notes);
});



module.exports = router;
