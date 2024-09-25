import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './Providers/AuthProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routeses/Routes.jsx'
import { Toaster } from 'react-hot-toast'



const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>
 
      <AuthProvider>
        <RouterProvider router={router}>

        </RouterProvider>
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </QueryClientProvider>
  </StrictMode>,
)
