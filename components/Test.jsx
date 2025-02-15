"use client";
import React, { useState, useCallback, useEffect } from "react";
import Confetti from "react-confetti";
import Link from "next/link";

const QUESTION_CONFIG = {
    single: { count: 5, minLength: 1, maxLength: 1 },
    short: { count: 5, minLength: 2, maxLength: 3 },
    long: { count: 5, minLength: 4, maxLength: 5 }
};

const Test = ({ characterGrid }) => {
    const [gameState, setGameState] = useState({
        selectedKana: new Set(),
        testStarted: false,
        currentQuestion: 0,
        timeRemaining: 0,
        isTimeUp: false,
        questions: [],
        response: { selected: null, isCorrect: null },
        wrongAttempts: new Set()
    });

    const generateWord = useCallback((minLength, maxLength, kanaMap) => {
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
        let word = { kana: "", romaji: "" };
        const used = new Set();

        while (word.kana.length < length) {
            const [romaji, kana] = kanaMap[Math.floor(Math.random() * kanaMap.length)].split(":");
            if (!used.has(kana)) {
                used.add(kana);
                word.kana += kana;
                word.romaji += romaji;
            }
        }

        return word;
    }, []);

    const generateQuestion = useCallback((word, kanaMap) => {
        const isRomajiQuestion = Math.random() < 0.5;
        const correctAnswer = isRomajiQuestion ? word.kana : word.romaji;
        const options = new Set([correctAnswer]);

        while (options.size < 4) {
            const newWord = generateWord(word.romaji.length, word.romaji.length, kanaMap);
            options.add(isRomajiQuestion ? newWord.kana : newWord.romaji);
        }

        return {
            question: isRomajiQuestion ? word.romaji : word.kana,
            answer: correctAnswer,
            options: Array.from(options).sort(() => Math.random() - 0.5)
        };
    }, [generateWord]);

    const generateQuestions = useCallback(() => {
        const kanaMap = Array.from(gameState.selectedKana);
        if (!kanaMap.length) return;

        const questions = [];
        Object.entries(QUESTION_CONFIG).forEach(([_, config]) => {
            for (let i = 0; i < config.count; i++) {
                const word = generateWord(config.minLength, config.maxLength, kanaMap);
                questions.push(generateQuestion(word, kanaMap));
            }
        });

        const totalTime = questions.length * 10;
        setGameState(prev => ({
            ...prev,
            questions,
            timeRemaining: totalTime,
            testStarted: true,
            currentQuestion: 0,
            isTimeUp: false,
            wrongAttempts: new Set()
        }));
    }, [gameState.selectedKana, generateWord, generateQuestion]);

    const handleKanaSelection = useCallback((row) => {
        setGameState(prev => {
            const updatedSelection = new Set(prev.selectedKana);
            const rowKana = Object.entries(characterGrid[row]).map(([romaji, kana]) => `${romaji}:${kana}`);
            const allSelected = rowKana.every(k => prev.selectedKana.has(k));

            rowKana.forEach(k => allSelected ? updatedSelection.delete(k) : updatedSelection.add(k));

            return { ...prev, selectedKana: updatedSelection };
        });
    }, [characterGrid]);

    const handleSelectAll = useCallback(() => {
        setGameState(prev => {
            const allKana = new Set();
            if (prev.selectedKana.size !== Object.keys(characterGrid).reduce((acc, row) => acc + Object.keys(characterGrid[row]).length, 0)) {
                Object.entries(characterGrid).forEach(([_, chars]) => {
                    Object.entries(chars).forEach(([romaji, kana]) => allKana.add(`${romaji}:${kana}`));
                });
            }
            return { ...prev, selectedKana: allKana };
        });
    }, [characterGrid]);

    const handleAnswer = useCallback((option) => {
        if (gameState.isTimeUp || gameState.response.selected || gameState.wrongAttempts.has(option)) return;

        const isCorrect = option === gameState.questions[gameState.currentQuestion].answer;
        setGameState(prev => ({ ...prev, response: { selected: option, isCorrect } }));

        setTimeout(() => {
            setGameState(prev => ({
                ...prev,
                currentQuestion: isCorrect ? prev.currentQuestion + 1 : prev.currentQuestion,
                wrongAttempts: isCorrect ? new Set() : new Set([...prev.wrongAttempts, option]),
                response: { selected: null, isCorrect: null }
            }));
        }, 1000);
    }, [gameState.isTimeUp, gameState.questions, gameState.currentQuestion, gameState.response.selected, gameState.wrongAttempts]);

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

    const currentQ = gameState.questions[gameState.currentQuestion];
    const isComplete = gameState.currentQuestion === gameState.questions.length && gameState.questions.length > 0;

    return (
        <div className="flex flex-col items-center h-dvh w-full overflow-hidden">
            {/* {!gameState.testStarted && (
                <Link href="/" className="absolute top-5 left-5 cursor-pointer text-lg md:text-3xl font-black">
                    <span>&larr;</span>
                </Link>
            )} */}

            {isComplete && !gameState.isTimeUp && (
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
                        Select the Kana you want to practice
                    </p>

                    <div className="w-full flex items-center justify-center">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={gameState.selectedKana.size === Object.keys(characterGrid).reduce((acc, row) => acc + Object.keys(characterGrid[row]).length, 0)}
                                onChange={handleSelectAll}
                                className="sr-only"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${gameState.selectedKana.size === Object.keys(characterGrid).reduce((acc, row) => acc + Object.keys(characterGrid[row]).length, 0)
                                    ? 'border-[#778DA9] bg-[#778DA9]'
                                    : 'border-white/30'
                                }`}>
                                {gameState.selectedKana.size === Object.keys(characterGrid).reduce((acc, row) => acc + Object.keys(characterGrid[row]).length, 0) && (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 stroke-[3]">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                            </div>
                            <span className="font-semibold">Select All</span>
                        </label>
                    </div>

                    <div className="w-full p-8 h-full overflow-y-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {Object.entries(characterGrid).map(([row, chars]) => (
                                <div
                                    key={row}
                                    className={`rounded-2xl flex flex-col items-center justify-center select-none p-4 bg-[#1B263B] hover:shadow-xl transition duration-300 ease-in-out cursor-pointer outline outline-2 outline-offset-4 ${Object.entries(chars).every(([romaji, kana]) => gameState.selectedKana.has(`${romaji}:${kana}`))
                                            ? "outline-[#778DA9]"
                                            : "outline-none"
                                        }`}
                                    onClick={() => handleKanaSelection(row)}
                                >
                                    <div className="text-lg font-semibold">{row}</div>
                                    <div className="text-sm opacity-60">{Object.values(chars).join(" ")}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className={`fixed bottom-4 right-8 shadow-xl px-4 py-4 rounded-xl ${gameState.selectedKana.size === 0
                                ? "hidden"
                                : "bg-[#415A77] font-semibold cursor-pointer"
                            }`}
                        onClick={generateQuestions}
                        disabled={gameState.selectedKana.size === 0}
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
                            <Link href="/practice/"
                                className="px-10 py-4 bg-[#415A77] text-white cursor-pointer font-semibold rounded-lg inline-block">
                                Try Again
                            </Link>
                        </div>
                    ) : currentQ ? (
                        <div className="gap-6 w-full flex flex-col items-center justify-center">
                            <div className="text-4xl mb-6 text-center">{currentQ.question}</div>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-xl">
                                {currentQ.options.map((option, index) => {
                                    const isWrongAttempt = gameState.wrongAttempts.has(option);
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(option)}
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
                                    testStarted: false,
                                    wrongAttempts: new Set()
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

export default Test;