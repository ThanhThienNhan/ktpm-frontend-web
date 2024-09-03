import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddQuiz.css';
import { useBrand } from '../../BrandContext';
import { toast } from 'react-toastify';

function AddQuiz() {
    const [questions, setQuestions] = useState([]);
    const [eventData, setEventData] = useState(null);
    const { brandId } = useBrand();
    const { id } = useParams(); // eventId
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventAndQuiz = async () => {
          try {
            // Fetch event data
            const eventResponse = await fetch(`http://localhost:2999/brand/api/v1/event/${id}`);
            const eventData = await eventResponse.json();
    
            if (eventData.ID_THUONGHIEU !== brandId) {
              // Navigate to unauthorized page if brandId doesn't match
              // navigate('/unauthorized');
              return;
            }
    
            setEventData(eventData);
    
            // Fetch existing quiz for the event
            const quizResponse = await fetch(`http://localhost:2999/brand/api/v1/quiz/EventId/${id}`);
            const quiz = await quizResponse.json();
            console.log("Quiz data", quiz);
    
            if (quiz && quiz.questions) {
              // Process and transform quiz data
              const processedQuestions = quiz.questions.map((question) => ({
                questionText: question.TEXT,
                choices: question.choices.map(choice => choice.TEXT),
                correctAnswerIndex: question.choices.findIndex(choice => choice.IS_CORRECT === 1),
              }));
              setQuestions(processedQuestions);
            }
          } catch (error) {
            console.error("Error fetching event or quiz data:", error);
          }
        };
    
        fetchEventAndQuiz();
      }, [id, brandId, navigate]);
    


    // Function to add a new question
    const addQuestion = () => {
        setQuestions([
            ...questions,
            {
                questionText: '',
                choices: ['', '', '', ''],
                correctAnswerIndex: null,
            },
        ]);
    };

    // Function to handle input change for question text and choices
    const handleInputChange = (questionIndex, choiceIndex, value) => {
        const updatedQuestions = [...questions];

        if (choiceIndex === null) {
            // Updating the question text
            updatedQuestions[questionIndex].questionText = value;
        } else {
            // Updating a choice
            updatedQuestions[questionIndex].choices[choiceIndex] = value;
        }

        setQuestions(updatedQuestions);
    };

    // Function to set the correct answer for a question
    const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctAnswerIndex = answerIndex;
        setQuestions(updatedQuestions);
    };

    // Function to handle quiz submission
    const handleSubmit = async () => {
        try {
            // Delete existing quiz for the event
            await fetch(`http://localhost:2999/brand/api/v1/quiz/EventId/${id}`, {
                method: 'DELETE',
            });

            // Submit new quiz to the server
            await fetch('http://localhost:2999/brand/api/v1/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID_SUKIEN: id, questions }),
            });

            // Show a success message
            toast.success("Quiz updated successfully");
            navigate(`/brand/event/${id}`); // Redirect to a different page if needed
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    // Display loading message if eventData is not available
    if (!eventData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="add-quiz-container">
            <h2>Add Quiz for Event: {eventData.TENSUKIEN}</h2>
            {questions.map((question, questionIndex) => (
                <div key={questionIndex} className="question-block">
                    <input
                        type="text"
                        placeholder="Enter question text"
                        value={question.questionText}
                        onChange={(e) =>
                            handleInputChange(questionIndex, null, e.target.value)
                        }
                        className="question-input"
                    />
                    {question.choices.map((choice, choiceIndex) => (
                        <div key={choiceIndex} className="choice-block">
                            <input
                                type="text"
                                placeholder={`Choice ${choiceIndex + 1}`}
                                value={choice}
                                onChange={(e) =>
                                    handleInputChange(
                                        questionIndex,
                                        choiceIndex,
                                        e.target.value
                                    )
                                }
                                className="choice-input"
                            />
                            <input
                                type="checkbox"
                                checked={question.correctAnswerIndex === choiceIndex}
                                onChange={() => handleCorrectAnswerChange(questionIndex, choiceIndex)}
                                className="correct-answer-checkbox"
                            />
                            <label>Correct Answer</label>
                        </div>
                    ))}
                </div>
            ))}
            <button onClick={addQuestion} className="add-question-button">
                Add Question
            </button>
            <button onClick={handleSubmit} className="submit-quiz-button">
                Submit Quiz
            </button>
        </div>
    );
}

export default AddQuiz;
