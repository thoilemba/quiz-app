// import { quizData } from '../mock-data';
// import { useLocation } from 'react-router-dom';

// const Results = () => {

//   const location = useLocation();
//   const { scores } = location.state || {};
//   console.log(scores);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center mb-12">
//           <div className="text-6xl mb-4">🏆</div>
//           <h1 className="text-4xl font-bold mb-2">Quiz Results</h1>
//           <p className="text-xl text-blue-200">{quizData.quizName}</p>
//         </div>

//         {/* Podium */}
//         <div className="max-w-4xl mx-auto mb-12">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//             {quizData.teams.map((team, idx) => (
//               <div key={team.id} className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center ${idx === 0 ? 'md:col-span-4 lg:col-span-1 order-2 md:order-1' : ''
//                 }`}>
//                 <div className="text-4xl mb-4">
//                   {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🏅'}
//                 </div>
//                 <h3 className="text-xl font-bold mb-2 text-yellow-300">{team.name}</h3>
//                 <div className="text-3xl font-bold text-green-400 mb-4">{scores[team.id]}</div>

//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Congratulations */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
//           <h2 className="text-2xl font-bold mb-4">Congratulations to all participants!</h2>
//           <p className="text-gray-300 mb-6">Thank you for participating in {quizData.quizName}!</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;


// import { useLocation } from 'react-router-dom';
// import { quizData } from '../mock-data';
// import {
//   Container,
//   Title,
//   Text,
//   Paper,
//   Grid,
//   Center,
//   Box,
//   Stack,
// } from '@mantine/core';

// const Results = () => {
//   const location = useLocation();
//   const { scores } = location.state || {};

//   const getMedalEmoji = (index: number) => {
//     if (index === 0) {
//       return '🥇';
//     } else if (index === 1) {
//       return '🥈';
//     } else if (index === 2) {
//       return '🥉';
//     } else {
//       return '🏅';
//     }
//   };

//   return (
//     <Box
//       style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(to bottom right, #1e3a8a, #6b21a8, #4f46e5)',
//         color: 'white',
//       }}
//     >
//       <Container size="lg" py="md">
//         <Center mb="lg">
//           <Stack align="center" gap="xs">
//             <Text fz={60}>🏆</Text>
//             <Title order={1} fw={700}>Quiz Results</Title>
//             <Text fz="lg" c="blue.2">{quizData.quizName}</Text>
//           </Stack>
//         </Center>

//         {/* Podium */}
//         <Grid gutter="xl" justify="center" mb="xl">
//           {quizData.teams.map((team, idx) => (
//             <Grid.Col
//               key={team.id}
//               span={{ base: 12, sm: 6, md: 3 }}
//               order={idx === 0 ? 1 : undefined}
//             >
//               <Paper
//                 radius="md"
//                 p="lg"
//                 shadow="md"
//                 style={{
//                   backgroundColor: 'rgba(255, 255, 255, 0.1)',
//                   backdropFilter: 'blur(10px)',
//                   textAlign: 'center',
//                 }}
//               >
//                 <Text fz={40}>{getMedalEmoji(idx)}</Text>
//                 <Title order={3} c="yellow.3">
//                   {team.name}
//                 </Title>
//                 <Text fz={30} fw={700} c="green.4">
//                   {scores?.[team.id] ?? 0}
//                 </Text>
//                 <Stack align="center" gap="xs">
//                   {team.members.map((member, idx) => (
//                     <Text key={idx} fz="sm">
//                       {member}
//                     </Text>
//                   ))}
//                 </Stack>
//               </Paper>
//             </Grid.Col>
//           ))}
//         </Grid>

//         {/* Congratulations */}
//         <Paper
//           radius="md"
//           p="md"
//           shadow="xl"
//           style={{
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
//             backdropFilter: 'blur(10px)',
//             textAlign: 'center',
//           }}
//         >
//           <Title order={2} mb="sm">Congratulations to all participants!</Title>
//           <Text c="gray.3">
//             Thank you for participating in {quizData.quizName}!
//           </Text>
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default Results;


import { useLocation } from 'react-router-dom'; 
import { quizData } from '../mock-data'; 
import { 
  Container, 
  Title, 
  Text, 
  Paper, 
  Grid, 
  Center, 
  Box, 
  Stack, 
} from '@mantine/core'; 
 
const Results = () => { 
  const location = useLocation(); 
  const { scores } = location.state || {}; 
 
  const getMedalEmoji = (index: number) => { 
    if (index === 0) { 
      return '🥇'; 
    } else if (index === 1) { 
      return '🥈'; 
    } else if (index === 2) { 
      return '🥉'; 
    } else { 
      return '🏅'; 
    } 
  }; 

  // Sort teams by their scores in descending order
  // const sortedTeams = [...quizData.teams].sort((a, b) => {
  //   const scoreA = scores?.[a.id] ?? 0;
  //   const scoreB = scores?.[b.id] ?? 0;
  //   return scoreB - scoreA; // Descending order
  // });

  const sortedTeams = [...quizData.teams]
  .map((team) => ({
    ...team,
    score: scores?.[team.id] ?? 0,
  }))
  .sort((a, b) => b.score - a.score);

  console.log(sortedTeams);
 
  return ( 
    <Box 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #1e3a8a, #6b21a8, #4f46e5)', 
        color: 'white', 
      }} 
    > 
      <Container size="lg" py="md"> 
        <Center mb="lg"> 
          <Stack align="center" gap="xs"> 
            <Text fz={60}>🏆</Text> 
            <Title order={1} fw={700}>Quiz Results</Title> 
            <Text fz="xl" c="blue.2">{quizData.quizName}</Text> 
          </Stack> 
        </Center> 
 
        {/* Podium */} 
        <Grid gutter="xl" justify="center" mb="xl"> 
          {sortedTeams.map((team, idx) => ( 
            <Grid.Col 
              key={team.id} 
              span={{ base: 12, sm: 6, md: 3 }} 
              // order={idx === 0 ? 1 : undefined} 
            > 
              <Paper 
                radius="md" 
                p="lg" 
                shadow="md" 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(10px)', 
                  textAlign: 'center', 
                }} 
              > 
                <Text fz={40}>{getMedalEmoji(idx)}</Text> 
                <Title order={3} c="yellow.3"> 
                  {team.name} 
                </Title> 
                <Text fz={30} fw={700} c="green.4"> 
                  {scores?.[team.id] ?? 0} 
                </Text> 
                <Stack align="center" gap="xs"> 
                  {team.members.map((member, memberIdx) => ( 
                    <Text key={memberIdx} fz="sm"> 
                      {member} 
                    </Text> 
                  ))} 
                </Stack> 
              </Paper> 
            </Grid.Col> 
          ))} 
        </Grid> 
 
        {/* Congratulations */} 
        <Paper 
          radius="md" 
          p="md" 
          shadow="xl" 
          style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)', 
            textAlign: 'center', 
          }} 
        > 
          <Title order={2} mb="sm">Congratulations to all participants!</Title> 
          <Text c="gray.3"> 
            Thank you for participating in {quizData.quizName}! 
          </Text> 
        </Paper> 
      </Container> 
    </Box> 
  ); 
}; 
 
export default Results;