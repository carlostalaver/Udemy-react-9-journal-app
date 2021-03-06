import { bd } from '../firebase/firebase-config';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

/* diferencias entre usar useSelector() y getState:  es un custom hook que te brinda la librería react-redux para poder obtener data del store de forma más práctica.
  En cambio getState() es una función que viene de manera implícita cuando realizas llamados al middleware Thunk, es decir cuando despachas funciones en lugar de despachar un objeto de acción.
  Por consiguiente, cada vez que quieras obtener el state más actual al momento de despachar funciones, Thunk ya te da la función getState() para obtener dicha data.
  Entonces al momento de querer obtener el state más actual en componentes utilizarás el custom hook useSelector() ya que la función getState() solo se encuentra disponible al despachar acciones mediante el Thunk. */

  /* por lo general las acciones que son asincronas inician con startALGO */
  export const startNewNote = () => {
    return async ( dispatch, getState ) => { //retorno un callback porq esto es un action asincrono
        const uid = getState().auth.uid; //getState() lo uso dentro del action para tener acceso al estado de la aplicacion

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        /* Para guardar una nueva nota en firebase */
        //uid: será el nombre de la coleccion
        //journal: sera el numbre del Documento.
        //notes: sera la informacion contenida en cada documento
        const docRef =  await bd.collection(`${uid}/journal/notes`).add(newNote); //espero que se haga la insercion, ${uid}/journal/notes es el path donde insertare la info en firebase
        
        dispatch( activeNote(docRef.id, newNote));
        dispatch( addNewNote(docRef.id, newNote) );
    }
}


export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const startLoadingNotes = ( uid ) => {
    return async (dispatch) =>{
        const notes = await loadNotes(uid);
        dispatch( setNotes(notes) );

    }
};

/* Accion para actualizar un nota en la base de datos */
export const startSaveNote = ( note ) => {
    return async (dispatch, getState) =>{

        const { uid } = getState().auth;
        (!note.url) && delete note.url // elimino la proiedad url se es que está undefined ya que si lo envio undefined firebase lanzará un error
        const noteToFirestore = {...note };
        delete noteToFirestore.id;

        await bd.doc(`${uid}/journal/notes/${note.id}`).update( noteToFirestore );

        dispatch( refreshNote(note.id, note) );
        Swal.fire('Saved', note.title, 'success');
    }
};


/* Accion para actualizar en pantalla la nota que recien acabo de actualizar en firestore */
export const  refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});


/* Accion para subir imagenes a cloudinary */
export const startUploading = ( file ) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;

        dispatch( startSaveNote( activeNote ) );

        Swal.close();
    }
} 


/* Accion para eliminar una nota de firestore */
export const startDeleting = (idNote) => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;

        await bd.doc(`${uid}/journal/notes/${idNote}`).delete();
        dispatch( deleteNote(idNote) );
    }
}

export const deleteNote= (idNote) => ({
    type: types.notesDelete,
    payload: idNote
})

/* Action para limpiar las notas cuando me deslogueo */
export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
});

/* Acccion para agregar una nota recien creada a mi lista de notas */

export const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload:{
        id,
        ...note
    }
})