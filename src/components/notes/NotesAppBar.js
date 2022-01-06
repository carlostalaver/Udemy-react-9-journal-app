import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {

    const { active: note } = useSelector(state => state.notes);
    const dispatch = useDispatch();
 
    const handleSave = () => {
        dispatch( startSaveNote(note) );
    };

    const handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]; // verifico si hay un archivo cargado
        if( file ) {
            dispatch( startUploading( file ) );
        }
    };

    return (
        <div className="notes__appbar">
            <span> 08 de junio 2021</span>

            {/* Lo oculto para que no se vea en la interfaz */}
            <input
                id= "fileSelector"
                type="file"
                name = "file"
                style = {{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button className="btn"
                    onClick = { handlePictureClick }>
                    Picture
                </button>

                <button className="btn"
                    onClick= { handleSave }>
                    Save
                </button>
            </div>
        </div>
    )
}
