const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then(notes => {
            let parseNotes;
            try {
                parseNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parseNotes = [];
            }
            return parseNotes;
        })
    }

    addNote(note) {
        const { title, text } = note;
        // basic validation to check that a note has title or text
        if (!title || !text) {
            return 'Looks like you are missing a text or title'
        }
        const addNote = { id: uuidv4(), title, text };
        return this.getNotes()
            .then(notes => [...notes, addNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => addNote)
            .catch(err => console.log('err', err));
    }

    removeNote(id) {
        return this.getNotes().then((notes) => notes.filter(note => note.id !== id))
            .then(filteredNotes => this.write(filteredNotes))
            .catch(err => console.log('err', err));
    }
}

module.exports = new Store();
