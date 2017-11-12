import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import RootRouter from './routes/RootRouter'

const store = configureStore()

const render = () => ReactDOM.render((
    <Provider store={store}>
        <RootRouter />
    </Provider>
), document.querySelector('#root'))

render()
