import { bd } from "../firebase/firebase-config";

/* Este helpers me permite recurar las notas dado un uid de usuario */
export const loadNotes = async (uid) => {

    const notesSnapshot = await bd.collection(`${uid}/journal/notes`).get();

    // console.log( notesSnapshot );

    const notes = [];

    notesSnapshot.forEach(snapshotItem => {
        notes.push({
           id: snapshotItem.id,
           ...snapshotItem.data() // .data() me entrega la lista de notas del usuario, asi lo maneja firebase
        });
    });

    return notes;

}