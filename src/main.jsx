import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Auth0Provider} from "@auth0/auth0-react"
import {BrowserRouter} from "react-router-dom"

const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
const clientId =import.meta.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = import.meta.env.REACT_APP_AUTH0_AUDIENCE;

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Auth0Provider
  
  domain={domain}
  clientId={clientId}
  authorizationParams={{
    redirect_uri: window.location.origin,
    audience: audience,
  }}
  
    >
   <BrowserRouter >
       <App />
       </BrowserRouter>
  </Auth0Provider>
   
  // </React.StrictMode>,
)
