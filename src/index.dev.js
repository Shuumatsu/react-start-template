import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader' // AppContainer is a necessary wrapper component for HMR
import configureStore from './store/configureStore'
import RootRouter from './routes/RootRouter'
import DevTools from './DevTools'

const store = configureStore()

const render = () => ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <div>
        <RootRouter />
        <DevTools />
      </div>
    </Provider>
  </AppContainer>
), document.querySelector('#root'))


render()

// Hot Module Replacement API
if (module.hot)
  module.hot.accept('./routes/RootRouter', render)
