import React from 'react'
import { useSelector } from 'react-redux';
import { NoteScren } from '../notes/NoteScren'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'

export const JournalScreen = () => {

    const { active } = useSelector(state => state.notes);// de todos los state de la app retornará el state notes

    return (
        <div className="journal__main-container animate__animated animate__fadeIn animate__faster">
           <Sidebar />

           <main >
                { 
                    (active) 
                        ?   <NoteScren />
                        :   <NothingSelected /> 
                }
           </main>
        </div>
    )
}
