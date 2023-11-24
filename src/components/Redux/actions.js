export const filter = (filter) => {
    return {type: 'TOGGLE_FILTER', filter}
}

export const checkbox = (transfers) => {
    return {type: 'SET_TRANSFERS', transfers}
}

export const addTickets =  (tickets) => {
    return {type: 'ADD_TICKETS', tickets}
}

export const increaseTicketsCount = () => {
    return {type: 'INCREASE_SHOWN_TICKETS'}
}

export const setLoaded = (isLoaded) => {
    return {type: 'SET_LOADED', isLoaded}
}

export const stop = () => {
    return {type: 'SET_STOP'}
}