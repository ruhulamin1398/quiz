import React, { useState, useEffect } from "react";
import axios from "axios";

const AllQuestions = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  let SL = 1;
  const [activeTab, setActiveTab] = useState("general");
  const [questions, setQuestions] = useState([]);
  const [types, setTypes] = useState([]);

  // Fetch questions by type
  const fetchQuestions = async (type) => {
    try {
      const response = await axios.get(`${backendUrl}/questions/type/${type}`);
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error.message);
    }
  };

  const fetchTypes = async () => {
    try {
      console.log(`${backendUrl}/quiz-question-types`)
      const response = await axios.get(`${backendUrl}/quiz-question-types`);
      setTypes(response.data.quizTypes);
      console.log(response.data.quizTypes)
      setActiveTab(response.data.quizTypes[0].type);

    } catch (error) {
      toast.error("Error fetching questions:");
      console.error("Error fetching questions:", error.message);
    }
  };

  useEffect(() => {
    fetchQuestions(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchTypes();
  }, []);

  // const tabs = ["general", "easy", "islamic", "global"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-between min-w-full">
      <div className="w-full mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">All Questions</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          {types.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={`py-2 px-4 rounded-md ${activeTab === tab.type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
            >
              {tab.type}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div>
          {questions.length > 0 ? (
            <ul className="space-y-4">
              {questions.map((question) => (
                <li
                  key={question._id}
                  className="bg-gray-100 shadow-md rounded-lg p-4"
                >
                  <h3 className="font-bold text-lg">{SL++}. {question.title}</h3>
                  <p className="text-gray-600">Options: {question.options.join(", ")}</p>
                  <p className="text-gray-600">
                    Correct Answer:  <span className="text-green-600"> {question.options[question.correctAnswer - 1]}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No questions available for this type.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
