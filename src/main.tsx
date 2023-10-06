import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'
import router from './Router'

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={client}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
