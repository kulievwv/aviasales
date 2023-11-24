
import store from "./Redux/store";
import { addTickets } from "./Redux/actions";
const {dispatch} = store;



 class Api{
    constructor(){
        this.url = 'https://aviasales-test-api.kata.academy/';
    }
    async getSearchID () {
        const searchUrl = `${this.url}search`;
        const searchID = await fetch(searchUrl)
                                .then(response => response.json())
                                .then(data =>{
                                    return(data.searchId);
                                })
                                .catch(error => console.error('Error:', error));
        return searchID;
    }


    async getTickets (searchID){
        const ticketsUrl = `${this.url}tickets?searchId=${searchID}`;
        const tickets = await fetch(ticketsUrl)
                                .then(response => response.json())
                                .then(data => {
                                    return data;
                                })
                                .catch(error => console.error('Error:', error));
        return tickets;
    }
}


export default Api;





