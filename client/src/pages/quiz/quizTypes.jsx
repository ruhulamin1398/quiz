import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const QuizTypes = () => {
    let SL = 1; // Serial Number
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [quizTypes, setQuizTypes] = useState([]);
    const [formData, setFormData] = useState({
        type: "",
        description: "",
    });
    const [editId, setEditId] = useState(null);

    // Fetch all quiz types
    useEffect(() => {
        fetchQuizTypes();
    }, []);

    const fetchQuizTypes = async () => {
        try {
            const response = await axios.get(`${backendUrl}/quiz-question-types`);
            setQuizTypes(response.data.quizTypes || []);
        } catch (error) {
            toast.error("Error fetching quiz types.");
            console.error("Error fetching quiz types:", error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${backendUrl}/quiz-question-types/${editId}`, formData);

                toast.success("Quiz saved successfully.");
                setEditId(null);
            } else {
                await axios.post(`${backendUrl}/quiz-question-types`, formData);
                toast.success("Quiz saved successfully.");
            }

            fetchQuizTypes();
            setFormData({ type: "", description: "" });

            toast.success("Quiz type saved successfully.");
        } catch (error) {
            toast.error("Error saving quiz type.");
            console.error("Error saving quiz type:", error.message);
        }
    };

    const handleEdit = (quizType) => {
        setEditId(quizType._id);
        setFormData({ type: quizType.type, description: quizType.description });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/quiz-question-types/${id}`);
            toast.success("Quiz type deleted successfully.");
            fetchQuizTypes();
        } catch (error) {
            toast.error("Error deleting quiz type.");
            console.error("Error deleting quiz type:", error.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-between w-full gap-4">
            <div className="mx-auto w-full bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{editId ? "Edit" : "Create"} Quiz Type</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 font-medium">
                            Type
                        </label>
                        <input
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="Enter quiz type"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                            placeholder="Enter description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {editId ? "Update Quiz Type" : "Create Quiz Type"}
                    </button>
                </form>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Latest Quiz Types</h2>
                <ul className="space-y-4">
                    {quizTypes.slice(-10).map((quizType) => (
                        <li
                            key={quizType._id}
                            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold text-lg">
                                    {SL++}. {quizType.type}
                                </h3>
                                <p className="text-gray-600">Description: {quizType.description}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleEdit(quizType)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(quizType._id)}
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

export default QuizTypes;
