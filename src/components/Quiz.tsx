import { useEffect, useState } from "react";
// import { quizData } from "../mock-data";
import { Check, SkipForward, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css"; 


type Scores = {
  [key: string]: number;  // or [key: number]: number if team IDs are numbers
};



import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Paper,
  Box,
  Badge,
  Center,
  Flex,
  Divider,
  SimpleGrid,
  Space} from '@mantine/core';
import { getQuestionTypeColor } from "./QuestionTypeColor";
import { getQuestionTypeIcon } from "./QuestionTypeIcon";

function Quiz() {

  const navigate = useNavigate();
  const location = useLocation();
  const { quizData } = location.state || {};

  const [currentRound, setCurrentRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [rapidFireAnswer, setRapidFireAnswer] = useState('');
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // const [quiz,] = useState(quizData); // quiz data from mock-data
  const quiz = quizData;
  const rounds = quiz.roundsData;
  const currentRoundData = rounds[currentRound];
  const currentQuestionData = currentRoundData.questions[currentQuestion];

  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const currentTeam = quiz.teams[currentTeamIndex];

  const [passCount, setPassCount] = useState(0);
  const [hasPassed, setHasPassed] = useState(false);
  const allTeamsTried = passCount >= quiz.teams.length - 1;

  const [scores, setScores] = useState<Scores>(quiz.teams.reduce((acc: any, team: any) => ({ ...acc, [team.id]: 0 }), {}));
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [showRapidFireAnswer, setShowRapidFireAnswer] = useState(false);
  const [isRapidFireAnswered, setIsRapidFireAnswered] = useState(false);


  const startQuiz = () => {
    setCurrentRound(0);
    setCurrentQuestion(0);
    startTimer();
  };


  useEffect(() => {
    startQuiz();
  }, []);

  // Timer effect
  // useEffect(() => {
  //   let interval: NodeJS.Timeout | undefined;
  //   if (isTimerRunning && timeLeft > 0) {
  //     interval = setInterval(() => {
  //       setTimeLeft(prev => prev - 1);
  //     }, 1000);
  //   } else if (timeLeft === 0 && isTimerRunning) {
  //     setIsTimerRunning(false);
  //     if (rounds[currentRound].questionType === 'rapid-fire') {
  //       handleRapidFireTimeout();
  //     }
  //   }
  //   return () => clearInterval(interval);
  // }, [isTimerRunning, timeLeft, currentRound]);

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
    setPassCount(0);
    setIsRapidFireAnswered(false); // Reset rapid fire answer state

    if (!hasPassed) {
      setCurrentTeamIndex((prev) => (prev + 1) % quiz.teams.length);
    }
    setHasPassed(false);

    const currentRoundData = rounds[currentRound];
    if (currentQuestion < currentRoundData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      startTimer();
    } else {
      nextRound();
    }
  };

  const nextRound = () => {
    // setCurrentTeamIndex((prev) => (prev + 1) % quiz.teams.length);
    if (currentRound < rounds.length - 1) {
      setCurrentRound(prev => prev + 1);
      setCurrentQuestion(0);
      startTimer();
    } else {
      navigate('/results', { state: { quizData, scores } });
    }
  };

  const startTimer = () => {
    // const currentRoundData = rounds[currentRound];
    // setTimeLeft(currentRoundData.timeLimit);
    setIsTimerRunning(true);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowRapidFireAnswer(false);
    setRapidFireAnswer('');
    setQuestionStartTime(Date.now());
    setAnswerSubmitted(false);
  };

  const handleAnswerSelect = (answerIndex: any) => {
    setSelectedAnswer(answerIndex);
    setAnswerSubmitted(true);
  };

  const revealAnswer = () => {
    console.log(selectedAnswer, currentQuestionData.correctAnswer);
    setShowAnswer(true);
    setIsTimerRunning(false);

    if (!selectedAnswer) {
      return;
    }

    if (selectedAnswer === currentQuestionData.correctAnswer) {
      markCorrect();
    } else {
      markWrong();
    }
  };

  // const awardPointsToTeam = (teamId: any, isCorrect: any) => {
  //   const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
  //   const points = calculatePoints(isCorrect, timeTaken);
  //   updateTeamScore(teamId, points);
  // };

  // const updateTeamScore = (teamId: number, points: number) => {
  //   console.log(teamId, points);
  //   setQuizData(prev => ({
  //     ...prev,
  //     teams: prev.teams.map(team =>
  //       team.id === teamId
  //         ? { ...team, score: team.score + points }
  //         : team
  //     )
  //   }));
  // };

  // const calculatePoints = (isCorrect: any, timeTaken: any) => {
  //   const currentRoundData = rounds[currentRound];
  //   const points = currentRoundData.points;

  //   if (!answerSubmitted) {
  //     return points.pass; // No answer submitted
  //   }

  //   let totalPoints = 0;

  //   if (isCorrect) {
  //     totalPoints += points.correct;
  //     // Bonus points for quick answers
  //     const bonusThreshold = currentRoundData.type === 'rapid_fire' ? 3 :
  //       currentRoundData.type === 'audio_visual' ? 15 : 10;
  //     if (timeTaken <= bonusThreshold) {
  //       totalPoints += points.bonus;
  //     }
  //   } else {
  //     totalPoints += points.wrong;
  //   }

  //   return totalPoints;
  // };

  const handlePass = () => {
    setHasPassed(true);
    if (!allTeamsTried) {
      setPassCount((prev) => prev + 1);
      setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % quiz.teams.length);
    }
    // setHasPassed(false);
  };

  const markCorrect = () => {
    playCorrectSound();
    let points = 10;

    if (passCount == 1) {
      points = 8;
    } else if (passCount == 2) {
      points = 6;
    } else if (passCount == 3) {
      points = 4;
    }

    setScores(prev => ({
      ...prev,
      [currentTeam.id]: prev[currentTeam.id] + points
    }));
    showToast('Correct!', 'success');
    // nextTeam();
  };

  const markWrong = () => {
    playWrongSound();
    setScores(prev => ({
      ...prev,
      [currentTeam.id]: prev[currentTeam.id] - 5
    }));
    showToast('Wrong!', 'error');
    // nextTeam();
  };

  const showToast = (message: string, type: string) => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // useEffect(() => {
  //   if (toast.show) {
  //     const timer = setTimeout(() => {
  //       setToast({ show: false, message: '', type: '' });
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [toast.show]);

  // console.log("hasPassed:", hasPassed);
  // console.log("passCount:", passCount);
  // console.log("currentTeamIndex:", currentTeamIndex);


  // const playCorrectSound = () => {
  //     new Audio('/sounds/correct.wav').play();
  // };

  // const playWrongSound = () => {
  //   new Audio('/sounds/wrong.wav').play();
  // };

  // For desktop app
  const playCorrectSound = async () => {
    const soundPath = await window.electronAPI.playCorrectSound();
    const audio = new Audio(soundPath);
    audio.play();
  };
  
  // For desktop app
  const playWrongSound = async () => {
    const soundPath = await window.electronAPI.playWrongSound();
    const audio = new Audio(soundPath);
    audio.play();
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #581c87 50%, #312e81 100%)',
        color: 'white',
      }}
    >
      <Center>
        <Stack
          style={{ paddingTop: '1rem', marginBottom: '1rem', textAlign: 'center', gap: 0 }}
        >
          <Title order={2}>
            PARI IMOM KHWAI SHINDAM SHANG
          </Title>
          <Text size="lg">Pangei, Imphal East</Text>
        </Stack>
      </Center>
      <Divider />

      <Container size="xl" px="md" py="md">
        {/* Header */}
        <Flex justify="space-between" align="flex-start">
          <Box>
            <Title order={2} size="1.5rem">
              {quiz.quizName}
            </Title>
            <Text size="lg" style={{ color: '#93c5fd' }}>
              Quiz Master: {quiz.quizMaster}
            </Text>
          </Box>

          <Box style={{ textAlign: 'right' }}>
            <Text size="lg" fw={600}>
              Round {currentRound + 1}: {currentRoundData.roundName}
            </Text>
            <Group gap="xs" justify="center">
              {/* {getQuestionTypeIcon(currentRoundData.questionType)} */}
              <Badge
                variant="outline"
                color={getQuestionTypeColor(currentRoundData.questionType)}
                size="sm"
                style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
              >
                <Flex gap="xs">
                  {getQuestionTypeIcon(currentRoundData.questionType)}{currentRoundData.questionType}
                </Flex>
              </Badge>
              <Text size="sm" style={{ color: '#d1d5db' }}>
                Question {currentQuestion + 1} of {currentRoundData.questions.length}
              </Text>
            </Group>

          </Box>
        </Flex>

        {/* Timer */}
        {/* <Stack align="center" mb="xl">
            <Text
              size="3rem"
              fw={700}
              style={{
                color: timeLeft <= 10 ? '#f87171' : '#4ade80',
                animation: timeLeft <= 10 ? 'pulse 1s infinite' : 'none',
              }}
            >
              {formatTime(timeLeft)}
            </Text>
            <Group gap="md">
              <Button
                onClick={isTimerRunning ? pauseTimer : resumeTimer}
                color="yellow"
                leftSection={isTimerRunning ? <Pause size={16} /> : <Play size={16} />}
              >
                {isTimerRunning ? 'Pause' : 'Resume'}
              </Button>
              {currentRoundData.type !== 'rapid_fire' && (
                <Button
                  onClick={() => {
                    const currentRoundData = rounds[currentRound];
                    if (currentRoundData.type !== 'rapid_fire') {
                      nextQuestion();
                    }
                  }}
                  color="gray"
                  leftSection={<SkipForward size={16} />}
                >
                  Pass
                </Button>
              )}
            </Group>
          </Stack> */}

        {/* {toast.show && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate">
          <div className={`px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 ${
            toast.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {toast.type === 'success' ? (
              <Check className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
            <span className="font-semibold text-lg">{toast.message}</span>
          </div>
        </div>
      )} */}


        {toast.show && (
          <div className="toast-container animate">
            <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
              {toast.type === 'success' ? (
                <Check className="toast-icon" />
              ) : (
                <X className="toast-icon" />
              )}
              <span className="toast-message">{toast.message}</span>
            </div>
          </div>
        )}

        <Title order={2} c="yellow" fw={700} ta="center">
          Question To: {currentTeam.name} {hasPassed ? '(Passed)' : ''}
        </Title>
        <Space h="md" />
        <Flex>
          <Box style={{ flex: 3, }}>
            {/* Question */}
            <Paper
              p="lg"
              mb="xl"
              radius="md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                // border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Stack align="center" mb="sm">
                {currentRoundData.questionType === 'audio-visual' && 'media' in currentQuestionData && currentQuestionData.media && (
                  <Box>
                    {/* Image Preview */}
                    {currentQuestionData.media.type === 'image' && currentQuestionData.media.data && (
                      <img
                        src={currentQuestionData.media.data}
                        alt="Preview"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                      />
                    )}
                    {/* Audio Preview */}
                    {currentQuestionData.media.type === 'audio' && currentQuestionData.media.data && (
                      <audio controls>
                        <source src={currentQuestionData.media.data} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    )}
                  </Box>
                )}

                <Title order={2} size="1.5rem" fw={700} ta="center">
                  {currentQuestionData.statement}
                </Title>
              </Stack>

              {/* Options */}
              {currentRoundData.questionType === 'rapid-fire' ? (
                <Container style={{ margin: '0 auto' }}>
                  {/* <TextInput
                    size="lg"
                    value={rapidFireAnswer}
                    onChange={(e) => setRapidFireAnswer(e.target.value)}
                    placeholder="Type your answer..."
                    disabled={showAnswer}
                    styles={{
                      input: {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: 'white',
                        '&::placeholder': {
                          color: '#d1d5db',
                        },
                      },
                    }}
                  /> */}
                  {/* 
                  {showRapidFireAnswer && (
                    <Box>
                      <Text size="xl" fw={700} ta="center" c="green">
                        {currentQuestionData.correctAnswer}
                      </Text>
                      <Group gap="md" justify="center">
                        <Button color="green">
                          Correct
                        </Button>
                        <Button color="red">
                          Wrong
                        </Button>
                      </Group>
                    </Box>
                  )} */}

                  {showRapidFireAnswer ? (
                    <Center>
                      <Box>
                        <Text size="2rem" fw={700} ta="center" c="green">
                          {currentQuestionData.correctAnswer}
                        </Text>
                        <Group gap="md" justify="center" mt="md">
                          <Button
                            color="green"
                            disabled={isRapidFireAnswered}
                            onClick={() => {
                              showToast('Correct!', 'success');
                              playCorrectSound();
                              setScores(prev => ({
                                ...prev,
                                [currentTeam.id]: prev[currentTeam.id] + 10
                              }));
                              setIsRapidFireAnswered(true);
                            }}
                          >
                            ✓ Correct (+10)
                          </Button>
                          <Button
                            color="red"
                            disabled={isRapidFireAnswered}
                            onClick={() => {
                              showToast('Wrong!', 'error');
                              playWrongSound();
                              setScores(prev => ({
                                ...prev,
                                [currentTeam.id]: prev[currentTeam.id] - 5
                              }));
                              setIsRapidFireAnswered(true);
                            }}
                          >
                            ✗ Wrong (-5)
                          </Button>
                        </Group>
                        <Button
                          disabled={!isRapidFireAnswered}
                          onClick={nextQuestion}
                          color="violet"
                          size="lg"
                          fw={700}
                          mt="md"
                          w="100%"
                        >
                          {currentQuestion < currentRoundData.questions.length - 1 ? 'Next Question' : 'Next Round'}
                        </Button>
                      </Box>
                    </Center>
                  ) :
                    <Center>
                      <Button
                        mt="md"
                        size="lg"
                        color="orange"
                        disabled={showRapidFireAnswer}
                        onClick={() => setShowRapidFireAnswer(true)}
                      >
                        Reveal Answer
                      </Button>
                    </Center>}
                </Container>
              ) : (
                <SimpleGrid
                  cols={{ base: 1, md: 2 }}
                  spacing="md"
                // style={{ maxWidth: '64rem', margin: '0 auto' }}
                >
                  {"options" in currentQuestionData && currentQuestionData.options?.map((option: string, idx: number) => (
                    <Button
                      key={idx}
                      fullWidth
                      size="lg"
                      variant="outline"
                      // select and deselect allow
                      onClick={() => {
                        if (selectedAnswer === option) {
                          setSelectedAnswer(null);
                        } else {
                          handleAnswerSelect(option);
                        }
                      }}
                      disabled={showAnswer}
                      styles={{
                        root: {
                          height: 'auto',
                          padding: '1rem',
                          textAlign: 'left',
                          justifyContent: 'flex-start',
                          transition: 'all 300ms ease',
                          backgroundColor: showAnswer
                            ? option === currentQuestionData.correctAnswer
                              ? '#10b981' // green for correct
                              : selectedAnswer === option
                                ? '#ef4444' // red for incorrect selection
                                : 'rgba(255, 255, 255, 0.2)'
                            : selectedAnswer === option
                              ? '#3b82f6' // blue for selected
                              : 'rgba(255, 255, 255, 0.2)',
                          color:
                            showAnswer && selectedAnswer !== option && option !== currentQuestionData.correctAnswer
                              ? '#d1d5db'
                              : 'white',
                          '&:hover': !showAnswer
                            ? {
                              backgroundColor:
                                selectedAnswer === option
                                  ? '#3b82f6'
                                  : 'rgba(255, 255, 255, 0.3)',
                            }
                            : {},
                        },
                      }}
                    >
                      <Text fw={700} mr="xs">
                        {String.fromCharCode(65 + idx)}.
                      </Text>
                      {option}
                    </Button>
                  ))}
                </SimpleGrid>
              )}

              {/* Reveal Answer and Pass Buttons */}
              <Group justify="center" mt="md">
                {/* Show Answer Button */}
                {!showAnswer && currentRoundData.questionType !== 'rapid-fire' && (
                  <Group gap="md">
                    <Button
                      onClick={revealAnswer}
                      color="orange"
                      size="lg"
                      fw={700}
                    >
                      Reveal Answer
                    </Button>
                    <Button
                      size="lg"
                      fw={700}
                      disabled={allTeamsTried}
                      // onClick={() => {
                      //   if(!allTeamsTried){
                      //     setPassCount((prev) => prev + 1);
                      //     setCurrentTeamIndex((prevIndex) => (prevIndex + 1) % quiz.teams.length);
                      //   }
                      //   // const currentRoundData = rounds[currentRound];
                      //   // if (currentRoundData.type !== 'rapid_fire') {
                      //   //   nextQuestion();
                      //   // }
                      // }}
                      onClick={handlePass}
                      color="green"
                      leftSection={<SkipForward size={16} />}
                    >
                      Pass
                    </Button>
                  </Group>
                )}
              </Group>

              {/* Answer Revealed */}
              {showAnswer && (
                // <Paper
                //   mt=""
                //   p="md"
                //   radius="lg"
                //   style={{
                //     backgroundColor: 'rgba(255, 255, 255, 0.2)',
                //   }}
                // >
                <Group justify="center">
                  {/* <Title order={3} size="1.125rem" fw={700} style={{ color: '#4ade80' }}>
                      Correct Answer: &nbsp;
                      {currentRoundData.questionType === 'rapid-fire'
                        ? String(currentQuestionData.correct)
                        : currentQuestionData.options && typeof currentQuestionData.correct === 'number'
                          ? `${String.fromCharCode(65 + currentQuestionData.correct)}. ${currentQuestionData.options[currentQuestionData.correct]}`
                          : 'No answer available'
                      }
                    </Title> */}
                  <Button
                    onClick={nextQuestion}
                    color="violet"
                    size="lg"
                    fw={700}
                  >
                    {currentQuestion < currentRoundData.questions.length - 1 ? 'Next Question' : 'Next Round'}
                  </Button>
                </Group>
                // </Paper>
              )}
            </Paper>
          </Box>
          <Space w="md" />
          {/* Team Scores */}
          {/* <Paper
              p="md"
              mb="xl"
              radius="xl"
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                // border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
                <Title order={4} fw={700} ta="center">
                  Team Scores
                </Title>
                <Stack gap="xs" justify="center" align="center">
                  <Text>Alpha: 10</Text>
                  <Text>Beta: 20</Text>
                  <Text>Gamma: 30</Text>
                  <Text>Delta: 40</Text>
                </Stack>
          </Paper> */}
        </Flex>
        <Paper
          p="md"
          mb="xl"
          radius="md"
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            // border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Title order={3} fw={700} ta="center">
            Team Scores
          </Title>
          <Group gap="lg" justify="center" mt="md">
            {/* <Text size="lg">Alpha: 10</Text>
            <Text size="lg">Beta: 20</Text>
            <Text size="lg">Gamma: 30</Text>
            <Text size="lg">Delta: 40</Text> */}

            {quiz.teams.map((team: any) => (
              <Text size="lg" key={team.id}>
                {team.name}: {scores[team.id]}
              </Text>
            ))}
          </Group>
        </Paper>
      </Container>
    </Box>
  );
}

export default Quiz;
