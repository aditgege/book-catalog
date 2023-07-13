import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { SWRConfig } from 'swr'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SWRConfig>
      <App />
    </SWRConfig>
  </React.StrictMode>,
)
