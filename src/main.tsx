import { StrictMode } from 'react'
import { Toaster } from 'react-hot-toast'
import { createRoot } from 'react-dom/client'
import './index.css'
import { default as App } from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout.tsx'
import ProductDeatils from './pages/ProductDetils.tsx'
import { StateContext } from '../context/StateContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StateContext>
      <BrowserRouter>
        <Layout>
          <Toaster />
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/product/:slug' element={<ProductDeatils />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </StateContext>
  </StrictMode>
)
