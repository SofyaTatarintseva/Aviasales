import React from 'react';
import { connect } from 'react-redux';
import { changeFilters } from '../features/tickets/ticketsSlice';

function  CheckedFilters(props) {
  return (
    <div className="checked-filters">
      <label className='text_filter'>
        <input
                name={props.name}
                type="checkbox"
                className='custom-checkbox'
                checked={props.checked}
                onChange={props.onChange} />
        {props.label}
      </label>
    </div>
  );
} 
class Filters extends React.Component {

  handleInputChange = (event) => {  
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    this.props.changeFilters({[name]: value})
      
  }

  render() {
    return (
      <div className="filters">
        <div className={'filters_header text_header'}> Количество пересадок </div>
        <CheckedFilters name='isAll' checked={this.props.filters.isAll} label='Все' onChange={this.handleInputChange}/>
        <br />
        <CheckedFilters name='0' checked={this.props.filters[0]} label='Без пересадок' onChange={this.handleInputChange}/>
        <br />
        <CheckedFilters name='1' checked={this.props.filters[1]} label='1 пересадка' onChange={this.handleInputChange}/>
        <br />
        <CheckedFilters name='2' checked={this.props.filters[2]} label='2 пересадки' onChange={this.handleInputChange}/>
        <br />
        <CheckedFilters name='3' checked={this.props.filters[3]} label='3 пересадки' onChange={this.handleInputChange}/>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
    return {
      changeFilters: (name) => dispatch(changeFilters(name))
    }
};
const mapStateToProps = (state) => {
  return { filters: state.tickets.filterTransfer }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filters)