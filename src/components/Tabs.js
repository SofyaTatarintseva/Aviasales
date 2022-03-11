import React  from 'react';
import { connect } from 'react-redux';
import { changeTabs } from '../features/tickets/ticketsSlice';
import { Tab } from '../core/constants'

class Tabs extends React.Component {
    
  state = {
        cheap: 'tab_btn btn_left',
        fast: 'tab_btn',
        optimal: 'tab_btn btn_rigth',    
        active: ' tab_btn__active tab_btn__active_text'
    };

  getStyle = (name) => {
    if (this.props.activeTab === name) {
        return this.state[name] + this.state.active
    } else {
        return this.state[name] + ' text_header'
    }
  }
  setTabs = (event) => {
      this.props.changeTabs(event.target.name)
  }
  render() {
    return (
        <div className="tab">
        <button name={Tab.Cheap} onClick={this.setTabs} className={this.getStyle(Tab.Cheap)}> Самый дешевый </button>
        <button name={Tab.Fast} onClick={this.setTabs} className={this.getStyle(Tab.Fast)}> Самый быстрый </button>
        <button name={Tab.Optimal} onClick={this.setTabs} className={this.getStyle(Tab.Optimal)}> Оптимальный </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeTabs: (name) => dispatch(changeTabs(name))
    }
};
export default connect(null, mapDispatchToProps)(Tabs)