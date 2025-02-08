"use client";
import React, { useState, useCallback } from "react";
import Confetti from "react-confetti";
import Link from "next/link";

const OptionSelect = ({ data }) => {
    const [testStarted, setTestStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [wrongAttempts, setWrongAttempts] = useState(new Set());

    // Format English text by removing underscores and capitalizing words
    const formatEnglishText = (text) => {
        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    // Generate questions
    const generateQuestions = useCallback(() => {
        const entries = Object.entries(data);
        const questionCount = Math.min(10, entries.length);
        const shuffledEntries = [...entries].sort(() => Math.random() - 0.5);

        const newQuestions = shuffledEntries.slice(0, questionCount).map(([english, japanese]) => {
            const isEnglishToJapanese = Math.random() > 0.5;

            const wrongOptions = shuffledEntries
                .filter(([e, j]) => e !== english)
                .slice(0, 3)
                .map(([e, j]) => isEnglishToJapanese ? j : e);

            const options = [...wrongOptions, isEnglishToJapanese ? japanese : english]
                .sort(() => Math.random() - 0.5);

            return {
                question: isEnglishToJapanese ? formatEnglishText(english) : japanese,
                correctAnswer: isEnglishToJapanese ? japanese : english,
                options: options.map(opt =>
                    isEnglishToJapanese ? opt : formatEnglishText(opt)
                ),
                isEnglishToJapanese
            };
        });

        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setTestStarted(true);
        setWrongAttempts(new Set());
    }, [data]);

    const handleAnswerSelect = (answer) => {
        const currentQ = questions[currentQuestion];
        const formattedCorrectAnswer = currentQ.isEnglishToJapanese
            ? currentQ.correctAnswer
            : formatEnglishText(currentQ.correctAnswer);

        const isAnswerCorrect = answer === formattedCorrectAnswer;
        setIsCorrect(isAnswerCorrect);
        setSelectedAnswer(answer);

        if (isAnswerCorrect) {
            // Move to next question after a delay
            setTimeout(() => {
                setSelectedAnswer(null);
                setIsCorrect(null);
                setCurrentQuestion(prev => prev + 1);
                setWrongAttempts(new Set());
            }, 1000);
        } else {
            // Add wrong answer to set and allow retry after a delay
            setTimeout(() => {
                setWrongAttempts(prev => new Set(prev).add(answer));
                setSelectedAnswer(null);
                setIsCorrect(null);
            }, 1000);
        }
    };

    return (
        <div className="h-full w-full flex flex-col items-center p-4">
            {!testStarted && (
                <Link href="/" className="absolute top-5 left-5 cursor-pointer text-lg md:text-3xl font-black">
                    <span>&larr;</span>
                </Link>
            )}

            {currentQuestion === questions.length && questions.length > 0 && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={700}
                    wind={0.01}
                />
            )}

            {!testStarted ? (
                <div className="w-full max-w-8xl flex flex-col items-center justify-center ">
                    <h2 className="text-lg md:text-2xl font-bold mb-10 text-center">
                        We will test your knowledge regarding the below:
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 overflow-y-auto mb-30">
                    {
                        Object.entries(data).map(([english, japanese], index) => (
                            <div key={index} className="border p-4 text-center">
                                <div className="text-sm md:text-lg">{formatEnglishText(english)} &nbsp;-&nbsp; {japanese}</div>
                            </div>
                            ))
                    }
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg items-center justify-center flex backdrop-filter backdrop-blur-sm">
                        <button
                            className="w-xs py-4 text-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer"
                            onClick={generateQuestions}
                        >
                            Start
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center justify-center h-full">
                    {currentQuestion < questions.length ? (
                        <div className="gap-6 w-full flex flex-col items-center justify-center">
                            <div className="text-4xl mb-6 text-center">
                                {questions[currentQuestion].question}
                            </div>
                            <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                                {questions[currentQuestion].options.map((option, index) => {
                                    const isWrongAttempt = wrongAttempts.has(option);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(option)}
                                            disabled={selectedAnswer !== null || isWrongAttempt}
                                            className={`p-4 text-lg border transition-colors ${isWrongAttempt
                                                ? "border-red-500 bg-red-50 opacity-50 cursor-not-allowed"
                                                : selectedAnswer === option
                                                    ? isCorrect
                                                        ? "border-green-500 bg-green-50"
                                                        : "border-red-500 bg-red-50"
                                                    : "border-gray-300 hover:border-blue-500"
                                                }`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="text-sm text-gray-500 text-center">
                                Question {currentQuestion + 1} of {questions.length}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center">
                            <div className="text-2xl font-bold">Test Complete!</div>
                            <button
                                className="px-10 py-4 bg-blue-500 text-white cursor-pointer font-semibold hover:bg-blue-600"
                                onClick={() => {
                                    setQuestions([]);
                                    setTestStarted(false);
                                }}
                            >
                                New Test
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OptionSelect;