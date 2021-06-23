import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScren = () => {
    return (
        <div className="note__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input  type="text" placeholder="Some awesome title"  className="notes__title-input" autocomplete="off"/>

                <textarea placeholder="What happen today" className="notes__textarea">

                </textarea>

                <div className="notes__image">
                    <img src="https://www.hazunaweb.com/imagenes/prueba.jpg"
                         alt="imagen"
                    />
                </div>

            </div>


        </div>
    )
}
