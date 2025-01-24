import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layout.jsx';
import CreateQuestion from './pages/quiz/createQuestion.jsx';
import AllQuestions from './pages/quiz/allQuestions.jsx';
import QuizTypes from './pages/quiz/quizTypes.jsx';
import CreateQuiz from './pages/quiz/createQuiz.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "quiz-types",
        element: <QuizTypes />,
      },
      {
        path: "questions",
        element: <AllQuestions />,
      }, {
        path: "create-question",
        element: <CreateQuestion />,
      }, {
        path: "create-quiz",
        element: <CreateQuiz />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(


  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>


)
