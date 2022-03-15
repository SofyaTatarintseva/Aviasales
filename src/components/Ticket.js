import React, {useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import { TiketInfo } from './TiketInfo';
import { Tabs } from './Tabs';
import { LoadTickets } from './LoadTickets';

export function Ticket() {
    const checkedFilters = useSelector((state) => state.sortArrKeys);
    const activeTab = useSelector((state) => state.filtersTabs);
    const loadTickets = useSelector((state) => state.loadMore);
    const ticketsT = useSelector((state) => state.tickets);
    const[ sortingTickets, setSortingTickets ] = useState([]);

    useEffect(() => {
        let ticket = []
        if (checkedFilters.length !== 5 && checkedFilters.length !== 0) {
            checkedFilters.forEach((elem) => {
                Object.entries(ticketsT).forEach(([key, val]) => {
                    if (val.segments[0].stops.length === +elem && val.segments[1].stops.length === +elem) {
                        ticket.push(val)
                    }
                })
            })
            setSortingTickets(ticket.slice(0, loadTickets))
    
        } else {
            Object.entries(ticketsT).slice(0, loadTickets).forEach(([key, val]) => ticket.push(val))
            setSortingTickets(ticket)
        }
    }, [checkedFilters, loadTickets, ticketsT, activeTab])

    return (
        <div>
            <Tabs activeTab={activeTab} />
            <TiketInfo tikets={sortingTickets} />
            <LoadTickets />
        </div>

    );
}
