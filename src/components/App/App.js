
import React, { useEffect } from 'react';
import classes from'./App.module.scss';
import TicketsList from '../TicketsList/ticketsList';
import Pagination from '../Pagination/pagination';
import Filter from '../Filter/filter';
import logo from './Logo.svg';
import { Provider } from 'react-redux';
import store from '../Redux/store'
import { useDispatch, useSelector } from 'react-redux';
import Api from '../API';
import { addTickets, setLoaded, stop } from '../Redux/actions';






function App() {
  const ticketsApi = new Api();

    async function getTickets() {
      try {
          console.log('here');
          const searchID = await ticketsApi.getSearchID();
          const ticketsData = await ticketsApi.getTickets(searchID);
          const tickets = ticketsData.tickets;
          store.dispatch(addTickets(tickets));
          store.dispatch(setLoaded(true));
          console.log(ticketsData);
          if(ticketsData.stop){
            store.dispatch(stop());
          }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getTickets()

   return(
    <Provider store={store}>
      <div className={classes.app}>
        <div className={classes.logo}>
          <img src={logo} alt='logo'></img>
        </div>
        <div className={classes.body}>
          <Filter />
          <div className={classes.main}>
            <Pagination />
            <TicketsList />
          </div>
        </div>
      </div>
    </Provider>
   )
}

export default App;
