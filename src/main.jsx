import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Providers/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routeses/Routes.jsx'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css'; 


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}>

        </RouterProvider>
      </AuthProvider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>,
)
