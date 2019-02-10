export default (state = {text :'', category: null}, action) => {
    switch (action.type) {
        case 'SEARCH_TERM':
        return action.payload;
        default:
        return state;
    }
}