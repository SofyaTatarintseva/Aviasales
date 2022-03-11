import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { Tab } from '../../core/constants'
import { Load } from '../../core/constants'

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    arrTickets: [],
    filterTransfer: {
        isAll: false,
        0: false,
        1: false,
        2: false,
        3: false,   
    },
    filtersTabs: Tab.Cheap,
    sortArrKeys: [],
    searchId: '',
    loadMore: Load.More,
    flagStop: false,
  },
  reducers: {
    increment: (state) => {
        state.loadMore += Load.More
      },
    getAllTickets: (state, action) => {
      state.arrTickets.push(...action.payload)
    },
    sortingTickets: (state) => {
        switch (state.filtersTabs) {
            case Tab.Cheap:
                state.arrTickets.sort((a, b) => a.price - b.price)
                break
            case Tab.Fast:
                 state.arrTickets.sort((a, b) => (a.segments[0].duration+ a.segments[1].duration) - (b.segments[0].duration+ b.segments[1].duration))
                 break
            case Tab.Optimal:        
                state.arrTickets.sort((a, b) => b.price/(b.segments[0].duration+ b.segments[1].duration) - a.price/(a.segments[0].duration+ a.segments[1].duration))
                break
            default:
                state.arrTickets.sort((a, b) => a.price - b.price)
                break
          }
      },

    sortingFilter: (state) => {
        let keys = []
        Object.entries(state.filterTransfer).map(([key, val]) => {
            if (val) {
                return keys.push(key)
            } else {
                return keys = keys.filter((el) => el !== keys)
            }
        })
        state.sortArrKeys = keys 
        state.loadMore = Load.More
    },
    activeFilterTabs: (state, action) => {
        state.filtersTabs = action.payload  
    },
    setSearchId: (state, action) => {
        state.searchId = action.payload  
    },
    stopingLoadTicket: (state) => {
        state.flagStop = true 
    },
    changeFiltersTransfer: (state, action) => {
        let key = Object.keys(action.payload)
        let value = Object.values(action.payload)

        if(key[0] === 'isAll') {
            state.filterTransfer = Object.fromEntries(
            Object.entries(state.filterTransfer)
            .map(([ key, val ]) => [key, value[0]])
          );
        } else if (state.filterTransfer.isAll && state.filterTransfer[key] !== 'isAll') {
            state.filterTransfer[key] = value[0]
            state.filterTransfer.isAll = false
        } else {
            state.filterTransfer[key] = value[0]
        }
          
    }
  }
})

export const {getAllTickets, activeFilterTabs, changeFiltersTransfer, sortingTickets, sortingFilter, setSearchId, increment, stopingLoadTicket } = ticketsSlice.actions
export const getSearchID =  () => (dispatch) => {
 return axios.get('https://front-test.beta.aviasales.ru/search').then(res => {
        dispatch(setSearchId(res.data.searchId));
        return res.data.searchId
    })
  }
export const getTickets = (searchId) => (dispatch) => {
    axios.get('https://front-test.beta.aviasales.ru/tickets', {params: {'searchId': searchId}}).then(res => {
        dispatch(getAllTickets(res.data.tickets))
        dispatch(sortingTickets())
        if (res.data.stop === false ) {
             getTickets(searchId);
        } else {
            dispatch(stopingLoadTicket())
        }
    }).catch((e) => getTickets(searchId))
}
export const changeTabs = (activeTabs) => (dispatch) => {
      dispatch(activeFilterTabs(activeTabs))
      dispatch(sortingTickets())
  }
export const changeFilters = (activeFilters) => (dispatch) => {
    dispatch(changeFiltersTransfer(activeFilters))
    dispatch(sortingFilter())
}
export const selectTickets = (state) => state.tickets.arrTickets
export const isActiveTabs = (state) => state.tickets.filtersTabs
export const loadTicketsCount = (state) => state.tickets.loadMore
export const checkedFiltersTransfer = (state) => state.tickets.sortArrKeys
export default ticketsSlice.reducer