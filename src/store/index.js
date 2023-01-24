import { configureStore } from '@reduxjs/toolkit'
import requestDataSlice from './request-slice'

const store = configureStore({
  reducer: { requestdata: requestDataSlice },
})

export default store
