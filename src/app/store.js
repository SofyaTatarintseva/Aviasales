// import { configureStore } from '@reduxjs/toolkit'
// import ticketsReducer from '../features/tickets/ticketsSlice'


// export default configureStore({
//   reducer: {
//     tickets: ticketsReducer
//   }
// })
import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../features/tickets/ticketsSlice'



export const store = configureStore({
  reducer: {
    tickets: ticketsReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
      thunk: true,
    })
  },
});