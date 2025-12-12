import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/productsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.createdAt', 'payload.updatedAt'],
          // Ignore these paths in the state
          ignoredPaths: ['products.items', 'products.filteredItems'],
        },
      }),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
