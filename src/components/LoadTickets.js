import React  from 'react';
import {loadMore} from '../core/store/actions'
import { useDispatch } from 'react-redux';

export function LoadTickets () {      
    const dispatch = useDispatch();

    function load () {
        dispatch(loadMore())
    }
    return (
        <div>
            <button className={'btn btn-active btn-active_text btn_load'} onClick={load}> Показать еще 5 билетов! </button>
        </div>
        );
}