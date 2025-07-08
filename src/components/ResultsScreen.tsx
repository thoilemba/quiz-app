import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { quizData } from '../mock-data';
// interface ResultsScreenProps {
//   teams: Team[];
//   onRestart: () => void;
// }

const ResultsScreen = () => {


  // Sort teams by score in descending order
  const sortedTeams = [...quizData.teams].sort((a, b) => b.score - a.score);
  
  // Get the winner (or winners in case of a tie)
  const maxScore = sortedTeams[0]?.score;
  const winners = sortedTeams.filter(team => team.score === maxScore);

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
    //   <div className="container mx-auto px-4 py-12">
    //     <div className="text-center mb-12">
    //       <div className="inline-block p-6 bg-yellow-500/20 rounded-full mb-6">
    //         <Trophy className="w-16 h-16 text-yellow-400 mx-auto" />
    //       </div>
    //       <h1 className="text-4xl font-bold mb-4">Quiz Complete!</h1>
          
    //       {winners.length === 1 ? (
    //         <p className="text-xl text-yellow-300">
    //           Congratulations to <span className="font-bold">{winners[0].name}</span> for winning with {maxScore} points!
    //         </p>
    //       ) : (
    //         <p className="text-xl text-yellow-300">
    //           It's a tie between {winners.map((w, i) => (
    //             <React.Fragment key={w.id}>
    //               {i > 0 && i < winners.length - 1 ? ', ' : ''}
    //               {i === winners.length - 1 && winners.length > 1 ? ' and ' : ''}
    //               <span className="font-bold">{w.name}</span>
    //             </React.Fragment>
    //           ))} with {maxScore} points each!
    //         </p>
    //       )}
    //     </div>

    //     <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-8 mb-8">
    //       <h2 className="text-2xl font-bold mb-6 text-center">Final Standings</h2>
          
    //       <div className="space-y-4">
    //         {sortedTeams.map((team, index) => (
    //           <div 
    //             key={team.id}
    //             className={`flex items-center justify-between p-4 rounded-lg ${
    //               index === 0
    //                 ? 'bg-yellow-600/30 border-2 border-yellow-500'
    //                 : 'bg-white/5'
    //             }`}
    //           >
    //             <div className="flex items-center gap-4">
    //               <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
    //                 index === 0 
    //                   ? 'bg-yellow-500 text-yellow-900'
    //                   : 'bg-white/10 text-white'
    //               }`}>
    //                 {index + 1}
    //               </div>
    //               <span className="font-medium">{team.name}</span>
    //             </div>
    //             <div className="flex items-center gap-2">
    //               <span className="text-2xl font-bold">{team.score}</span>
    //               {index === 0 && (
    //                 <Trophy className="w-6 h-6 text-yellow-400" />
    //               )}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     <div className="text-center">
    //       <button
    //         // onClick={onRestart}
    //         className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-4 rounded-full text-xl font-bold flex items-center gap-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
    //       >
    //         Play Again
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="text-6xl mb-4">🏆</div>
        <h1 className="text-4xl font-bold mb-2">Quiz Results</h1>
        <p className="text-xl text-blue-200">{quizData.eventName}</p>
      </div>

      {/* Podium */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {sortedTeams.map((team, idx) => (
            <div key={team.id} className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center ${
              idx === 0 ? 'md:col-span-4 lg:col-span-1 order-2 md:order-1' : ''
            }`}>
              <div className="text-4xl mb-4">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🏅'}
              </div>
              <h3 className="text-xl font-bold mb-2 text-yellow-300">{team.name}</h3>
              <div className="text-3xl font-bold text-green-400 mb-4">{team.score}</div>
              <div className="space-y-2">
                {team.participants.map((participant, pIdx) => (
                  <div key={pIdx} className="flex items-center justify-center gap-2">
                    <span className="text-lg">{participant.photo}</span>
                    <span className="text-sm">{participant.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Congratulations */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Congratulations to all participants!</h2>
        <p className="text-gray-300 mb-6">Thank you for participating in {quizData.eventName}</p>
        {/* <div className="flex justify-center gap-4">
          <button
            // onClick={() => setCurrentView('setup')}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-bold"
          >
            New Quiz
          </button>
        </div> */}
      </div>
    </div>
  </div>
  );
};

export default ResultsScreen;
