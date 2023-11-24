import React, { useEffect, useRef} from 'react';
import Ticket from '../Ticket/ticket';
import classes from './ticketsList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { increaseTicketsCount } from '../Redux/actions';
import store from '../Redux/store';
import Loading from '../Loading/loading';
import { connect } from 'react-redux';



 function TicketsList(){
    const tickets = useSelector(store => store.tickets);
    const shownTicketsCount = useSelector(store => store.shownTicketsCount);
    const isLoaded = useSelector((store) => store.isLoaded);
    const filter = useSelector(store => store.filter);
    const transfers = useSelector(store => store.transfers);
    let filteredTickets = [];
    const dispatch = useDispatch();
    const priceSort = (a, b) => {
        return a.price - b.price;
    }
    const fastestSort = (a, b) => {
        return a.segments[0].duration - b.segments[0].duration || 
                a.segments[1].duration - b.segments[1].duration;
    }

    
    if(transfers.includes('all')){
        filteredTickets = tickets;
    }
    if(transfers.length === 0){
        filteredTickets = []
    }

    else{

        tickets.map((ticket) => {
            const transfers1 = `${ticket.segments[0].stops.length}`;
            const transfers2 = `${ticket.segments[1].stops.length}`;
            if( transfers.includes(transfers1) && 
                transfers.includes(transfers2) && 
                !filteredTickets.includes(ticket) ){
                    filteredTickets.push(ticket)
                }                         
        });
    }
    const ticketList = filteredTickets
                        .sort(filter === 'cheapest' ? priceSort : fastestSort)
                        .slice(0, shownTicketsCount)
                        .map( (ticket) => (
                            <Ticket key={`${ticket.price} ${ticket.carrier}`} ticket={ticket}/>
                        ))

    const showMore = () => {
        dispatch(increaseTicketsCount())
    }
    if(isLoaded){
        return(
            <div>
            <div className={classes['tickets-list']}>
                {ticketList}
            </div>
            <button className={classes.showMore} onClick={showMore}>ПОКАЗАТЬ ЕЩЁ 5 БИЛЕТОВ</button>
            </div>
        )
    }
    else{
        return(
            <div>
            <div className={classes['tickets-list']}>
              <Loading />
            </div>
            </div>
        )
    }


}




export default TicketsList;