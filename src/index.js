import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import AppTemplate from './AppTemplate'

import 'semantic-ui-css/semantic.min.css'

ReactDOM.render(
    <BrowserRouter>
        <div>
          <AppTemplate />
        </div>
    </BrowserRouter>, document.getElementById('root')
)
