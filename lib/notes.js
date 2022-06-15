const fs = require ('fs');
const path= require('path');

function filterByQuery(id, notesArr) {
    let filteredResults = notesArr.filter(note => note.title !== id)[0];
    console.log(filteredResults);
    return filteredResults;
};

function checkNote(note) {
    if(!note.title || typeof note.title !== 'string'){
        return false;
    }
    if(!note.text || typeof note.text!=='string'){
        return false;
    }
    return true;
};

function createNewNote(body, notesArr) {
    const note = body;
    console.log(body,notesArr);
    notesArr.push(note);
    fs.writeFileSync(
        path.join(__dirname,'../Develop/db/db.json'),
        JSON.stringify({notes: notesArr}, null, 2)
    );
    return note;
};


module.exports= {filterByQuery, checkNote, createNewNote};


