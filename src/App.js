import './style.scss';
import { Filters } from './components/Filters';
import React , { useEffect }from 'react';
import { Ticket } from './components/Ticket';
import { getSearchId} from './core/store/actions'
import { getTickets } from './core/store/actions'
import { useDispatch, useSelector } from 'react-redux';

export function App () {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.searchId)

  useEffect(() => {
    dispatch(getSearchId());
  }, [])
  
  useEffect(() => {
      dispatch(getTickets(searchId));
  })

    return (
      <div className="app">
        <header className="app-header">
          <img src='logo.png' alt='logo' className="app-logo"/>
        </header>
        <div className="info">
          <Filters />
          <div className='info_left-content'>
            <Ticket />
          </div>
        </div>
      </div>
    );

}

