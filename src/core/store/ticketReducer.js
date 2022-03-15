import * as actionType from './actionType'
import { Tab } from '../constants'
import { Load } from '../constants'

const aviaSalesInitial = {
    get state(){
        return {
            searchId: '',
            tickets: [],
            error:{},
            filterTransfer: {
                isAll: false,
                0: false,
                1: false,
                2: false,
                3: false,   
            },
            filtersTabs: Tab.CHEAP,
            sortArrKeys: [],
            loadMore: Load.MORE,
            flagStop: false,
        }
    } 
}

export const aviaSalesReducer = (prevState = aviaSalesInitial.state, action ) => {
    return {
        // Данные для получения билетов
        searchId: searchIdReducer(prevState.searchId, action),
        // Билеты
        tickets: ticketsReducer(prevState.tickets, action),
        // Фильтры пересадок
        filterTransfer: filterTransferReducer(prevState.filterTransfer, action),
        // Количество показываемых билетов
        loadMore: loadingMore(prevState.loadMore, action),
        // Выбранные фильтры пересадок
        sortArrKeys: sortingFilterTickets(prevState.sortArrKeys, action),
        // Фильтры состояния перелета
        filtersTabs: sortingTabsTickets(prevState.filtersTabs, action),
        //Ошибки
        error: getError(prevState.error, action)
    }

}
// Получение актуальных данных для Билетов
const ticketsReducer = (prevState, action) => {
    switch(action.type){
        case actionType.GET_TICKETS: {
            return prevState
        }
        case actionType.GET_TICKETS_SUCCESS: {
            return [ ...prevState, ...action.data]
        }
        case actionType.SET_TICKETS_SORTING_TABS: {
            return action.data
        }
        default:{
            return  prevState
        }
    }
}
// Получение данных для запроса на получение билета
const searchIdReducer = (prevState, action) => {
    switch(action.type){
        case actionType.GET_SEARCHID: {
            return prevState
        }
        case actionType.GET_SEARCHID_SUCCESS: {
            return action.data
        }
        default:{
            return prevState
        }
    }
}
// Получение данных для фильтров с пересадками
const filterTransferReducer = (prevState, action) => {
    switch(action.type){
        case actionType.SET_FILTER_TRANSFER_CHANGE: {
            return action.data
        }
        default: {
            return prevState
        }
    }
}
// Получение данных для дальнейшей фильтрациия по пересадками
const sortingFilterTickets = (prevState, action) => {
    switch(action.type){
        case actionType.SET_SORTING_FILTER_TRANSFER: {
           return action.data
        }
        default: {
            return prevState
        }
    }
}
// Получение данных для количества показываемых билетов
const loadingMore = (prevState, action) => {
    switch(action.type){
        case actionType.SET_LOADMORE_INCREMENT: {
            return action.data
        }
        case actionType.SET_LOADMORE: {
            return Load.MORE
        }
        default:{
            return prevState
        }
    }
}
// Получение данных для фильтров состояния перелета
const sortingTabsTickets = (prevState, action) => {
    switch(action.type){
        case actionType.SET_TABS: {
            return action.data
        }
        default:{
            return prevState
        }
    }
}
// Получение ошибки
const getError = (prevState, action) => {
    switch(action.type){
        case actionType.GET_FAIL: {
            return action.data
        }
        default:{
            return prevState
        }
    }
}