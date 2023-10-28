import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryQlient = new QueryClient()

export const QueryProvider = ({children} : {children: React.ReactNode}) => {
  return (
   <QueryClientProvider client={queryQlient}>
    {children}
   </QueryClientProvider>
  )
}

export default QueryProvider
