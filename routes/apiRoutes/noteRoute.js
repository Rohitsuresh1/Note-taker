const router=require('express').Router();
const{ filterByQuery, checkNote, createNewNote } = require('../../lib/notes');

const {notes} = require('../../Develop/db/db.json');

router.get('/', (req,res) => {
    res.json(notes);
});

router.get('/notes', (req,res) => {
    let allNotes= notes;
    if(req.query) {
        console.log(req.query);
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
