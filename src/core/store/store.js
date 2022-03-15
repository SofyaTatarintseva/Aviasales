import {applyMiddleware, compose, createStore} from 'redux';
const thunk = require('redux-thunk');

/**
 * Получение стора приложения.
 *
 * @param {Reducer} reducer Основной скомбинированный редьюсер приложения.
 */
export default function getStore(reducer) {
    /** Функция создания стора с нужными мидлварями. */
    const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;
    const store = compose(composeEnhancers(applyMiddleware(thunk)))(createStore);

    /** Создание стора для приложения. */
    return store(reducer);
}