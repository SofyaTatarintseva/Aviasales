import React  from 'react';
import { connect } from 'react-redux';
import { increment } from '../features/tickets/ticketsSlice';
  
class LoadTickets extends React.Component {      

render() {
    return (
        <div>
            <button className={'btn btn-active btn-active_text btn_load'} onClick={() => this.props.increment()}> Показать еще 5 билетов! </button>
        </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment())
    }
};
export default connect(null, mapDispatchToProps)(LoadTickets)