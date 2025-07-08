// import React, { useState, useEffect } from 'react';
// import { Clock, Users, Trophy, Play, Pause, SkipForward, Volume2, Image, FileText, Zap } from 'lucide-react';
// import SetupScreen from './SetupQuiz';

// const QuizApp = () => {
//   const [currentView, setCurrentView] = useState('setup');
//   const [currentRound, setCurrentRound] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [isTimerRunning, setIsTimerRunning] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [rapidFireAnswer, setRapidFireAnswer] = useState('');
//   const [questionStartTime, setQuestionStartTime] = useState(0);
//   const [answerSubmitted, setAnswerSubmitted] = useState(false);

//   // Quiz configuration
//   const [quizConfig, setQuizConfig] = useState({
//     eventName: 'Annual Inter-School Quiz Competition',
//     schoolName: 'St. Mary\'s High School',
//     schoolLogo: '🏫',
//     quizMaster: {
//       name: 'Dr. Sarah Johnson',
//       photo: '👩‍🏫'
//     },
//     date: '2025-07-15',
//     venue: 'Main Auditorium',
//     teams: [
//       { id: 1, name: 'Team Alpha', participants: [
//         { name: 'Alice Johnson', photo: '👩‍🎓' },
//         { name: 'Bob Smith', photo: '👨‍🎓' }
//       ], score: 0 },
//       { id: 2, name: 'Team Beta', participants: [
//         { name: 'Charlie Brown', photo: '👨‍🎓' },
//         { name: 'Diana Prince', photo: '👩‍🎓' }
//       ], score: 0 },
//       { id: 3, name: 'Team Gamma', participants: [
//         { name: 'Eve Wilson', photo: '👩‍🎓' },
//         { name: 'Frank Miller', photo: '👨‍🎓' }
//       ], score: 0 },
//       { id: 4, name: 'Team Delta', participants: [
//         { name: 'Grace Lee', photo: '👩‍🎓' },
//         { name: 'Henry Ford', photo: '👨‍🎓' }
//       ], score: 0 }
//     ]
//   });

//   const [rounds] = useState([
//     {
//       id: 1,
//       name: 'Science & Technology',
//       type: 'normal',
//       timeLimit: 30,
//       points: {
//         correct: 10,
//         wrong: -2,
//         bonus: 5, // Extra points for answering within first 10 seconds
//         pass: 0
//       },
//       questions: [
//         {
//           question: 'What is the chemical symbol for gold?',
//           options: ['Au', 'Ag', 'Go', 'Gd'],
//           correct: 0
//         },
//         {
//           question: 'Which planet is known as the Red Planet?',
//           options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
//           correct: 1
//         },
//         {
//           question: 'What does CPU stand for?',
//           options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
//           correct: 0
//         }
//       ]
//     },
//     {
//       id: 2,
//       name: 'Audio/Visual Round',
//       type: 'audio_visual',
//       timeLimit: 45,
//       points: {
//         correct: 15,
//         wrong: -3,
//         bonus: 10, // Extra points for answering within first 15 seconds
//         pass: 0
//       },
//       questions: [
//         {
//           question: 'Identify this famous landmark',
//           media: '🗽',
//           mediaType: 'image',
//           options: ['Big Ben', 'Eiffel Tower', 'Statue of Liberty', 'Christ the Redeemer'],
//           correct: 2
//         },
//         {
//           question: 'What movie does this sound represent?',
//           media: '🎵',
//           mediaType: 'audio',
//           options: ['Jaws', 'Star Wars', 'Titanic', 'The Lion King'],
//           correct: 1
//         }
//       ]
//     },
//     {
//       id: 3,
//       name: 'History & Geography',
//       type: 'normal',
//       timeLimit: 30,
//       points: {
//         correct: 10,
//         wrong: -2,
//         bonus: 5,
//         pass: 0
//       },
//       questions: [
//         {
//           question: 'In which year did World War II end?',
//           options: ['1944', '1945', '1946', '1947'],
//           correct: 1
//         },
//         {
//           question: 'What is the capital of Australia?',
//           options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
//           correct: 2
//         }
//       ]
//     },
//     {
//       id: 4,
//       name: 'Rapid Fire Round',
//       type: 'rapid_fire',
//       timeLimit: 5,
//       points: {
//         correct: 5,
//         wrong: 0, // No penalty for wrong answers in rapid fire
//         bonus: 2, // Extra points for very quick answers
//         pass: 0 // Not applicable for rapid fire
//       },
//       questions: [
//         { question: 'What is 15 + 27?', correct: '42' },
//         { question: 'Name the first President of the United States', correct: 'George Washington' },
//         { question: 'What is the largest ocean on Earth?', correct: 'Pacific Ocean' },
//         { question: 'How many continents are there?', correct: '7' },
//         { question: 'What gas do plants absorb from the atmosphere?', correct: 'Carbon dioxide' }
//       ]
//     },
//     {
//       id: 5,
//       name: 'Literature & Arts',
//       type: 'normal',
//       timeLimit: 30,
//       points: {
//         correct: 10,
//         wrong: -2,
//         bonus: 5,
//         pass: 0
//       },
//       questions: [
//         {
//           question: 'Who wrote "Romeo and Juliet"?',
//           options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
//           correct: 1
//         },
//         {
//           question: 'Which artist painted the Mona Lisa?',
//           options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
//           correct: 2
//         }
//       ]
//     }
//   ]);

//   // Timer effect
//   useEffect(() => {
//     let interval;
//     if (isTimerRunning && timeLeft > 0) {
//       interval = setInterval(() => {
//         setTimeLeft(prev => prev - 1);
//       }, 1000);
//     } else if (timeLeft === 0 && isTimerRunning) {
//       setIsTimerRunning(false);
//       if (rounds[currentRound].type === 'rapid_fire') {
//         handleRapidFireTimeout();
//       }
//     }
//     return () => clearInterval(interval);
//   }, [isTimerRunning, timeLeft, currentRound]);

//   const startQuiz = () => {
//     setCurrentView('quiz');
//     setCurrentRound(0);
//     setCurrentQuestion(0);
//     startTimer();
//   };

//   const startTimer = () => {
//     const currentRoundData = rounds[currentRound];
//     setTimeLeft(currentRoundData.timeLimit);
//     setIsTimerRunning(true);
//     setSelectedAnswer(null);
//     setShowAnswer(false);
//     setRapidFireAnswer('');
//     setQuestionStartTime(Date.now());
//     setAnswerSubmitted(false);
//   };

//   const pauseTimer = () => {
//     setIsTimerRunning(false);
//   };

//   const resumeTimer = () => {
//     setIsTimerRunning(true);
//   };

//   const handleAnswerSelect = (answerIndex) => {
//     setSelectedAnswer(answerIndex);
//     setAnswerSubmitted(true);
//   };

//   const handleRapidFireSubmit = () => {
//     setIsTimerRunning(false);
//     setShowAnswer(true);
//     setAnswerSubmitted(true);
//   };

//   const handleRapidFireTimeout = () => {
//     setShowAnswer(true);
//     setAnswerSubmitted(true);
//   };

//   const revealAnswer = () => {
//     setShowAnswer(true);
//     setIsTimerRunning(false);
//   };

//   const calculatePoints = (teamAnswer, isCorrect, timeTaken) => {
//     const currentRoundData = rounds[currentRound];
//     const points = currentRoundData.points;
    
//     if (!answerSubmitted) {
//       return points.pass; // No answer submitted
//     }
    
//     let totalPoints = 0;
    
//     if (isCorrect) {
//       totalPoints += points.correct;
//       // Bonus points for quick answers
//       const bonusThreshold = currentRoundData.type === 'rapid_fire' ? 3 : 
//                             currentRoundData.type === 'audio_visual' ? 15 : 10;
//       if (timeTaken <= bonusThreshold) {
//         totalPoints += points.bonus;
//       }
//     } else {
//       totalPoints += points.wrong;
//     }
    
//     return totalPoints;
//   };

//   const awardPointsToTeam = (teamId, isCorrect) => {
//     const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
//     const points = calculatePoints(null, isCorrect, timeTaken);
//     updateTeamScore(teamId, points);
//   };

//   const nextQuestion = () => {
//     const currentRoundData = rounds[currentRound];
//     if (currentQuestion < currentRoundData.questions.length - 1) {
//       setCurrentQuestion(prev => prev + 1);
//       startTimer();
//     } else {
//       nextRound();
//     }
//   };

//   const nextRound = () => {
//     if (currentRound < rounds.length - 1) {
//       setCurrentRound(prev => prev + 1);
//       setCurrentQuestion(0);
//       startTimer();
//     } else {
//       setCurrentView('results');
//     }
//   };

//   const passQuestion = () => {
//     const currentRoundData = rounds[currentRound];
//     if (currentRoundData.type !== 'rapid_fire') {
//       nextQuestion();
//     }
//   };

//   const updateTeamScore = (teamId: number, points: number) => {
//     console.log(teamId, points);
//     setQuizConfig(prev => ({
//       ...prev,
//       teams: prev.teams.map(team => 
//         team.id === teamId 
//           ? { ...team, score: team.score + points }
//           : team
//       )
//     }));
//   };

//   const getRoundIcon = (type) => {
//     switch (type) {
//       case 'audio_visual': return <Volume2 className="w-5 h-5" />;
//       case 'rapid_fire': return <Zap className="w-5 h-5" />;
//       default: return <FileText className="w-5 h-5" />;
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (currentView === 'setup') {
//     return (
//       // <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
//       //   <div className="container mx-auto px-4 py-8">
//       //     {/* Header */}
//       //     <div className="text-center mb-12">
//       //       <div className="text-6xl mb-4">{quizConfig.schoolLogo}</div>
//       //       <h1 className="text-4xl font-bold mb-2">{quizConfig.eventName}</h1>
//       //       <p className="text-xl text-blue-200">{quizConfig.schoolName}</p>
//       //       <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-300">
//       //         <span>📅 {quizConfig.date}</span>
//       //         <span>📍 {quizConfig.venue}</span>
//       //       </div>
//       //     </div>

//       //     {/* Quiz Master */}
//       //     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 text-center">
//       //       <div className="text-4xl mb-2">{quizConfig.quizMaster.photo}</div>
//       //       <h3 className="text-lg font-semibold">Quiz Master</h3>
//       //       <p className="text-blue-200">{quizConfig.quizMaster.name}</p>
//       //     </div>

//       //     {/* Teams */}
//       //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//       //       {quizConfig.teams.map(team => (
//       //         <div key={team.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
//       //           <h3 className="text-lg font-bold mb-4 text-yellow-300">{team.name}</h3>
//       //           <div className="space-y-3">
//       //             {team.participants.map((participant, idx) => (
//       //               <div key={idx} className="flex items-center justify-center gap-3">
//       //                 <span className="text-2xl">{participant.photo}</span>
//       //                 <span className="text-sm">{participant.name}</span>
//       //               </div>
//       //             ))}
//       //           </div>
//       //           <div className="mt-4 text-2xl font-bold text-green-400">
//       //             Score: {team.score}
//       //           </div>
//       //         </div>
//       //       ))}
//       //     </div>

//       //     {/* Rounds Preview */}
//       //     <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
//       //       <h3 className="text-xl font-bold mb-4 text-center">Quiz Rounds</h3>
//       //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//       //         {rounds.map((round, idx) => (
//       //           <div key={round.id} className="bg-white/10 rounded-xl p-4">
//       //             <div className="flex items-center gap-3 mb-3">
//       //               {getRoundIcon(round.type)}
//       //               <div>
//       //                 <h4 className="font-semibold">Round {idx + 1}</h4>
//       //                 <p className="text-sm text-gray-300">{round.name}</p>
//       //                 <p className="text-xs text-gray-400 capitalize">{round.type.replace('_', ' ')}</p>
//       //               </div>
//       //             </div>
//       //             <div className="text-xs text-gray-300 space-y-1">
//       //               <div className="flex justify-between">
//       //                 <span>Correct:</span>
//       //                 <span className="text-green-400">+{round.points.correct}</span>
//       //               </div>
//       //               <div className="flex justify-between">
//       //                 <span>Wrong:</span>
//       //                 <span className="text-red-400">{round.points.wrong}</span>
//       //               </div>
//       //               <div className="flex justify-between">
//       //                 <span>Bonus:</span>
//       //                 <span className="text-yellow-400">+{round.points.bonus}</span>
//       //               </div>
//       //             </div>
//       //           </div>
//       //         ))}
//       //       </div>
//       //     </div>

//       //     {/* Start Button */}
//       //     <div className="text-center">
//       //       <button
//       //         onClick={startQuiz}
//       //         className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-4 rounded-full text-xl font-bold flex items-center gap-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
//       //       >
//       //         <Play className="w-6 h-6" />
//       //         Start Quiz
//       //       </button>
//       //     </div>
//       //   </div>
//       // </div>

//       <SetupScreen
//         quizConfig={quizConfig}
//         rounds={rounds}
//         onStartQuiz={startQuiz}
//         // getRoundIcon={getRoundIcon}
//       />
//     );
//   }

//   if (currentView === 'quiz') {
//     const currentRoundData = rounds[currentRound];
//     const currentQuestionData = currentRoundData.questions[currentQuestion];

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
//         <div className="container mx-auto px-4 py-8">
//           {/* Header */}
//           <div className="flex justify-between items-center mb-8">
//             <div>
//               <h1 className="text-2xl font-bold">{quizConfig.eventName}</h1>
//               <p className="text-blue-200">{quizConfig.schoolName}</p>
//             </div>
//             <div className="text-right">
//               <div className="text-lg font-semibold">Round {currentRound + 1}: {currentRoundData.name}</div>
//               <div className="text-sm text-gray-300">Question {currentQuestion + 1} of {currentRoundData.questions.length}</div>
//             </div>
//           </div>

//           {/* Timer */}
//           <div className="text-center mb-8">
//             <div className={`text-6xl font-bold mb-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
//               {formatTime(timeLeft)}
//             </div>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={isTimerRunning ? pauseTimer : resumeTimer}
//                 className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2"
//               >
//                 {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                 {isTimerRunning ? 'Pause' : 'Resume'}
//               </button>
//               {currentRoundData.type !== 'rapid_fire' && (
//                 <button
//                   onClick={passQuestion}
//                   className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2"
//                 >
//                   <SkipForward className="w-4 h-4" />
//                   Pass
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Question */}
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
//             <div className="text-center mb-6">
//               <div className="flex justify-center items-center gap-2 mb-4">
//                 {getRoundIcon(currentRoundData.type)}
//                 <span className="text-sm uppercase tracking-wide text-gray-300">
//                   {currentRoundData.type.replace('_', ' ')} Round
//                 </span>
//               </div>
              
//               {currentRoundData.type === 'audio_visual' && currentQuestionData.media && (
//                 <div className="text-8xl mb-6">{currentQuestionData.media}</div>
//               )}
              
//               <h2 className="text-2xl font-bold mb-6">{currentQuestionData.question}</h2>
//             </div>

//             {/* Answers */}
//             {currentRoundData.type === 'rapid_fire' ? (
//               <div className="max-w-md mx-auto">
//                 <input
//                   type="text"
//                   value={rapidFireAnswer}
//                   onChange={(e) => setRapidFireAnswer(e.target.value)}
//                   placeholder="Type your answer..."
//                   className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 text-lg"
//                   disabled={showAnswer}
//                 />
//                 <button
//                   onClick={handleRapidFireSubmit}
//                   disabled={showAnswer || !rapidFireAnswer.trim()}
//                   className="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 px-4 py-3 rounded-lg font-bold"
//                 >
//                   Submit Answer
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
//                 {currentQuestionData.options.map((option, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => handleAnswerSelect(idx)}
//                     disabled={showAnswer}
//                     className={`p-4 rounded-lg text-left transition-all duration-300 ${
//                       showAnswer
//                         ? idx === currentQuestionData.correct
//                           ? 'bg-green-500 text-white'
//                           : selectedAnswer === idx
//                           ? 'bg-red-500 text-white'
//                           : 'bg-white/20 text-gray-300'
//                         : selectedAnswer === idx
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-white/20 hover:bg-white/30 text-white'
//                     }`}
//                   >
//                     <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
//                     {option}
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Show Answer Button */}
//             {!showAnswer && currentRoundData.type !== 'rapid_fire' && (
//               <div className="text-center mt-6">
//                 <button
//                   onClick={revealAnswer}
//                   className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"
//                 >
//                   Reveal Answer
//                 </button>
//               </div>
//             )}

//             {/* Answer Revealed */}
//             {showAnswer && (
//               <div className="mt-8 p-6 bg-white/20 rounded-xl">
//                 <div className="text-center mb-6">
//                   <h3 className="text-lg font-bold mb-4 text-green-400">Correct Answer:</h3>
//                   <p className="text-xl mb-4">
//                     {currentRoundData.type === 'rapid_fire' 
//                       ? currentQuestionData.correct 
//                       : `${String.fromCharCode(65 + currentQuestionData.correct)}. ${currentQuestionData.options[currentQuestionData.correct]}`
//                     }
//                   </p>
                  
//                   {/* Points Information */}
//                   <div className="bg-white/10 rounded-lg p-4 mb-6">
//                     <h4 className="font-bold mb-2">Points System for this Round:</h4>
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
//                       <div className="text-green-400">
//                         <span className="font-semibold">Correct:</span> +{currentRoundData.points.correct}
//                       </div>
//                       <div className="text-red-400">
//                         <span className="font-semibold">Wrong:</span> {currentRoundData.points.wrong}
//                       </div>
//                       <div className="text-yellow-400">
//                         <span className="font-semibold">Bonus:</span> +{currentRoundData.points.bonus}
//                       </div>
//                       <div className="text-gray-400">
//                         <span className="font-semibold">Pass:</span> {currentRoundData.points.pass}
//                       </div>
//                     </div>
//                     <p className="text-xs text-gray-300 mt-2">
//                       Bonus points awarded for quick answers (within {
//                         currentRoundData.type === 'rapid_fire' ? '3' : 
//                         currentRoundData.type === 'audio_visual' ? '15' : '10'
//                       } seconds)
//                     </p>
//                   </div>
//                 </div>
                
//                 {/* Score Update */}
//                 <div className="text-center">
//                   <h4 className="font-bold mb-4">Award Points to Teams:</h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {quizConfig.teams.map(team => (
//                       <div key={team.id} className="bg-white/10 rounded-lg p-4">
//                         <div className="font-semibold mb-3">{team.name}</div>
//                         <div className="flex flex-wrap gap-2 justify-center">
//                           <button
//                             onClick={() => awardPointsToTeam(team.id, true)}
//                             className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm flex items-center gap-1"
//                           >
//                             ✓ Correct
//                             <span className="text-xs">
//                               (+{currentRoundData.points.correct}
//                               {answerSubmitted && (Date.now() - questionStartTime) / 1000 <= (currentRoundData.type === 'rapid_fire' ? 3 : currentRoundData.type === 'audio_visual' ? 15 : 10) ? `+${currentRoundData.points.bonus}` : ''}
//                               )
//                             </span>
//                           </button>
//                           <button
//                             onClick={() => awardPointsToTeam(team.id, false)}
//                             className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm flex items-center gap-1"
//                           >
//                             ✗ Wrong
//                             <span className="text-xs">({currentRoundData.points.wrong})</span>
//                           </button>
//                           <button
//                             onClick={() => updateTeamScore(team.id, currentRoundData.points.pass)}
//                             className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm flex items-center gap-1"
//                           >
//                             Pass
//                             <span className="text-xs">({currentRoundData.points.pass})</span>
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="text-center mt-6">
//                   <button
//                     onClick={nextQuestion}
//                     className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-bold"
//                   >
//                     {currentQuestion < currentRoundData.questions.length - 1 ? 'Next Question' : 'Next Round'}
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Team Scores */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {quizConfig.teams.map(team => (
//               <div key={team.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
//                 <h3 className="font-bold text-yellow-300">{team.name}</h3>
//                 <div className="text-2xl font-bold text-green-400">{team.score}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (currentView === 'results') {
//     const sortedTeams = [...quizConfig.teams].sort((a, b) => b.score - a.score);
    
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center mb-12">
//             <div className="text-6xl mb-4">🏆</div>
//             <h1 className="text-4xl font-bold mb-2">Quiz Results</h1>
//             <p className="text-xl text-blue-200">{quizConfig.eventName}</p>
//           </div>

//           {/* Podium */}
//           <div className="max-w-4xl mx-auto mb-12">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//               {sortedTeams.map((team, idx) => (
//                 <div key={team.id} className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center ${
//                   idx === 0 ? 'md:col-span-4 lg:col-span-1 order-2 md:order-1' : ''
//                 }`}>
//                   <div className="text-4xl mb-4">
//                     {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🏅'}
//                   </div>
//                   <h3 className="text-xl font-bold mb-2 text-yellow-300">{team.name}</h3>
//                   <div className="text-3xl font-bold text-green-400 mb-4">{team.score}</div>
//                   <div className="space-y-2">
//                     {team.participants.map((participant, pIdx) => (
//                       <div key={pIdx} className="flex items-center justify-center gap-2">
//                         <span className="text-lg">{participant.photo}</span>
//                         <span className="text-sm">{participant.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Congratulations */}
//           <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
//             <h2 className="text-2xl font-bold mb-4">Congratulations to all participants!</h2>
//             <p className="text-gray-300 mb-6">Thank you for participating in {quizConfig.eventName}</p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setCurrentView('setup')}
//                 className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold"
//               >
//                 New Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default QuizApp;