import React, { PureComponent } from 'react'

import { StoreContext } from '.'
import { TStoreContent, TStoreContext, TTransaction } from './types'

class StoreProvider extends PureComponent {
  state: TStoreContext = {
    store : {
      allTransactionIds: [],
      allTransactions: {}
    },
    setStore: (store: TStoreContent) => {
      this.setState({
        store
      })
    }
  }

  public render(): JSX.Element {
    const {
      children
    } = this.props

    return (
      <StoreContext.Provider value={this.state}>
        {children}
      </StoreContext.Provider>
    )
  }
}

export {
  StoreProvider
}
