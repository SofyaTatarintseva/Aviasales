
import * as actionType from './actionType'
import axios from "axios";
import { Load } from '../constants';
import { Tab } from '../constants';



function sortingTicketsTab (tickets, filtersTab) {
    switch (filtersTab) {
        case Tab.CHEAP:
            return tickets.sort((a, b) => a.price - b.price)
        case Tab.FAST:
            return tickets.sort((a, b) => (a.segments[0].duration+ a.segments[1].duration) - (b.segments[0].duration+ b.segments[1].duration))      
        case Tab.OPTIMAL:  
            return tickets.sort((a, b) => b.price/(b.segments[0].duration+ b.segments[1].duration) - a.price/(a.segments[0].duration+ a.segments[1].duration))     
        default:
            return tickets.sort((a, b) => a.price - b.price)           
        }
}

function getFilterTransfer (filters, activeFilters) {
    let key = Object.keys(activeFilters)
    let value = Object.values(activeFilters)

    if(key[0] === 'isAll') {
        filters = Object.fromEntries(
        Object.entries(filters)
        .map(([ key, val ]) => [key, value[0]])
    );
    } else if (filters.isAll && key[0] !== 'isAll') {
        filters[key] = value[0]
        filters.isAll = false
    } else {
        filters[key] = value[0]
    }
    return {...filters}
}

function getKeys(filter) {
    let keys = []
    Object.entries(filter).map(([key, val]) => {
        if (val) {
            return keys.push(key)
        } else {
            return keys = keys.filter((el) => el !== keys)
        }
    })
    return keys
}

// Получаем searchId для запроса билетов
export const getSearchId = ()=>(dispatch) => {
    dispatch({ type: actionType.GET_SEARCHID })
    axios.get('https://front-test.beta.aviasales.ru/search').then(res => {
        dispatch({ type: actionType.GET_SEARCHID_SUCCESS, data: res.data.searchId })
    }).catch(error => { dispatch({ type: actionType.GET_FAIL, data: error }) })
}

// Получаем билеты и сортируем их в зависимости от фильтров
export const getTickets = (searchId)=>(dispatch, getState) => {
    dispatch({ type: actionType.GET_TICKETS })
    axios.get('https://front-test.beta.aviasales.ru/tickets', {params: {'searchId': searchId}}).then(res => {
            dispatch({ type: actionType.GET_TICKETS_SUCCESS, data: res.data.tickets })
            const tickets = [...getState().tickets]
            const filterTabs = getState().filtersTabs
            dispatch({ type: actionType.SET_TICKETS_SORTING_TABS, data: sortingTicketsTab(tickets, filterTabs)})
            if (!res.data.stop) {
                dispatch(getTickets(searchId));
            } 
    }).catch(err => { 
        if (err.response.status === 500) {
            dispatch(getTickets(searchId));
        } else {
            dispatch({ type: actionType.GET_FAIL, data: err })
        }
        
    })
}
// Устанавливает активные фильтры пересадок и фильтрует билеты в соотвествии с ними. Устанавливает список ключей выбранных фильтров
export const changeFiltersTransfer = (activeFilters) => (dispatch, getState) => {
    let filterTransfer = Object.assign({}, getState().filterTransfer)
    dispatch({ type: actionType.SET_FILTER_TRANSFER_CHANGE, data: getFilterTransfer(filterTransfer, activeFilters) })
    dispatch({ type: actionType.SET_SORTING_FILTER_TRANSFER, data: getKeys(filterTransfer) })
    dispatch({ type: actionType.SET_LOADMORE })
}

// Устанавливает активный Tab и фильтрует билеты в соотвествии с ним
export const setTabActive = (activeTabs) => (dispatch, getState) => {
    dispatch({ type: actionType.SET_TABS, data: activeTabs })
    const tickets = [...getState().tickets]
    const filterTabs = getState().filtersTabs
    dispatch({ type: actionType.SET_TICKETS_SORTING_TABS, data: sortingTicketsTab(tickets, filterTabs)})
}

// Увеличивает число показываемых билетов
export const loadMore = () => (dispatch, getState) => {
    let load = getState().loadMore
    load += Load.MORE
    dispatch({ type: actionType.SET_LOADMORE_INCREMENT , data: load})
}

