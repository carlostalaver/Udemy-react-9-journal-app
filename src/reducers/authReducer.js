
import { types } from "../types/types"

/* Recordar: los reducer son funciones puras

    el state sera un obj con esta estructura:
    {
        uid: 'asdfa43432rewer',
        name: 'Carlos'
    }
*/

/* Recordar que los reducer  recibe el state y action */
export const authReducer = (state = {}, action) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
            
        case types.logout:
            return {}

        default:
            return state;
    }

}