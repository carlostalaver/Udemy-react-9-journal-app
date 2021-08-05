import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { activeNote, startDeleting } from '../../actions/notes';

export const NoteScren = () => {

    const { active: note } = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(note);
    const { body, title, idNote } = formValues;
    const dispatch = useDispatch();

    /* useRef permite almacenar una variable mutable en .current y que ESTE CAMBIO NO VA A RENDERIZAR EL 
       COMPONENTE CUANTO DICHO VALOR HAYA CAMBIADO */
    const activeId = useRef(note.id); // almaceno el valor del id de una nota

    useEffect(()=> {
        /* si el id de la nota cambió debo resetear el stado del form */
        if(note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id; // para actualizar el valor del ref
        }
    }, [reset, note]);

    useEffect(() => {
        dispatch( activeNote(formValues.id, {...formValues}) );
    }, [formValues, dispatch])

    const handleDelete = () => {
        dispatch( startDeleting(idNote) );
    };


    return (
        <div className="note__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={title}
                    name= "title"
                    onChange={handleInputChange}
                />

                <textarea placeholder="What happen today"
                    className="notes__textarea"
                    value={body}
                    name= "body"
                    onChange={handleInputChange}
                >

                </textarea>

                {
                    ( note.url ) &&
                    (<div className="notes__image">
                        <img src= { note.url }
                            alt="imagen"
                        />
                    </div>)
                }

            </div>

            <button className="btn btn-danger"
                onClick={ handleDelete }>
                Delete
            </button>


        </div>
    )
}
