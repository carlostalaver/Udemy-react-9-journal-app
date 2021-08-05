import { bd } from "../firebase/firebase-config";


export const loadNotes = async (uid) => {

    const notesSnapshot = await bd.collection(`${uid}/journal/notes`).get();

    const notes = [];

    notesSnapshot.forEach(snapshotItem => {
        notes.push({
           id: snapshotItem.id,
           ...snapshotItem.data()
        });
    });

    return notes;

}