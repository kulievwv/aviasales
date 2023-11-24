const defaultState = {
    filter: 'cheapest',
    transfers: ['0'],
    shownTicketsCount: 5,
    isLoaded: false,
    isStop: false,
    tickets: [],
    
}
const reducer = (state = defaultState, action) => {
    switch(action.type){
        case 'TOGGLE_FILTER': 
            return {
                ...state,
                filter: action.filter
            }
        case 'SET_TRANSFERS':
            return{
                ...state,
                transfers: [...action.transfers]
            }
        case 'ADD_TICKETS':
            return {
                ...state,
                tickets: [ ...action.tickets]
            }
        case 'INCREASE_SHOWN_TICKETS':
            return{
                ...state,
                shownTicketsCount: state.shownTicketsCount + 5
            }
        case 'SET_LOADED':
            return{
                ...state,
                isLoaded: action.isLoaded
            }
        case 'SET_STOP':
            return{
                ...state,
                isStop: true
            }
        default:
            return state;

    }
}

export default reducer;