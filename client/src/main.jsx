import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout.jsx';
import SideMenu from './components/sideMenu.jsx';
import CreateQuestion from './pages/createQuestion.jsx';
import AllQuestions from './pages/AllQuestions.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "questions",
        element: <AllQuestions />, 
      }, {
        path: "create-question",
        element: <CreateQuestion />, 
      },  
    ],
  },  
]);

createRoot(document.getElementById('root')).render(
 
 
<React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
 
 
)
