import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./main.scss"
import { UserAuth } from './Context/UserAuth.jsx'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import {Provider} from "react-redux"
import store from './store/store.js'

const queryClient=new QueryClient({
    defaultOptions:{
        queries:{
            staleTime:Infinity,
            refetchOnWindowFocus:false
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserAuth>
        <QueryClientProvider client={queryClient}>
        <Provider store={store}>
        <App/>
        </Provider>
        </QueryClientProvider>
    </UserAuth>
)
