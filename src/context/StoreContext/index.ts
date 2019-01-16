import React from 'react'

import { StoreProvider } from './StoreProvider'
import { TStoreContext } from './types'

const StoreContext = React.createContext<TStoreContext>({
  store: {
    allTransactionIds: [],
    allTransactions: {}
  },
  setStore: () => {}
})

export {
  StoreContext,
  StoreProvider
}
