// import React, { useState, useEffect } from 'react';
// import { 
//   Play, 
//   Users, 
//   Trophy, 
//   Clock, 
//   CheckCircle, 
//   XCircle, 
//   Volume2, 
//   Image as ImageIcon,
//   SkipForward,
//   RotateCcw
// } from 'lucide-react';

// // Types
// interface Team {
//   id: number;
//   name: string;
//   members: string[];
//   score: number;
// }

// interface Question {
//   statement: string;
//   options?: string[];
//   correctOption?: string;
//   correctAnswer?: string;
//   media?: {
//     type: 'audio' | 'image';
//     name: string;
//     data: string;
//   };
// }

// interface Round {
//   roundNumber: number;
//   numberOfQuestions: number;
//   questionType: 'normal' | 'audio-visual' | 'rapid-fire';
//   questions: Question[];
// }

// interface QuizData {
//   quizName: string;
//   numberOfTeams: number;
//   numberOfRounds: number;
//   quizMaster: string;
//   teams: Omit<Team, 'score'>[];
//   roundsData: Round[];
// }

// const QuizStart: React.FC = () => {
//   const quizData: QuizData = {
//     "quizName": "Testing",
//     "numberOfTeams": 4,
//     "numberOfRounds": 3,
//     "quizMaster": "Dr. John",
//     "teams": [
//       {
//         "id": 1,
//         "name": "Alpha",
//         "members": ["Jack", "Mike", "Alice", "Rose"]
//       },
//       {
//         "id": 2,
//         "name": "Beta",
//         "members": ["Bob", "Mary", "Henry", "Tom"]
//       },
//       {
//         "id": 3,
//         "name": "Gamma",
//         "members": ["Khuraijam Tomba Singh", "Yumnam Chaoba Meitei", "Keithelakpam Thoiba Meitei", "Moirangthem Ibochouba Singh"]
//       },
//       {
//         "id": 4,
//         "name": "Delta",
//         "members": ["Kumar Raj", "Arjun Singh", "Ritesh Patel", "Ramesh Agarwal"]
//       }
//     ],
//     "roundsData": [
//       {
//         "roundNumber": 1,
//         "numberOfQuestions": 3,
//         "questionType": "normal",
//         "questions": [
//           {
//             "statement": "Which planet is known as red planet?",
//             "options": ["Mercury", "Jupiter", "Mars", "Saturn"],
//             "correctOption": "Option C"
//           },
//           {
//             "statement": "Which is the largest planet?",
//             "options": ["Saturn", "Jupiter", "Neptune", "Uranus"],
//             "correctOption": "Option B"
//           },
//           {
//             "statement": "Which is the largest country?",
//             "options": ["China", "Germany", "USA", "Russia"],
//             "correctOption": "Option D"
//           }
//         ]
//       },
//       {
//         "roundNumber": 2,
//         "numberOfQuestions": 2,
//         "questionType": "audio-visual",
//         "questions": [
//           {
//             "statement": "Who sang this song?",
//             "media": {
//               "type": "audio",
//               "name": "",
//               "data": "data:audio/x-m4a;base64,"
//             },
//             "options": ["Priya", "Gita", "Luxmi", "Rita"],
//             "correctOption": "Option A"
//           },
//           {
//             "statement": "Who is in this picture?",
//             "media": {
//               "type": "image",
//               "name": "",
//               "data": "data:image/png;base64,"
//             },
//             "options": ["Ram", "Arjun", "Krishna", "Mahesh"],
//             "correctOption": "Option C"
//           }
//         ]
//       },
//       {
//         "roundNumber": 3,
//         "numberOfQuestions": 2,
//         "questionType": "rapid-fire",
//         "questions": [
//           {
//             "statement": "What is the 2+3?",
//             "correctAnswer": "5"
//           },
//           {
//             "statement": "What comes after saturday?",
//             "correctAnswer": "Sunday"
//           }
//         ]
//       }
//     ]
//   };

//   const [teams, setTeams] = useState<Team[]>(
//     quizData.teams.map(team => ({ ...team, score: 0 }))
//   );
//   const [currentScreen, setCurrentScreen] = useState<'welcome' | 'quiz' | 'results'>('welcome');
//   const [currentRound, setCurrentRound] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [timer, setTimer] = useState(30);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [teamAnswers, setTeamAnswers] = useState<{[key: number]: boolean}>({});

//   // Timer effect
//   useEffect(() => {
//     let interval: NodeJS.Timeout;
//     if (isTimerRunning && timer > 0) {
//       interval = setInterval(() => {
//         setTimer(timer - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setIsTimerRunning(false);
//     }
//     return () => clearInterval(interval);
//   }, [isTimerRunning, timer]);

//   const startQuiz = () => {
//     setCurrentScreen('quiz');
//     setCurrentRound(0);
//     setCurrentQuestion(0);
//     setShowAnswer(false);
//     resetTimer();
//   };

//   const resetTimer = () => {
//     const currentRoundData = quizData.roundsData[currentRound];
//     setTimer(currentRoundData.questionType === 'rapid-fire' ? 10 : 30);
//     setIsTimerRunning(false);
//   };

//   const startTimer = () => {
//     setIsTimerRunning(true);
//   };

//   const nextQuestion = () => {
//     const currentRoundData = quizData.roundsData[currentRound];
    
//     if (currentQuestion < currentRoundData.questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setShowAnswer(false);
//       setTeamAnswers({});
//       resetTimer();
//     } else if (currentRound < quizData.roundsData.length - 1) {
//       setCurrentRound(currentRound + 1);
//       setCurrentQuestion(0);
//       setShowAnswer(false);
//       setTeamAnswers({});
//       resetTimer();
//     } else {
//       setCurrentScreen('results');
//     }
//   };

//   const markTeamAnswer = (teamId: number, correct: boolean) => {
//     setTeamAnswers(prev => ({ ...prev, [teamId]: correct }));
    
//     if (correct) {
//       setTeams(prev => prev.map(team => 
//         team.id === teamId 
//           ? { ...team, score: team.score + (quizData.roundsData[currentRound].questionType === 'rapid-fire' ? 5 : 10) }
//           : team
//       ));
//     }
//   };

//   const resetQuiz = () => {
//     setTeams(quizData.teams.map(team => ({ ...team, score: 0 })));
//     setCurrentScreen('welcome');
//     setCurrentRound(0);
//     setCurrentQuestion(0);
//     setShowAnswer(false);
//     setTeamAnswers({});
//     resetTimer();
//   };

//   const getCorrectAnswer = (question: Question) => {
//     if (question.correctAnswer) return question.correctAnswer;
//     if (question.correctOption && question.options) {
//       const optionIndex = question.correctOption.charAt(question.correctOption.length - 1);
//       const index = optionIndex === 'A' ? 0 : optionIndex === 'B' ? 1 : optionIndex === 'C' ? 2 : 3;
//       return question.options[index];
//     }
//     return '';
//   };

//   const WelcomeScreen = () => (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <Trophy className="w-16 h-16 text-yellow-500" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-800 mb-2">{quizData.quizName}</h1>
//           <p className="text-xl text-gray-600">Quiz Master: {quizData.quizMaster}</p>
//         </div>

//         <div className="grid grid-cols-2 gap-6 mb-8">
//           {teams.map(team => (
//             <div key={team.id} className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
//               <div className="flex items-center mb-2">
//                 <Users className="w-5 h-5 text-blue-500 mr-2" />
//                 <h3 className="font-semibold text-lg">{team.name}</h3>
//               </div>
//               <div className="text-sm text-gray-600">
//                 {team.members.join(', ')}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <div className="mb-4 text-gray-600">
//             <p>{quizData.numberOfRounds} Rounds • {quizData.roundsData.reduce((acc, round) => acc + round.numberOfQuestions, 0)} Questions</p>
//           </div>
//           <button
//             onClick={startQuiz}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors"
//           >
//             <Play className="w-5 h-5 mr-2" />
//             Start Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const QuizScreen = () => {
//     const currentRoundData = quizData.roundsData[currentRound];
//     const currentQuestionData = currentRoundData.questions[currentQuestion];

//     return (
//       <div className="min-h-screen bg-gray-100 p-4">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//           <div className="flex justify-between items-center">
//             <div>
//               <h2 className="text-xl font-bold">Round {currentRound + 1} - {currentRoundData.questionType.replace('-', ' ').toUpperCase()}</h2>
//               <p className="text-gray-600">Question {currentQuestion + 1} of {currentRoundData.numberOfQuestions}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center">
//                 <Clock className={`w-5 h-5 mr-2 ${timer <= 10 ? 'text-red-500' : 'text-blue-500'}`} />
//                 <span className={`font-bold ${timer <= 10 ? 'text-red-500' : 'text-blue-500'}`}>{timer}s</span>
//               </div>
//               <button
//                 onClick={startTimer}
//                 disabled={isTimerRunning}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
//               >
//                 {isTimerRunning ? 'Running' : 'Start Timer'}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 h-[calc(100vh-140px)]">
//           {/* Question Panel */}
//           <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
//             <div className="h-full flex flex-col">
//               <h3 className="text-2xl font-bold mb-4">{currentQuestionData.statement}</h3>
              
//               {/* Media */}
//               {currentQuestionData.media && (
//                 <div className="mb-6 flex-1 flex items-center justify-center">
//                   {currentQuestionData.media.type === 'audio' ? (
//                     <div className="text-center">
//                       <Volume2 className="w-24 h-24 text-blue-500 mx-auto mb-4" />
//                       <p className="text-gray-600">Audio content would play here</p>
//                     </div>
//                   ) : (
//                     <div className="text-center">
//                       <ImageIcon className="w-24 h-24 text-blue-500 mx-auto mb-4" />
//                       <p className="text-gray-600">Image content would display here</p>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Options */}
//               {currentQuestionData.options && (
//                 <div className="grid grid-cols-2 gap-4 flex-1">
//                   {currentQuestionData.options.map((option, index) => (
//                     <div
//                       key={index}
//                       className={`p-4 rounded-lg border-2 ${
//                         showAnswer && currentQuestionData.correctOption === `Option ${String.fromCharCode(65 + index)}`
//                           ? 'border-green-500 bg-green-50'
//                           : 'border-gray-200 bg-gray-50'
//                       }`}
//                     >
//                       <div className="font-semibold text-sm text-gray-600 mb-1">
//                         Option {String.fromCharCode(65 + index)}
//                       </div>
//                       <div className="text-lg">{option}</div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Rapid Fire Answer */}
//               {currentRoundData.questionType === 'rapid-fire' && showAnswer && (
//                 <div className="mt-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
//                   <div className="font-semibold text-green-700">Correct Answer:</div>
//                   <div className="text-xl text-green-800">{getCorrectAnswer(currentQuestionData)}</div>
//                 </div>
//               )}

//               {/* Control Buttons */}
//               <div className="flex justify-between mt-6">
//                 <button
//                   onClick={() => setShowAnswer(!showAnswer)}
//                   className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
//                 >
//                   {showAnswer ? 'Hide Answer' : 'Show Answer'}
//                 </button>
//                 <button
//                   onClick={nextQuestion}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center"
//                 >
//                   Next <SkipForward className="w-4 h-4 ml-2" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Teams Panel */}
//           <div className="bg-white rounded-lg shadow-md p-4">
//             <h3 className="text-lg font-bold mb-4">Teams & Scores</h3>
//             <div className="space-y-3">
//               {teams.map(team => (
//                 <div key={team.id} className="border rounded-lg p-3">
//                   <div className="flex justify-between items-center mb-2">
//                     <h4 className="font-semibold">{team.name}</h4>
//                     <span className="text-lg font-bold text-blue-600">{team.score}</span>
//                   </div>
                  
//                   {showAnswer && (
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => markTeamAnswer(team.id, true)}
//                         className={`flex-1 py-1 px-3 rounded text-sm flex items-center justify-center ${
//                           teamAnswers[team.id] === true
//                             ? 'bg-green-500 text-white'
//                             : 'bg-gray-200 hover:bg-green-100'
//                         }`}
//                       >
//                         <CheckCircle className="w-4 h-4 mr-1" />
//                         Correct
//                       </button>
//                       <button
//                         onClick={() => markTeamAnswer(team.id, false)}
//                         className={`flex-1 py-1 px-3 rounded text-sm flex items-center justify-center ${
//                           teamAnswers[team.id] === false
//                             ? 'bg-red-500 text-white'
//                             : 'bg-gray-200 hover:bg-red-100'
//                         }`}
//                       >
//                         <XCircle className="w-4 h-4 mr-1" />
//                         Wrong
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ResultsScreen = () => {
//     const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-700 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
//           <div className="text-center mb-8">
//             <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Completed!</h1>
//             <p className="text-xl text-gray-600">Final Results</p>
//           </div>

//           <div className="space-y-4 mb-8">
//             {sortedTeams.map((team, index) => (
//               <div
//                 key={team.id}
//                 className={`flex items-center justify-between p-4 rounded-lg ${
//                   index === 0
//                     ? 'bg-yellow-100 border-2 border-yellow-400'
//                     : index === 1
//                     ? 'bg-gray-100 border-2 border-gray-400'
//                     : index === 2
//                     ? 'bg-orange-100 border-2 border-orange-400'
//                     : 'bg-gray-50 border border-gray-300'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold ${
//                     index === 0
//                       ? 'bg-yellow-500 text-white'
//                       : index === 1
//                       ? 'bg-gray-500 text-white'
//                       : index === 2
//                       ? 'bg-orange-500 text-white'
//                       : 'bg-gray-300 text-gray-700'
//                   }`}>
//                     {index + 1}
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-lg">{team.name}</h3>
//                     <p className="text-sm text-gray-600">{team.members.join(', ')}</p>
//                   </div>
//                 </div>
//                 <div className="text-2xl font-bold text-blue-600">{team.score}</div>
//               </div>
//             ))}
//           </div>

//           <div className="text-center">
//             <button
//               onClick={resetQuiz}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors"
//             >
//               <RotateCcw className="w-5 h-5 mr-2" />
//               Start New Quiz
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="font-sans">
//       {currentScreen === 'welcome' && <WelcomeScreen />}
//       {currentScreen === 'quiz' && <QuizScreen />}
//       {currentScreen === 'results' && <ResultsScreen />}
//     </div>
//   );
// };

// export default QuizStart;

// Grok
// import { Button, Card, Checkbox, Flex, Grid, Image, Select, Text, Title } from "@mantine/core";
// import { ChevronRight } from "lucide-react";
// import React from "react";

// export default function QuizStart() {


//     const quizData = {
//         "quizName": "Testing",
//         "numberOfTeams": 4,
//         "numberOfRounds": 3,
//         "quizMaster": "Dr. John",
//         "teams": [
//           { "id": 1, "name": "Alpha", "members": ["Jack", "Mike", "Alice", "Rose"] },
//           { "id": 2, "name": "Beta", "members": ["Bob", "Mary", "Henry", "Tom"] },
//           { "id": 3, "name": "Gamma", "members": ["Khuraijam Tomba Singh", "Yumnam Chaoba Meitei", "Keithelakpam Thoiba Meitei", "Moirangthem Ibochouba Singh"] },
//           { "id": 4, "name": "Delta", "members": ["Kumar Raj", "Arjun Singh", "Ritesh Patel", "Ramesh Agarwal"] }
//         ],
//         "roundsData": [
//           {
//             "roundNumber": 1,
//             "numberOfQuestions": 3,
//             "questionType": "normal",
//             "questions": [
//               { "statement": "Which planet is known as red planet?", "options": ["Mercury", "Jupiter", "Mars", "Saturn"], "correctOption": "Option C" },
//               { "statement": "Which is the largest planet?", "options": ["Saturn", "Jupiter", "Neptune", "Uranus"], "correctOption": "Option B" },
//               { "statement": "Which is the largest country?", "options": ["China", "Germany", "USA", "Russia"], "correctOption": "Option D" }
//             ]
//           },
//           {
//             "roundNumber": 2,
//             "numberOfQuestions": 2,
//             "questionType": "audio-visual",
//             "questions": [
//               { "statement": "Who sang this song?", "media": { "type": "audio", "name": "", "data": "data:audio/x-m4a;base64," }, "options": ["Priya", "Gita", "Luxmi", "Rita"], "correctOption": "Option A" },
//               { "statement": "Who is in this picture?", "media": { "type": "image", "name": "", "data": "data:image/png;base64," }, "options": ["Ram", "Arjun", "Krishna", "Mahesh"], "correctOption": "Option C" }
//             ]
//           },
//           {
//             "roundNumber": 3,
//             "numberOfQuestions": 2,
//             "questionType": "rapid-fire",
//             "questions": [
//               { "statement": "What is the 2+3?", "correctAnswer": "5" },
//               { "statement": "What comes after saturday?", "correctAnswer": "Sunday" }
//             ]
//           }
//         ]
//       };

//     const [currentRound, setCurrentRound] = React.useState(0);
//     const [currentQuestion, setCurrentQuestion] = React.useState(0);
//     const [scores, setScores] = React.useState({});
//     const [isAnswerRevealed, setIsAnswerRevealed] = React.useState(false);
//     const [correctTeams, setCorrectTeams] = React.useState([]);
//     const [selectedTeam, setSelectedTeam] = React.useState(null);
//     const [quizEnded, setQuizEnded] = React.useState(false);

//     const currentRoundData = quizData.roundsData[currentRound];
//     const currentQuestionData = currentRoundData.questions[currentQuestion];

//     const handleRevealAnswer = () => setIsAnswerRevealed(true);

//     const handleNext = () => {
//       if (isAnswerRevealed) {
//         if (currentRoundData.questionType === 'rapid-fire' && selectedTeam !== null) {
//           setScores(prev => ({ ...prev, [selectedTeam]: (prev[selectedTeam] || 0) + 1 }));
//         } else {
//           correctTeams.forEach(teamId => {
//             setScores(prev => ({ ...prev, [teamId]: (prev[teamId] || 0) + 1 }));
//           });
//         }
//         if (currentQuestion < currentRoundData.numberOfQuestions - 1) {
//           setCurrentQuestion(prev => prev + 1);
//         } else if (currentRound < quizData.numberOfRounds - 1) {
//           setCurrentRound(prev => prev + 1);
//           setCurrentQuestion(0);
//         } else {
//           setQuizEnded(true);
//         }
//         setIsAnswerRevealed(false);
//         setCorrectTeams([]);
//         setSelectedTeam(null);
//       }
//     };

//     const renderQuestion = () => {
//       const { statement, options, media, correctOption, correctAnswer } = currentQuestionData;
//       const correctIndex = correctOption ? correctOption.split(' ')[1].charCodeAt(0) - 65 : -1;

//       return (
//         <Card shadow="sm" p="lg" style={{ height: '100%', overflow: 'hidden' }}>
//           <Title order={3}>{statement}</Title>
//           {media && media.type === 'audio' && (
//             <audio controls src={media.data} style={{ marginTop: '10px' }} />
//           )}
//           {media && media.type === 'image' && (
//             <Image src={media.data} alt="Question media" fit="contain" style={{ maxHeight: '200px', marginTop: '10px' }} />
//           )}
//           {options && (
//             <div style={{ marginTop: '10px' }}>
//               {options.map((option, index) => {
//                 const isCorrect = isAnswerRevealed && index === correctIndex;
//                 return (
//                   <Text key={index} style={{ color: isCorrect ? 'green' : 'black' }}>
//                     {String.fromCharCode(65 + index)}. {option} {isCorrect && '(Correct)'}
//                   </Text>
//                 );
//               })}
//             </div>
//           )}
//           {isAnswerRevealed && correctAnswer && (
//             <Text style={{ marginTop: '10px' }}>Correct Answer: {correctAnswer}</Text>
//           )}
//         </Card>
//       );
//     };

//     const renderScoreboard = () => (
//       <Card shadow="sm" p="lg" style={{ marginBottom: '20px' }}>
//         <Title order={4}>Scoreboard</Title>
//         {quizData.teams.map(team => (
//           <Text key={team.id}>{team.name}: {scores[team.id] || 0}</Text>
//         ))}
//       </Card>
//     );

//     const renderControls = () => (
//       <Card shadow="sm" p="lg">
//         {!isAnswerRevealed ? (
//           <Button onClick={handleRevealAnswer}>Reveal Answer</Button>
//         ) : (
//           <>
//             {currentRoundData.questionType === 'rapid-fire' ? (
//               <Select
//                 label="Select team that answered correctly"
//                 placeholder="Select team"
//                 data={quizData.teams.map(team => ({ value: team.id.toString(), label: team.name }))}
//                 value={selectedTeam?.toString() || null}
//                 onChange={value => setSelectedTeam(value ? parseInt(value) : null)}
//                 style={{ marginBottom: '10px' }}
//               />
//             ) : (
//               <div>
//                 <Text>Mark teams that answered correctly:</Text>
//                 {quizData.teams.map(team => (
//                   <Checkbox
//                     key={team.id}
//                     label={team.name}
//                     checked={correctTeams.includes(team.id)}
//                     onChange={event => {
//                       if (event.currentTarget.checked) {
//                         setCorrectTeams(prev => [...prev, team.id]);
//                       } else {
//                         setCorrectTeams(prev => prev.filter(id => id !== team.id));
//                       }
//                     }}
//                     style={{ marginTop: '5px' }}
//                   />
//                 ))}
//               </div>
//             )}
//             <Button onClick={handleNext} mt="md" rightSection={<ChevronRight />}>
//               Next Question
//             </Button>
//           </>
//         )}
//       </Card>
//     );

//     if (quizEnded) {
//       return (
//         <Flex direction="column" align="center" justify="center" style={{ height: '100vh' }}>
//           <Title>Quiz Ended</Title>
//           {renderScoreboard()}
//         </Flex>
//       );
//     }

//     return (
//       <Grid style={{ height: '100vh', padding: '20px' }}>
//         <Grid.Col span={8}>
//           {renderQuestion()}
//         </Grid.Col>
//         <Grid.Col span={4}>
//           {renderScoreboard()}
//           {renderControls()}
//         </Grid.Col>
//       </Grid>
//     );
// }



  