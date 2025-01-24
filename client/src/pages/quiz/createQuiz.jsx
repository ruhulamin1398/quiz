import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const CreateQuiz = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [quizzes, setQuizzes] = useState([]);
    const [types, setTypes] = useState([]);
    const [formData, setFormData] = useState({
        lotteryType: "general",
        round: 1,
        totalQuestions: 0,
        questionTypes: [{ type: "", count: 0 }],
        maxParticipants: 0,
        prizes: [{ count: 1, amount: 0 }],
    });
    const [editId, setEditId] = useState(null);


    const fetchTypes = async () => {
        try {
            console.log(`${backendUrl}/quiz-types`)
            const response = await axios.get(`${backendUrl}/quiz-types`);
            setTypes(response.data.quizTypes);
            let questionTypes = [];
            response.data?.quizTypes?.map((type) => {
                questionTypes.push({ "type": type.type, count: 0 });
            })

            setFormData({ ...formData, questionTypes });

        } catch (error) {
            toast.error("Error fetching questions:");
            console.error("Error fetching questions:", error.message);
        }
    };



    useEffect(() => {
        fetchTypes();
    }, []);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    // Fetch all quizzes
    const fetchQuizzes = async () => {
        try {
            const response = await axios.get(`${backendUrl}/quizzes`);
            setQuizzes(response.data);
        } catch (error) {
            toast.error("Error fetching quizzes");
            console.error("Error fetching quizzes:", error.message);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("questionTypes")) {
            const [_, index, field] = name.split("-");
            const updatedQuestionTypes = [...formData.questionTypes];
            updatedQuestionTypes[parseInt(index)][field] = parseInt(value);
            const totalQuestions = updatedQuestionTypes.reduce((acc, curr) => acc + parseInt(curr.count), 0);

            // console.log("updatedQuestionTypes", totalQuestions, updatedQuestionTypes)
            setFormData({ ...formData, questionTypes: updatedQuestionTypes });
            setFormData({ ...formData, totalQuestions: totalQuestions });
        } else if (name.startsWith("prizes")) {
            const [_, index, field] = name.split("-");
            const updatedPrizes = [...formData.prizes];
            updatedPrizes[parseInt(index)][field] = value;
            setFormData({ ...formData, prizes: updatedPrizes });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editId) {
                await axios.put(`${backendUrl}/quizzes/${editId}`, formData);
                setEditId(null);
            } else {
                await axios.post(`${backendUrl}/quizzes`, formData);
            }

            fetchQuizzes();
            setFormData({
                lotteryType: "general",
                round: 1,
                totalQuestions: 0,
                questionTypes: [{ type: "", count: 0 }],
                maxParticipants: 0,
                prizes: [{ count: 1, amount: 0 }],
            });

            toast.success("Quiz saved successfully!");
            fetchTypes();
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

            fetchTypes();
        } catch (error) {
            toast.error("Error deleting quiz");
            console.error("Error deleting quiz:", error.message);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-between w-full gap-4">
            <div className="w-full bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{editId ? "Edit" : "Create"} Quiz</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="lotteryType" className="block text-gray-700 font-medium">
                            Lottery Type
                        </label>
                        <select
                            id="lotteryType"
                            name="lotteryType"
                            value={formData.lotteryType}
                            onChange={handleChange}
                            className="w-full mt-2 p-2 border rounded-md"
                        >
                            <option value="general">General</option>
                            <option value="foreign">Foreign</option>
                            <option value="test">Test</option>
                        </select>
                    </div>



                    <div className="mb-4">
                        <label htmlFor="totalQuestions" className="block text-gray-700 font-medium">
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
                        <label className="block text-gray-700 font-medium">Question Types </label>
                        {formData.questionTypes?.map((qt, index) => (
                            <div key={index} className="flex gap-2 mt-2">
                                <input
                                    name={`questionTypes-${index}-type`}
                                    value={qt.type}
                                    onChange={handleChange}
                                    placeholder="Type"
                                    className="flex-1 p-2 border rounded-md w-full"
                                    required
                                    disabled
                                />
                                <input
                                    name={`questionTypes-${index}-count`}
                                    value={qt.count}
                                    onChange={handleChange}
                                    placeholder="Count"
                                    type="number"
                                    className=" flex-1 w-24 p-2 border rounded-md w-full"
                                    min="0"
                                    required
                                />
                            </div>
                        ))}

                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium">Prizes</label>
                        {formData.prizes?.map((prize, index) => (
                            <div key={index} className="flex gap-2 mt-2">
                                <input
                                    name={`prizes-${index}-count`}
                                    value={prize.count}
                                    onChange={handleChange}
                                    placeholder="Count"
                                    type="number"
                                    className="w-24 p-2 border rounded-md"
                                    min="1"
                                    required
                                />
                                <input
                                    name={`prizes-${index}-amount`}
                                    value={prize.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    type="number"
                                    className="flex-1 p-2 border rounded-md"
                                    min="1"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    prizes: [...formData.prizes, { count: 1, amount: 0 }],
                                })
                            }
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            + Add Prize
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {editId ? "Update Quiz" : "Create Quiz"}
                    </button>
                </form>
            </div>

            <div className=" w-full mt-10">
                <h2 className="text-2xl font-bold mb-4">Latest Quizzes</h2>
                <ul className="space-y-4">
                    {quizzes?.slice(-6)?.map((quiz) => (
                        <li
                            key={quiz._id}
                            className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold text-lg">{quiz.lotteryType} - Round {quiz.round}</h3>
                                <p className="text-gray-600">Total Questions: {quiz.totalQuestions}</p>
                                <p className="text-gray-600">Max Participants: {quiz.maxParticipants}</p>
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
        </div>
    );
};

export default CreateQuiz;
