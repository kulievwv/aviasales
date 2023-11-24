import React from 'react';
import classes from './ticket.module.scss';
import { add, format } from 'date-fns';


export default function Ticket(props){
  

  const price = `${Math.floor(props.ticket.price / 1000)} `+`${props.ticket.price}`.slice(-3);
  const firstPart = props.ticket.segments[0];
  const secondPart = props.ticket.segments[1];
  const direction1 = `${firstPart.origin} - ${firstPart.destination}`;
  const direction2 = `${secondPart.origin} - ${secondPart.destination}`;
  const logoSrc = `https://pics.avs.io/99/36/${props.ticket.carrier}.png`;
  function formatTime(dateTimeString) {
    const date = new Date(dateTimeString)
    const hours = date.getUTCHours()
    const minutes = date.getUTCMinutes()
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      return formattedTime
  }

   function getDate(dateTimeString, duration) {
    const date = new Date(dateTimeString)
    const hours = date.getUTCHours() + Math.floor(duration / 60)
    const minutes = date.getUTCMinutes() + (duration % 60)
  
    let adjustedHours = hours
    let adjustedMinutes = minutes
  
    if (adjustedMinutes >= 60) {
      adjustedHours += 1
      adjustedMinutes -= 60
    }
  
    if (adjustedHours >= 24) {
      adjustedHours -= 24
    }
  
    const formattedTime = `${adjustedHours.toString().padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`
      return formattedTime
  }
  const time1 = `${formatTime(firstPart.date)} - ${getDate(firstPart.date, firstPart.duration)}`;
  const time2 = `${formatTime(secondPart.date)} - ${getDate(secondPart.date, secondPart.duration)}`;
  const stops1 = firstPart.stops.join(', ');; 
  const stops2 = secondPart.stops.join(', ');; 
  const duration1 = `${Math.floor(firstPart.duration/60)}ч ${Math.floor(firstPart.duration)%60}м`;
  const duration2 = `${Math.floor(secondPart.duration/60)}ч ${Math.floor(secondPart.duration)%60}м`;
    return(
        
        <div className={classes.ticket}>
          <div className={classes['ticket-header']}>
            <div className={classes["ticket-price"]}>{price} Р</div>
            <img src={logoSrc} alt="company logo" className={classes["ticket-logo"]} />
          </div>
          <div className={classes["ticket-body"]}>
            <div className={classes["ticket-description"]}>
              <div className={classes["ticket-time"]}>
                <div className={classes["description-header"]}>{direction1}</div>
                <div className={classes["description-value"]}>{time1}</div>
              </div>
              <div className={classes["ticket-duration"]}>
                <div className={classes["description-header"]}>В ПУТИ</div>
                <div className={classes["description-value"]}>{duration1}</div>
              </div>
              <div className={classes["ticket-transfers"]}>
                <div className={classes["description-header"]}>{firstPart.stops.length === 0
                                                                      ? 'ПРЯМОЙ РЕЙС'
                                                                      : firstPart.stops.length === 1
                                                                      ? '1 ПЕРЕСАДКА'
                                                                      : `${firstPart.stops.length} ПЕРЕСАДКИ`}</div>
                <div className={classes["description-value"]}>{stops1}</div>
              </div>
            </div>
            <div className={classes["ticket-description"]}>
              <div className={classes["ticket-time"]}>
                <div className={classes["description-header"]}>{direction2}</div>
                <div className={classes["description-value"]}>{time2}</div>
              </div>
              <div className={classes["ticket-duration"]}>
                <div className={classes["description-header"]}>В ПУТИ</div>
                <div className={classes["description-value"]}>{duration2}</div>
              </div>
              <div className={classes["ticket-transfers"]}>
                <div className={classes["description-header"]}>{secondPart.stops.length === 0
                                                                      ? 'ПРЯМОЙ РЕЙС'
                                                                      : secondPart.stops.length === 1
                                                                      ? 'ОДНА ПЕРЕСАДКА'
                                                                      : `${secondPart.stops.length} ПЕРЕСАДКИ`}</div>
                <div className={classes["description-value"]}>{stops2}</div>
              </div>
            </div>
          </div>
        </div>
    )
}