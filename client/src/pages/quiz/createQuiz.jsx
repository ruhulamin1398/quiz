import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialPrizes = [
    { label: "1st", total_person: 0, amount: 0 },
    { label: "2nd", total_person: 0, amount: 0 },
    { label: "3rd", total_person: 0, amount: 0 },
    { label: "4th", total_person: 0, amount: 0 },
    { label: "5th", total_person: 0, amount: 0 },
];

const CreateQuiz = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [quizzes, setQuizzes] = useState([]);
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({
        quizType: "general",
        round: 1,
        entryFees: 0,
        totalQuestions: 0,
        questionTypes: [],
        maxParticipants: 0,
        prizes: initialPrizes,
    });
    const [editId, setEditId] = useState(null);

    const fetchTypes = async () => {
        try {
            console.log(`${backendUrl}/question-types`)
            const response = await axios.get(`${backendUrl}/quiz-question-types`);
            const quizTypes = response.data.quizTypes || [];
            setTypes(quizTypes);

            const questionTypes = quizTypes.map((type) => ({ type: type.type, count: 0 }));
            setFormData((prevData) => ({ ...prevData, questionTypes }));
        } catch (error) {
            toast.error("Error fetching question types");
            console.error("Error fetching question types:", error.message);
        }
    };

    const fetchQuizzes = async () => {
        try {
            console.log(`${backendUrl}/quizzes`)
            const response = await axios.get(`${backendUrl}/quizzes`);
            setQuizzes(response.data || []);
        } catch (error) {
            toast.error("Error fetching quizzes");
            console.error("Error fetching quizzes:", error.message);
        }
    };

    useEffect(() => {
        fetchTypes();
        fetchQuizzes();
    }, []);


    useEffect(() => {
        console.log("quizzes  ", quizzes);
    }, [quizzes])
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData };

        if (name.startsWith("questionTypes")) {
            const [_, index, field] = name.split("-");
            updatedFormData.questionTypes[parseInt(index)][field] = field === "count" ? parseInt(value) : value;
            updatedFormData.totalQuestions = updatedFormData.questionTypes.reduce(
                (acc, curr) => acc + (parseInt(curr.count) || 0),
                0
            );
        } else if (name.startsWith("prizes")) {
            const [_, index, field] = name.split("-");
            updatedFormData.prizes[parseInt(index)][field === "count" ? "total_person" : field] = parseInt(value) || value;
        } else {
            updatedFormData[name] = value;
        }

        setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = editId ? `${backendUrl}/quizzes/${editId}` : `${backendUrl}/quizzes`;
            const method = editId ? "put" : "post";
            console.log(formData)
            await axios[method](apiUrl, formData);
            toast.success(editId ? "Quiz updated successfully!" : "Quiz created successfully!");

            setFormData({
                quizType: "general",
                round: 1,
                entryFees: 0,
                totalQuestions: 0,
                questionTypes: types.map((type) => ({ type: type.type, count: 0 })),
                maxParticipants: 0,
                prizes: initialPrizes,
            });

            setEditId(null);
            fetchQuizzes();
        } catch (error) {
            toast.error("Error saving quiz");
            console.error("Error saving quiz:", error.message);
        }
    };

    const handleEdit = (quiz) => {
        setEditId(quiz._id);
        setFormData(quiz);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${backendUrl}/quizzes/${id}`);
            fetchQuizzes();
            toast.success("Quiz deleted successfully!");
        } catch (error) {
            toast.error("Error deleting quiz");
            console.error("Error deleting quiz:", error.message);
        }
    };

    return (
        <div className="p-6 w-full bg-gray-100 min-h-screen flex flex-wrap gap-6">
            <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{editId ? "Edit" : "Create"} Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="quizType" className="block text-gray-700 font-medium text-lg">
                            Quiz Type
                        </label>
                        <select
                            id="quizType"
                            name="quizType"
                            value={formData.quizType}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                        >
                            <option value="general">General</option>
                            <option value="foreign">Foreign</option>
                            <option value="test">Test</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="maxParticipants" className="block text-gray-700 font-medium text-lg">
                            Maximum Participants
                        </label>
                        <input
                            id="maxParticipants"
                            name="maxParticipants"
                            type="number"
                            value={formData.maxParticipants}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                            min="1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="entryFees" className="block text-gray-700 font-medium text-lg">
                            Entry fees (TK)
                        </label>
                        <input
                            id="entryFees"
                            name="entryFees"
                            type="number"
                            value={formData.entryFees}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                            min="1"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="totalQuestions" className="block text-gray-700 font-medium text-lg">
                            Total Questions
                        </label>
                        <input
                            id="totalQuestions"
                            name="totalQuestions"
                            type="number"
                            value={formData.totalQuestions}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                            min="1"
                            required
                            disabled='disabled'
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium text-lg">Question Types</label>
                        {formData.questionTypes.map((qt, index) => (
                            <div key={index} className="flex gap-2 mt-2">
                                <input
                                    name={`questionTypes-${index}-type`}
                                    value={qt.type}
                                    onChange={handleChange}
                                    placeholder="Type"
                                    className="flex-1 p-2 border rounded-md  w-2/3"
                                    disabled
                                />
                                <input
                                    name={`questionTypes-${index}-count`}
                                    value={qt.count}
                                    onChange={handleChange}
                                    placeholder="Count"
                                    type="number"
                                    className=" p-2 border rounded-md w-1/4"
                                    min="0"
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium text-lg">Prizes</label>
                        <table className="table-auto w-full border-collapse border border-gray-300 mt-2">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="text-center py-2">Prize</th>
                                    <th className="text-center py-2">Number of Persons</th>
                                    <th className="text-center py-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.prizes.map((prize, index) => (
                                    <tr key={index}>
                                        <td className="border px-4 py-2">{prize.label}&nbsp;Prize</td>
                                        <td className="border px-4 py-2">
                                            <input
                                                name={`prizes-${index}-count`}
                                                value={prize.total_person}
                                                onChange={handleChange}
                                                type="number"
                                                className="w-full p-2 border rounded-md"
                                                min="1"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">
                                            <input
                                                name={`prizes-${index}-amount`}
                                                value={prize.amount}
                                                onChange={handleChange}
                                                type="number"
                                                className="w-full p-2 border rounded-md"
                                                min="1"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {editId ? "Update Quiz" : "Create Quiz"}
                    </button>
                </form>
            </div>

            <div className="w-full lg:w-1/4">
                <h2 className="text-2xl font-bold mb-4">Latest Quizzes</h2>
                <ul className="space-y-4">
                    {quizzes.slice(-6).map((quiz) => (
                        <li key={quiz._id} className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg">{quiz.quizType} - Round {quiz.round}</h3>
                                <p className="text-gray-600">Total Questions: {quiz.totalQuestions}</p>
                                <p className="text-gray-600">Max Participants: {quiz.maxParticipants}</p>
                                <p className="text-gray-600">Entry fees: {quiz.entryFees}</p>
                                <p className="text-gray-600">Status: {quiz.status ? "Active" : "False"}</p>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleEdit(quiz)}
                                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(quiz._id)}
                                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateQuiz;
