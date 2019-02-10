export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_CATEGORY':
        // if (!action.payload) return state;
        return action.payload;
        default:
        return state;
    }
}