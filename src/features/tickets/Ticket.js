import React from 'react';
import { useSelector } from 'react-redux';
// import {Oval} from 'react-loader-spinner';
import TiketInfo from '../../components/TiketInfo';
import {
    selectTickets,
    isActiveTabs,
    checkedFiltersTransfer,
    loadTicketsCount,
  } from './ticketsSlice';
import Tabs from '../../components/Tabs';
import LoadTickets from '../../components/LoadTickets';

  export function Ticket() {
    
    const ticketsT = useSelector(selectTickets);
    const checkedFilters = useSelector(checkedFiltersTransfer);
    const activeTab = useSelector(isActiveTabs);
    const loadTickets = useSelector(loadTicketsCount);
    let sortingArr = []

    

    if ( checkedFilters.length !== 5 && checkedFilters.length !== 0  ) {
        checkedFilters.forEach((elem) => {
                Object.entries(ticketsT).forEach(([key, val]) => {
                    if (val.segments[0].stops.length === +elem && val.segments[1].stops.length === +elem) {
                        sortingArr.push(val)
                    }
                })
            })
          
        sortingArr = sortingArr.slice(0, loadTickets)
    } else {
        Object.entries(ticketsT).slice(0, loadTickets).forEach(([key, val]) => sortingArr.push(val))
    }
      return (
          <div>
           <Tabs activeTab={activeTab}/>
           <TiketInfo tikets={sortingArr} />
           <LoadTickets />
          </div>
          
      );
  }
  