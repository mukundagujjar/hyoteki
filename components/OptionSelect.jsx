"use client";
import React, { useState, useCallback, useEffect } from "react";
import Confetti from "react-confetti";
import Link from "next/link";

const OptionSelect = ({ data }) => {
    const [gameState, setGameState] = useState({
        testStarted: false,
        currentQuestion: 0,
        questions: [],
        response: { selected: null, isCorrect: null },
        wrongAttempts: new Set(),
        timeRemaining: 0,
        isTimeUp: false
    });

    const formatEnglishText = useCallback((text) => {
        return text
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }, []);

    const generateQuestions = useCallback(() => {
        const entries = Object.entries(data);
        const questionCount = Math.min(10, entries.length);
        const shuffledEntries = [...entries].sort(() => Math.random() - 0.5);

        const newQuestions = shuffledEntries.slice(0, questionCount).map(([english, japanese]) => {
            const isEnglishToJapanese = Math.random() > 0.5;
            const wrongOptions = shuffledEntries
                .filter(([e]) => e !== english)
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

        setGameState(prev => ({
            ...prev,
            questions: newQuestions,
            currentQuestion: 0,
            testStarted: true,
            wrongAttempts: new Set(),
            response: { selected: null, isCorrect: null },
            timeRemaining: newQuestions.length * 10,
            isTimeUp: false
        }));
    }, [data, formatEnglishText]);

    const handleAnswerSelect = useCallback((answer) => {
        const currentQ = gameState.questions[gameState.currentQuestion];
        const formattedCorrectAnswer = currentQ.isEnglishToJapanese
            ? currentQ.correctAnswer
            : formatEnglishText(currentQ.correctAnswer);

        const isAnswerCorrect = answer === formattedCorrectAnswer;

        setGameState(prev => ({
            ...prev,
            response: { selected: answer, isCorrect: isAnswerCorrect }
        }));

        setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                currentQuestion: isAnswerCorrect ? prev.currentQuestion + 1 : prev.currentQuestion,
                wrongAttempts: isAnswerCorrect ? new Set() : new Set([...prev.wrongAttempts, answer]),
                response: { selected: null, isCorrect: null }
            }));
        }, 1000);
    }, [gameState.questions, gameState.currentQuestion, formatEnglishText]);

    useEffect(() => {
        let timer;
        if (gameState.testStarted && gameState.timeRemaining > 0 && !gameState.isTimeUp) {
            timer = setInterval(() => {
                setGameState(prev => ({
                    ...prev,
                    timeRemaining: prev.timeRemaining - 1,
                    isTimeUp: prev.timeRemaining <= 1
                }));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [gameState.testStarted, gameState.timeRemaining, gameState.isTimeUp]);

    const isComplete = gameState.currentQuestion === gameState.questions.length && gameState.questions.length > 0;

    return (
        <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
            {isComplete && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={700}
                    wind={0.01}
                />
            )}

            {gameState.testStarted && !gameState.isTimeUp && (
                <div className="fixed top-4 right-8 text-xl font-bold">
                    Time: {Math.floor(gameState.timeRemaining / 60)}:{(gameState.timeRemaining % 60).toString().padStart(2, '0')}
                </div>
            )}

            {!gameState.testStarted ? (
                <div className="flex flex-col items-center gap-8 w-full h-full overflow-hidden">
                    <p className="text-3xl md:text-6xl font-black text-center mt-8">
                        Review your vocabulary
                    </p>

                    <div className="w-full p-8 h-full overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.entries(data).map(([english, japanese], index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl flex flex-col items-center justify-center select-none p-4 bg-[#1B263B] hover:shadow-xl transition duration-300 ease-in-out"
                                >
                                    <div className="text-lg font-semibold">{formatEnglishText(english)}</div>
                                    <div className="text-sm opacity-60">{japanese}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="fixed bottom-4 right-8 shadow-xl px-4 py-4 rounded-xl bg-[#415A77] font-semibold cursor-pointer"
                        onClick={generateQuestions}
                    >
                        Start &nbsp; --&gt;
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col items-center justify-center h-full p-4">
                    {gameState.isTimeUp ? (
                        <div className="space-y-6 text-center">
                            <div className="text-2xl font-bold text-red-500">Time's Up!</div>
                            <div className="text-lg text-gray-400">Don't worry, you can try again!</div>
                            <button
                                className="px-10 py-4 bg-[#415A77] text-white cursor-pointer font-semibold rounded-lg"
                                onClick={() => setGameState(prev => ({
                                    ...prev,
                                    questions: [],
                                    testStarted: false
                                }))}
                            >
                                Try Again
                            </button>
                        </div>
                    ) : gameState.currentQuestion < gameState.questions.length ? (
                        <div className="gap-6 w-full flex flex-col items-center justify-center">
                            <div className="text-4xl mb-6 text-center">
                                {gameState.questions[gameState.currentQuestion].question}
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                                {gameState.questions[gameState.currentQuestion].options.map((option, index) => {
                                    const isWrongAttempt = gameState.wrongAttempts.has(option);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(option)}
                                            disabled={gameState.response.selected !== null || isWrongAttempt}
                                            className={`p-4 text-lg rounded-lg transition-colors duration-200 
                                                ${isWrongAttempt
                                                    ? "bg-red-500/50 cursor-not-allowed"
                                                    : gameState.response.selected === option
                                                        ? gameState.response.isCorrect
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                        : "bg-[#415A77]"
                                                } text-white font-medium`}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="text-sm text-gray-500 text-center">
                                Question {gameState.currentQuestion + 1} of {gameState.questions.length}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 text-center">
                            <div className="text-2xl font-bold">Test Complete!</div>
                            <button
                                className="px-10 py-4 bg-[#415A77] text-white cursor-pointer font-semibold rounded-lg"
                                onClick={() => setGameState(prev => ({
                                    ...prev,
                                    questions: [],
                                    testStarted: false
                                }))}
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