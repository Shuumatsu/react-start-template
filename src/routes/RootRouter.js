import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

export default () => (
    <BrowserRouter>
        <Route path='/'>
            <h1>hello world!!</h1>
        </Route>
    </BrowserRouter>
)
