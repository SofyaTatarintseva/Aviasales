import React, { useState }  from 'react';
import { Tab } from '../core/constants'
import { setTabActive } from '../core/store/actions'
import { useDispatch } from 'react-redux';

export function Tabs (props) {
  const dispatch = useDispatch();
  
  const[ style ] = useState({
    cheap: 'tab_btn btn_left',
    fast: 'tab_btn',
    optimal: 'tab_btn btn_rigth',    
    active: ' tab_btn__active tab_btn__active_text'
  });
  
  function getStyle (name)  {
    if (props.activeTab === name) {
        return style[name] + style.active
    } else {
        return style[name] + ' text_header'
    }
  }
  function setTabs (event) {
    dispatch(setTabActive(event.target.name))
  }

    return (
        <div className="tab">
        <button name={Tab.CHEAP} onClick={setTabs} className={getStyle(Tab.CHEAP)}> Самый дешевый </button>
        <button name={Tab.FAST} onClick={setTabs} className={getStyle(Tab.FAST)}> Самый быстрый </button>
        <button name={Tab.OPTIMAL} onClick={setTabs} className={getStyle(Tab.OPTIMAL)}> Оптимальный </button>
      </div>
    );
  
}
