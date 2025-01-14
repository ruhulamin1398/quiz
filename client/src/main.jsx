import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout.jsx';
import SideMenu from './components/sideMenu.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "question",
        element: <App />, 
      },  
    ],
  },  
]);

createRoot(document.getElementById('root')).render(
 
 
<React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
 
 
)
