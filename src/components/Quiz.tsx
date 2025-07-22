import { useEffect, useState } from "react";
import { quizData, roundsData } from "../mock-data";
import { Pause, Play, SkipForward } from "lucide-react";
import { getRoundIcon } from "./RoundIcon";
import { useNavigate } from "react-router-dom";
import type { Question } from "../types";

// Type for rounds data
interface Round {
  id: number;
  name: string;
  type: 'normal' | 'audio_visual' | 'rapid_fire';
  timeLimit: number;
  points: {
    correct: number;
    wrong: number;
    bonus: number;
    pass: number;
  };
  questions: Question[];
}

// Type assertion for roundsData
const typedRoundsData = roundsData as unknown as Round[];

function Quiz() {

  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [rapidFireAnswer, setRapidFireAnswer] = useState('');
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const [quiz, setQuizData] = useState(quizData)
  const rounds = typedRoundsData;
  const currentRoundData = rounds[currentRound];
  const currentQuestionData = currentRoundData.questions[currentQuestion];

  const startQuiz = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    startTimer();
  };


  useEffect(() => {
    startQuiz();
  }, []);

    // Timer effect
    useEffect(() => {
      let interval: NodeJS.Timeout | undefined;
      if (isTimerRunning && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft(prev => prev - 1);
        }, 1000);
      } else if (timeLeft === 0 && isTimerRunning) {
        setIsTimerRunning(false);
        if (rounds[currentRound].type === 'rapid_fire') {
          handleRapidFireTimeout();
        }
      }
      return () => clearInterval(interval);
    }, [isTimerRunning, timeLeft, currentRound]);

    const handleRapidFireTimeout = () => {
      setShowAnswer(true);
      setAnswerSubmitted(true);
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const pauseTimer = () => {
      setIsTimerRunning(false);
    };
  
    const resumeTimer = () => {
      setIsTimerRunning(true);
    };

  const nextQuestion = () => {
    const currentRoundData = rounds[currentRound];
    if (currentQuestion < currentRoundData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      startTimer();
    } else {
      nextRound();
    }
  };

  const navigate = useNavigate();

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
      setCurrentQuestion(0);
      startTimer();
    } else {
      navigate('/results');
    }
  };

  const startTimer = () => {
    const currentRoundData = rounds[currentRound];
    setTimeLeft(currentRoundData.timeLimit);
    setIsTimerRunning(true);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setRapidFireAnswer('');
    setQuestionStartTime(Date.now());
    setAnswerSubmitted(false);
  };

  const handleAnswerSelect = (answerIndex: any) => {
    setSelectedAnswer(answerIndex);
    setAnswerSubmitted(true);
  };

  const revealAnswer = () => {
    setShowAnswer(true);
    setIsTimerRunning(false);
  };

  const awardPointsToTeam = (teamId: any, isCorrect: any) => {
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
    const points = calculatePoints(isCorrect, timeTaken);
    updateTeamScore(teamId, points);
  };

  const updateTeamScore = (teamId: number, points: number) => {
    console.log(teamId, points);
    setQuizData(prev => ({
      ...prev,
      teams: prev.teams.map(team => 
        team.id === teamId 
          ? { ...team, score: team.score + points }
          : team
      )
    }));
  };

  const calculatePoints = ( isCorrect: any, timeTaken: any) => {
    const currentRoundData = rounds[currentRound];
    const points = currentRoundData.points;
    
    if (!answerSubmitted) {
      return points.pass; // No answer submitted
    }
    
    let totalPoints = 0;
    
    if (isCorrect) {
      totalPoints += points.correct;
      // Bonus points for quick answers
      const bonusThreshold = currentRoundData.type === 'rapid_fire' ? 3 : 
                            currentRoundData.type === 'audio_visual' ? 15 : 10;
      if (timeTaken <= bonusThreshold) {
        totalPoints += points.bonus;
      }
    } else {
      totalPoints += points.wrong;
    }
    
    return totalPoints;
  };


    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold">{quiz.eventName}</h1>
              <p className="text-blue-200">{quiz.schoolName}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold">Round {currentRound + 1}: {currentRoundData.name}</div>
              <div className="text-sm text-gray-300">Question {currentQuestion + 1} of {currentRoundData.questions.length}</div>
            </div>
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-4 ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-green-400'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={isTimerRunning ? pauseTimer : resumeTimer}
                className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isTimerRunning ? 'Pause' : 'Resume'}
              </button>
              {currentRoundData.type !== 'rapid_fire' && (
                <button
                  onClick={()=>{
                    const currentRoundData = rounds[currentRound];
    if (currentRoundData.type !== 'rapid_fire') {
      nextQuestion();
    }}}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Pass
                </button>
              )}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <div className="flex justify-center items-center gap-2 mb-4">
                {getRoundIcon(currentRoundData.type)}
                <span className="text-sm uppercase tracking-wide text-gray-300">
                  {currentRoundData.type.replace('_', ' ')} Round
                </span>
              </div>
              
              {currentRoundData.type === 'audio_visual' && currentQuestionData.media && (
                <div className="text-8xl mb-6">{currentQuestionData.media}</div>
              )}
              
              <h2 className="text-2xl font-bold mb-6">{currentQuestionData.question}</h2>
            </div>

            {/* Answers */}
            {currentRoundData.type === 'rapid_fire' ? (
              <div className="max-w-md mx-auto">
                <input
                  type="text"
                  value={rapidFireAnswer}
                  onChange={(e) => setRapidFireAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 text-lg"
                  disabled={showAnswer}
                />
                <button
                  // onClick={handleRapidFireSubmit}
                  disabled={showAnswer || !rapidFireAnswer.trim()}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 px-4 py-3 rounded-lg font-bold"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {currentQuestionData.options?.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerSelect(idx)}
                    disabled={showAnswer}
                    className={`p-4 rounded-lg text-left transition-all duration-300 ${
                      showAnswer
                        ? idx === currentQuestionData.correct
                          ? 'bg-green-500 text-white'
                          : selectedAnswer === idx
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-gray-300'
                        : selectedAnswer === idx
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    <span className="font-bold mr-3">{String.fromCharCode(65 + idx)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            )}

            {/* Show Answer Button */}
            {!showAnswer && currentRoundData.type !== 'rapid_fire' && (
              <div className="text-center mt-6">
                <button
                  onClick={revealAnswer}
                  className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-bold"
                >
                  Reveal Answer
                </button>
              </div>
            )}

            {/* Answer Revealed */}
            {showAnswer && (
              <div className="mt-8 p-6 bg-white/20 rounded-xl">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold mb-4 text-green-400">Correct Answer:</h3>
                  <p className="text-xl mb-4">
                    {currentRoundData.type === 'rapid_fire' 
                      ? String(currentQuestionData.correct)
                      : currentQuestionData.options && typeof currentQuestionData.correct === 'number'
                        ? `${String.fromCharCode(65 + currentQuestionData.correct)}. ${currentQuestionData.options[currentQuestionData.correct]}`
                        : 'No answer available'
                    }
                  </p>
                  
                  {/* Points Information */}
                  <div className="bg-white/10 rounded-lg p-4 mb-6">
                    <h4 className="font-bold mb-2">Points System for this Round:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div className="text-green-400">
                        <span className="font-semibold">Correct:</span> +{currentRoundData.points.correct}
                      </div>
                      <div className="text-red-400">
                        <span className="font-semibold">Wrong:</span> {currentRoundData.points.wrong}
                      </div>
                      <div className="text-yellow-400">
                        <span className="font-semibold">Bonus:</span> +{currentRoundData.points.bonus}
                      </div>
                      <div className="text-gray-400">
                        <span className="font-semibold">Pass:</span> {currentRoundData.points.pass}
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 mt-2">
                      Bonus points awarded for quick answers (within {
                        currentRoundData.type === 'rapid_fire' ? '3' : 
                        currentRoundData.type === 'audio_visual' ? '15' : '10'
                      } seconds)
                    </p>
                  </div>
                </div>
                
                {/* Score Update */}
                <div className="text-center">
                  <h4 className="font-bold mb-4">Award Points to Teams:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quiz.teams.map(team => (
                      <div key={team.id} className="bg-white/10 rounded-lg p-4">
                        <div className="font-semibold mb-3">{team.name}</div>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <button
                            onClick={() => awardPointsToTeam(team.id, true)}
                            className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm flex items-center gap-1"
                          >
                            ✓ Correct
                            <span className="text-xs">
                              (+{currentRoundData.points.correct}
                              {answerSubmitted && (Date.now() - questionStartTime) / 1000 <= (currentRoundData.type === 'rapid_fire' ? 3 : currentRoundData.type === 'audio_visual' ? 15 : 10) ? `+${currentRoundData.points.bonus}` : ''}
                              )
                            </span>
                          </button>
                          <button
                            onClick={() => awardPointsToTeam(team.id, false)}
                            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm flex items-center gap-1"
                          >
                            ✗ Wrong
                            <span className="text-xs">({currentRoundData.points.wrong})</span>
                          </button>
                          <button
                            onClick={() => updateTeamScore(team.id, currentRoundData.points.pass)}
                            className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm flex items-center gap-1"
                          >
                            Pass
                            <span className="text-xs">({currentRoundData.points.pass})</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={nextQuestion}
                    className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-lg font-bold"
                  >
                    {currentQuestion < currentRoundData.questions.length - 1 ? 'Next Question' : 'Next Round'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Team Scores */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quiz.teams.map(team => (
              <div key={team.id} className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                <h3 className="font-bold text-yellow-300">{team.name}</h3>
                <div className="text-2xl font-bold text-green-400">{team.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}

export default Quiz;
