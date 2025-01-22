'use client'
import React from 'react'
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { useState } from 'react';
function Provider({children}) {
    const  [queryClient]=useState(()=>new QueryClient() ) ;
    return (
    <QueryClientProvider client={queryClient} >
     <div className="h-[96vh]">{children}</div>
    </QueryClientProvider>
  )
}

export default Provider