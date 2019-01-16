import React, { PureComponent } from 'react'

import { StoreProvider } from './context/StoreContext'
import { Home } from './pages/Home'

class App extends PureComponent {
  componentDidMount() {
  }

  public render(): JSX.Element {
    return (
      <StoreProvider>
        <Home />
      </StoreProvider>
    )
  }
}

export {
  App
}
