import React, {useState} from 'react';
import classes from './pagination.module.scss';
import { connect, useDispatch, useSelector } from 'react-redux';
import { filter, setLoaded } from '../Redux/actions';


function Pagination(){
    const dispatch = useDispatch();
    const select = useSelector(state => state.filter);
    const changeSelected = (event) => {
        dispatch(setLoaded(false));

        if(event.target.name === 'cheapest' && select !== 'cheapest'){
            dispatch(filter('cheapest'));
        }
        if(event.target.name === 'fastest' && select !== 'fastest'){
            dispatch(filter('fastest'));
        }
        setTimeout(() => {
            dispatch(setLoaded(true));
          }, 300);
    }
    return(
        <div className={classes.pagination}>
            <button 
                name='cheapest'
                className={select === 'cheapest' ? `${classes.active} ${classes.cheapest}`  : `${classes.btn} ${classes.cheapest}` }
                onClick={changeSelected}
            >
                САМЫЙ ДЕШЕВЫЙ
            </button>
            <button 
                name='fastest'
                className={select === 'fastest' ? `${classes.active} ${classes.fastest}` : `${classes.fastest} ${classes.btn}`}
                onClick={changeSelected}>
                САМЫЙ БЫСТРЫЙ
            </button>
        </div>
    )
    
}

export default Pagination;
