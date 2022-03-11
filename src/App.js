//import './App.css';
import './style.scss';
import Filters from './components/Filters';
import React from 'react';
import { Ticket } from './features/tickets/Ticket';
import { connect } from 'react-redux';
import { getSearchID, getTickets } from '../src/features/tickets/ticketsSlice'



class App extends React.Component {

  async componentDidMount() {
    let search = await this.props.getSearchID()
    await this.props.getTickets(search)  
  }
  render() {
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchID: () => dispatch(getSearchID()),
    getTickets: (serchId) => dispatch(getTickets(serchId))
  }
};
const mapStateToProps = (state) => {
  return { flagStop: state.tickets.flagStop }
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
