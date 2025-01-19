import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const CreateQuestion = () => {
  let SL = 1;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);
  const [questions, setQuestions] = useState([]);
  const [types, setTypes] = useState([]);
  const [formData, setFormData] = useState({
    type: "general",
    title: "",
    options: ["", "", "", ""],
    correctAnswer: 1,
  });
  const [editId, setEditId] = useState(null);

  // Fetch all questions
  useEffect(() => {
    fetchQuestions();
    fetchTypes();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${backendUrl}/questions`);
      setQuestions(response.data);
    } catch (error) {
      toast.error("Error fetching questions:");
      console.error("Error fetching questions:", error.message);
    }
  };
  const fetchTypes = async () => {
    try {
      console.log(`${backendUrl}/quiz-types`)
      const response = await axios.get(`${backendUrl}/quiz-types`);
      setTypes(response.data.quizTypes);
      console.log(response.data.quizTypes)
    } catch (error) {
      toast.error("Error fetching questions:");
      console.error("Error fetching questions:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("option")) {
      const index = parseInt(name.split("-")[1]);
      const updatedOptions = [...formData.options];
      updatedOptions[index] = value;
      setFormData({ ...formData, options: updatedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${backendUrl}/questions/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(`${backendUrl}/questions`, formData);
      }

      fetchQuestions();
      setFormData({
        type: "general",
        title: "",
        options: ["", "", "", ""],
        correctAnswer: 1,
      });


      toast.success("Question saving successfull");
    } catch (error) {

      toast.error("Error saving question");
      console.error("Error saving question:", error.message);
    }
  };

  const handleEdit = (question) => {
    setEditId(question._id);
    setFormData(question);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}/questions/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-between w-full gap-4">
      <div className="  mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{editId ? "Edit" : "Create"} Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="type" className="block text-gray-700 font-medium">
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md"
            >
              {types?.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.type}
                </option>
              ))}


            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Options</label>
            {formData.options.map((option, index) => (
              <input
                key={index}
                name={`option-${index}`}
                value={option}
                onChange={handleChange}
                placeholder={`Option ${index + 1}`}
                className="w-full mt-2 p-2 border rounded-md"
                required
              />
            ))}
          </div>

          <div className="mb-4">
            <label htmlFor="correctAnswer" className="block text-gray-700 font-medium">
              Correct Answer (1-4)
            </label>
            <input
              id="correctAnswer"
              name="correctAnswer"
              type="number"
              value={formData.correctAnswer}
              onChange={handleChange}
              className="w-full mt-2 p-2 border rounded-md"
              min="1"
              max="4"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            {editId ? "Update Question" : "Create Question"}
          </button>
        </form>
      </div>

      <div className="mt-10   ">
        <h2 className="text-2xl font-bold mb-4">Latest Questions</h2>
        <ul className="space-y-4">
          {questions.slice(-6).map((question) => (
            <li
              key={question._id}
              className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg"> {SL++}. {question.title}</h3>
                <p className="text-gray-600">Type: {question.type}</p>
                <p className="text-gray-600">Options: {question.options.join(", ")}</p>
                <p className="text-gray-600">Correct Answer:  <span className="text-green-600"> {question.options[question.correctAnswer - 1]}</span>
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(question)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(question._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateQuestion;
