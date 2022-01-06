

/* Se encarga de la logica para subir imagenes a cloudinary */

export const fileUpload = async ( file ) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dxmq8s27l/upload'; // es la url de cloudinary --> https://cloudinary.com/console/c-0105305893e3cd8df7c3ce3fe8df4d
    const formData = new FormData(); //Los objetos FormData le permiten compilar un conjunto de pares clave/valor para enviar mediante XMLHttpRequest. son propios de javascript
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if(resp.ok) {
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error; 
    }  
}