import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { default as App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
    </BrowserRouter>
  </StrictMode>,
)
