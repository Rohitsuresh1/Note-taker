const fs = require ('fs');
const path= require('path');

function filterByQuery(id, notesArr) {
    const result=notesArr.filter(note => note.id===id)[0];
    return result;
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

function deleteNote(id, notesArr) {
    let newNotes = [];
   notesArr.forEach(note=>{
       if(note.id != id)
            newNotes.push(note);
   });
   notesArr=newNotes;
   fs.writeFileSync(
        path.join(__dirname,'../Develop/db/db.json'),
        JSON.stringify({notes: notesArr}, null, 2)
   );
   return notesArr;
};

module.exports= {filterByQuery, checkNote, createNewNote, deleteNote};


