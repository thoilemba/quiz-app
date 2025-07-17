import { Play } from 'lucide-react';
import { quizData, roundsData } from '../mock-data';
import { useNavigate } from 'react-router-dom';
import { getRoundIcon } from '../components/RoundIcon';



const Details = () => {

  // const [quiz, setQuizData] = useState<QuizConfig>(quizData);
  // const [rounds, setRounds] = useState(roundsData);
  const quiz = quizData;
  const rounds = roundsData;

  const navigate = useNavigate();

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{quiz.schoolLogo}</div>
          <h1 className="text-4xl font-bold mb-2">{quiz.eventName}</h1>
          <p className="text-xl text-blue-200">{quiz.schoolName}</p>
          <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-300">
            <span>📅 {quiz.date}</span>
            <span>📍 {quiz.venue}</span>
          </div>
        </div>

        {/* Quiz Master */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 text-center">
          <div className="text-4xl mb-2">{quiz.quizMaster.photo}</div>
          <h3 className="text-lg font-semibold">Quiz Master</h3>
          <p className="text-blue-200">{quiz.quizMaster.name}</p>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quizData.teams.map((team) => (
            <div key={team.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
              <h3 className="text-lg font-bold mb-4 text-yellow-300">{team.name}</h3>
              <div className="space-y-3">
                {team.participants.map((participant, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-3">
                    <span className="text-2xl">{participant.photo}</span>
                    <span className="text-sm">{participant.name}</span>
                  </div>
                ))}
              </div>
              {/* <div className="mt-4 text-2xl font-bold text-green-400">
                Score: {team.score}
              </div> */}
            </div>
          ))}
        </div>

        {/* Rounds Preview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center">Quiz Rounds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rounds.map((round, idx) => (
              <div key={round.id} className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  {getRoundIcon(round.type)}
                  <div>
                    <h4 className="font-semibold">Round {idx + 1}</h4>
                    <p className="text-sm text-gray-300">{round.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{round.type.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Correct:</span>
                    <span className="text-green-400">+{round.points.correct}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Wrong:</span>
                    <span className="text-red-400">{round.points.wrong}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bonus:</span>
                    <span className="text-yellow-400">+{round.points.bonus}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="text-center">
          <button
            // onClick={onStartQuiz}
            onClick={() => navigate('/quiz')}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-4 rounded-full text-xl font-bold flex items-center gap-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Start Quiz
            <Play className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
