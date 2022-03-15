import React from 'react';
import { useSelector } from 'react-redux';
import { changeFiltersTransfer } from '../core/store/actions'
import { Filter } from '../core/constants'
import { useDispatch } from 'react-redux';

function  CheckedFilters(props) {
  return (
    <div className='filters_content'>
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

export function Filters () {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filterTransfer);

  function handleInputChange (event) {  
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    dispatch(changeFiltersTransfer({[name]: value}))
  }

  return (
    <div className="filters">
      <div className={'filters_header text_header'}> Количество пересадок </div>
      <CheckedFilters name={Filter.ISALL} checked={filters[Filter.ISALL]} label='Все' onChange={handleInputChange}/>
     
      <CheckedFilters name={Filter.ISZERO} checked={filters[Filter.ISZERO]} label='Без пересадок' onChange={handleInputChange}/>

      <CheckedFilters name={Filter.ISONE} checked={filters[Filter.ISONE]} label='1 пересадка' onChange={handleInputChange}/>

      <CheckedFilters name={Filter.ISTWO} checked={filters[Filter.ISTWO]} label='2 пересадки' onChange={handleInputChange}/>
    
      <CheckedFilters name={Filter.ISTHREE} checked={filters[Filter.ISTHREE]} label='3 пересадки' onChange={handleInputChange}/>
    </div>
  );
  
} 
