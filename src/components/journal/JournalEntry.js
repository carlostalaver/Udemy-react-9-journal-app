import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">
            <div
                className="journal__entry-picture"
                style= {{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.meteorologiaenred.com%2Fwp-content%2Fuploads%2F2017%2F01%2Fcielo-830x466.jpg&imgrefurl=https%3A%2F%2Fwww.meteorologiaenred.com%2Fcielo-estrellado.html&tbnid=GAGtGE0PRta_wM&vet=12ahUKEwiF46CV74jxAhXRipUCHdolAEoQMygCegUIARDQAQ..i&docid=Sn4_GjhKWPIU3M&w=830&h=466&q=imagenes%20cielo%20nocturno&hl=es&ved=2ahUKEwiF46CV74jxAhXRipUCHdolAEoQMygCegUIARDQAQ)'
                }}
            >

            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>
                <p className="journal__entry-content">
                   este es el contenidao de un parrafo 
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>21</h4>
            </div>
        </div>
    )
}
