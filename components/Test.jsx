"use client";
import React, { useState, useCallback } from "react";
import Confetti from "react-confetti";
import Link from "next/link";

// Question counts for different types
const singleQuestionCount = 1; // Single characters
const shortWordQuestionCount = 1; // 2-3 character words
const longWordQuestionCount = 1; // 4-5 character words

const Test = ({ characterGrid }) => {
    // Initialize selectedKana with all characters
    const [selectedKana, setSelectedKana] = useState(() => {
        const initialSelection = new Set();
        Object.entries(characterGrid).forEach(([_, chars]) => {
            Object.entries(chars).forEach(([romaji, kana]) => {
                initialSelection.add(`${romaji}:${kana}`);
            });
        });
        return initialSelection;
    });

    const [selectAll, setSelectAll] = useState(true); // State for "Select all" checkbox
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentInput, setCurrentInput] = useState("");
    const [isCorrect, setIsCorrect] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [testStarted, setTestStarted] = useState(false);

    // Memoized function to get a random item from an array
    const getRandomItem = useCallback(
        (array) => array[Math.floor(Math.random() * array.length)],
        []
    );

    // Memoized function to generate a word without repeating characters
    const generateWord = useCallback(
        (minLength, maxLength, kanaMap) => {
            const length =
                Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
            const word = { kana: "", romaji: "" };
            const usedCharacters = new Set();

            for (let i = 0; i < length; i++) {
                let randomPair;
                let romaji, kana;

                do {
                    randomPair = getRandomItem(kanaMap);
                    [romaji, kana] = randomPair.split(":");
                } while (usedCharacters.has(kana));

                usedCharacters.add(kana);
                word.kana += kana;
                word.romaji += romaji;
            }

            return word;
        },
        [getRandomItem]
    );

    // Memoized function to generate questions
    const generateQuestions = useCallback(() => {
        const selected = Array.from(selectedKana);
        if (selected.length === 0) return;

        const newQuestions = [];

        // Generate single character questions
        for (let i = 0; i < singleQuestionCount; i++) {
            newQuestions.push(generateWord(1, 1, selected));
        }

        // Generate short words (2-3 characters)
        for (let i = 0; i < shortWordQuestionCount; i++) {
            newQuestions.push(generateWord(2, 3, selected));
        }

        // Generate long words (4-5 characters)
        for (let i = 0; i < longWordQuestionCount; i++) {
            newQuestions.push(generateWord(4, 5, selected));
        }

        setQuestions(newQuestions);
        setCurrentQuestion(0);
        setTestStarted(true);
    }, [selectedKana, generateWord]);

    // Handle form submission
    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (currentQuestion >= questions.length) return;

            const isAnswerCorrect =
                currentInput.toLowerCase() === questions[currentQuestion].romaji;
            setIsCorrect(isAnswerCorrect);

            if (isAnswerCorrect) {
                setCurrentInput("");
                setIsCorrect(null);
                setCurrentQuestion((prev) => prev + 1);
            }
        },
        [currentQuestion, questions, currentInput]
    );

    // Handle card selection
    const handleCardSelect = useCallback(
        (row) => {
            const rowKana = Object.entries(characterGrid[row]).map(
                ([romaji, kana]) => `${romaji}:${kana}`
            );
            const updatedSelection = new Set(selectedKana);

            const allSelected = rowKana.every((k) => selectedKana.has(k));
            rowKana.forEach((k) => {
                if (allSelected) {
                    updatedSelection.delete(k);
                } else {
                    updatedSelection.add(k);
                }
            });

            setSelectedKana(updatedSelection);

            // Check if all kana are selected after updating
            const allKana = new Set();
            Object.entries(characterGrid).forEach(([_, chars]) => {
                Object.entries(chars).forEach(([romaji, kana]) => {
                    allKana.add(`${romaji}:${kana}`);
                });
            });

            const isAllSelected = Array.from(allKana).every((k) =>
                updatedSelection.has(k)
            );
            setSelectAll(isAllSelected);
        },
        [characterGrid, selectedKana]
    );

    // Handle "Select all" checkbox
    const handleSelectAll = useCallback(() => {
        if (selectAll) {
            setSelectedKana(new Set()); // Unselect all
        } else {
            const allKana = new Set();
            Object.entries(characterGrid).forEach(([_, chars]) => {
                Object.entries(chars).forEach(([romaji, kana]) => {
                    allKana.add(`${romaji}:${kana}`);
                });
            });
            setSelectedKana(allKana); // Select all
        }
        setSelectAll((prev) => !prev); // Toggle the checkbox state
    }, [selectAll, characterGrid]);

    return (
        <div className="h-full w-full flex flex-col items-center p-4">
            {!testStarted && <Link href="/" className="absolute top-5 left-5 cursor-pointer text-lg md:text-3xl font-black">
                <span>&larr;</span>
            </Link>}
            {/* Confetti animation when all questions are answered */}
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
                <div className="w-full max-w-4xl">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                        Select the kana you want to practice
                    </h2>
                    <div className="flex items-center justify-center mb-6">
                        <input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                            className="mr-2"
                        />
                        <label>Select all</label>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Object.entries(characterGrid).map(([row, chars]) => {
                            const isSelected = Object.entries(chars).every(([romaji, kana]) =>
                                selectedKana.has(`${romaji}:${kana}`)
                            );
                            return (
                                <div
                                    key={row}
                                    className={`p-4 border cursor-pointer ${isSelected
                                            ? "border-blue-500"
                                            : "border-[#b7b7b7] border-opacity-20"
                                        }`}
                                    onClick={() => handleCardSelect(row)}
                                >
                                    <div className="text-lg font-semibold">{row}</div>
                                    <div className="text-sm text-gray-600">
                                        {Object.values(chars).join(" ")}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="fixed bottom-0 left-0 right-0 p-4 shadow-lg items-center justify-center flex">
                        <button
                            className={`w-xs py-4 text-lg ${selectedKana.size === 0
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-500 text-white font-semibold hover:bg-blue-600 cursor-pointer"
                                }`}
                            onClick={generateQuestions}
                            disabled={selectedKana.size === 0}
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
                                {questions[currentQuestion].kana}
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex justify-center"
                            >
                                <input
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    className={`w-full max-w-md mx-auto text-center text-xl p-2 border ${isCorrect === null
                                            ? "border-gray-300"
                                            : isCorrect
                                                ? "border-green-500 bg-green-100"
                                                : "border-red-500 bg-red-100"
                                        }`}
                                    placeholder="Type romaji..."
                                    autoFocus
                                />
                            </form>
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

export default Test;