const router=require('express').Router();
const{ filterByQuery, checkNote, createNewNote } = require('../../lib/notes');

const {notes} = require('../../Develop/db/db.json');



router.get('/notes', (req,res) => {
    let allNotes= notes;
    console.log(notes);
    if(req.query) {
        allNotes=filterByQuery(req.query, allNotes);
    }
    res.json(allNotes);
});

router.post('/notes', (req,res) => {
    if(!checkNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
    }
});



module.exports = router;
