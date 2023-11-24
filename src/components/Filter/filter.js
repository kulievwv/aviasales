import React, {useState} from 'react';
import classes from './filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { checkbox, setLoaded } from '../Redux/actions';

export default function Checkbox() {


    const disp = useDispatch();
    const dispatch = (data) =>{
        disp(checkbox(data))
    } 
    const transfers = useSelector(state => state.transfers);
    
    const handleClick = (event) =>{
        disp(setLoaded(false));
        const id = event.target.id;
        let newTransfers = [];
        if(id === 'all'){
            if(transfers.length < 5){
                newTransfers = ['all', '0', '1', '2', '3']
            }
            else{
                newTransfers = ['0']
            }
        }
        else{
            if(transfers.includes(id)){
                 newTransfers = transfers.filter(item => item !== id );
            }
            else{
                 newTransfers = [...transfers, id];
            }
            if(newTransfers.length === 4 && !newTransfers.includes('all')){
                newTransfers = ['all', '0', '1', '2', '3']
            }
            else if(newTransfers.length < 5 && newTransfers.includes('all'))
            {
                newTransfers = newTransfers.filter(item => item !== 'all');
            }    
        }
        dispatch(newTransfers)
        setTimeout(() =>{
            disp(setLoaded(true))
        }, 300)
    }



    return (
        <div className={classes.filters}>
            <div className={classes.header}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>
            
            <input id="all" type="checkbox" checked={transfers.includes('all')} onChange={handleClick} />
            <label htmlFor="all">Все</label>

            <input id="0" type="checkbox" checked={transfers.includes('0')} onChange={handleClick} />
            <label htmlFor="0">Без пересадок</label>

            <input id="1" type="checkbox" checked={transfers.includes('1')} onChange={handleClick} />
            <label htmlFor="1">1 пересадка</label>

            <input id="2" type="checkbox" checked={transfers.includes('2')} onChange={handleClick} />
            <label htmlFor="2">2 пересадки</label>

            <input id="3" type="checkbox" checked={transfers.includes('3')} onChange={handleClick} />
            <label htmlFor="3">3 пересадки</label>
        </div>
    )
}
