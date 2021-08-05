

export const types = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    // types para el reducer uiReducer
    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    // types para manejar el loading
    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    // type para la gestion de notas
    notesAddNew:  '[Notes] New note',
    notesActive:  '[Notes] Set active note',
    notesLoad:    '[Notes] Load notes',
    notesUpdated: '[Notes] Update note',
    notesFileUrl: '[Notes] Update image url',
    notesDelete:  '[Notes] Delete note',
    notesLogoutCleaning: '[Notes] Logout cleaning'

}