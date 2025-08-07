// import { Play } from 'lucide-react';
// import { quizData, roundsData } from '../mock-data';
// import { useNavigate } from 'react-router-dom';
// import { getRoundIcon } from '../components/RoundIcon';



// const Details = () => {

//   // const [quiz, setQuizData] = useState<QuizConfig>(quizData);
//   // const [rounds, setRounds] = useState(roundsData);
//   const quiz = quizData;
//   const rounds = roundsData;

//   const navigate = useNavigate();



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="text-6xl mb-4">{quiz.schoolLogo}</div>
//           <h1 className="text-4xl font-bold mb-2">{quiz.eventName}</h1>
//           <p className="text-xl text-blue-200">{quiz.schoolName}</p>
//           <div className="flex justify-center items-center gap-4 mt-4 text-sm text-gray-300">
//             <span>📅 {quiz.date}</span>
//             <span>📍 {quiz.venue}</span>
//           </div>
//         </div>

//         {/* Quiz Master */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8 text-center">
//           <div className="text-4xl mb-2">{quiz.quizMaster.photo}</div>
//           <h3 className="text-lg font-semibold">Quiz Master</h3>
//           <p className="text-blue-200">{quiz.quizMaster.name}</p>
//         </div>

//         {/* Teams */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {quizData.teams.map((team) => (
//             <div key={team.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center">
//               <h3 className="text-lg font-bold mb-4 text-yellow-300">{team.name}</h3>
//               <div className="space-y-3">
//                 {team.participants.map((participant, idx) => (
//                   <div key={idx} className="flex items-center justify-center gap-3">
//                     <span className="text-2xl">{participant.photo}</span>
//                     <span className="text-sm">{participant.name}</span>
//                   </div>
//                 ))}
//               </div>
//               {/* <div className="mt-4 text-2xl font-bold text-green-400">
//                 Score: {team.score}
//               </div> */}
//             </div>
//           ))}
//         </div>

//         {/* Rounds Preview */}
//         <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
//           <h3 className="text-xl font-bold mb-4 text-center">Quiz Rounds</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {rounds.map((round, idx) => (
//               <div key={round.id} className="bg-white/10 rounded-xl p-4">
//                 <div className="flex items-center gap-3 mb-3">
//                   {getRoundIcon(round.type)}
//                   <div>
//                     <h4 className="font-semibold">Round {idx + 1}</h4>
//                     <p className="text-sm text-gray-300">{round.name}</p>
//                     <p className="text-xs text-gray-400 capitalize">{round.type.replace('_', ' ')}</p>
//                   </div>
//                 </div>
//                 <div className="text-xs text-gray-300 space-y-1">
//                   <div className="flex justify-between">
//                     <span>Correct:</span>
//                     <span className="text-green-400">+{round.points.correct}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Wrong:</span>
//                     <span className="text-red-400">{round.points.wrong}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Bonus:</span>
//                     <span className="text-yellow-400">+{round.points.bonus}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Start Button */}
//         <div className="text-center">
//           <button
//             // onClick={onStartQuiz}
//             onClick={() => navigate('/quiz')}
//             className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-8 py-4 rounded-full text-xl font-bold flex items-center gap-3 mx-auto transition-all duration-300 shadow-lg hover:shadow-xl"
//           >
//             Start Quiz
//             <Play className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;


// import { Play } from 'lucide-react';
// import { 
//   Container, 
//   Grid, 
//   Card, 
//   Text, 
//   Title, 
//   Button, 
//   Group, 
//   Stack, 
//   Badge,
//   Center,
//   Box,
//   Flex
// } from '@mantine/core';
// import { quizData, roundsData } from '../mock-data';
// import { useNavigate } from 'react-router-dom';
// import { getRoundIcon } from '../components/RoundIcon';

// const Details = () => {
//   const quiz = quizData;
//   const rounds = roundsData;
//   const navigate = useNavigate();

//   return (
//     <Box 
//       style={{
//         minHeight: '100vh',
//         background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #3730a3 100%)',
//         // color: 'white',
//         padding: '1rem',
//         overflow: 'hidden'
//       }}
//     >
//       <Container size="xl" >
//         <Grid style={{ height: '100%', margin: 0 }}>
//           {/* Header Section - Top */}
//           <Grid.Col span={12} style={{ padding: '0.5rem' }}>
//             <Card 
//               style={{ 
//                 background: 'rgba(255, 255, 255, 0.1)', 
//                 backdropFilter: 'blur(10px)',
//                 border: 'none',
//                 color: 'white',
//                 padding: '1rem'
//               }}
//               radius="lg"
//             >
//               <Center>
//                 <Stack gap="xs" align="center">
//                   <Text size="3rem" style={{ lineHeight: 1 }}>{quiz.schoolLogo}</Text>
//                   <Title order={2} size="h2" ta="center">{quiz.eventName}</Title>
//                   <Text size="lg" c="blue.2">{quiz.schoolName}</Text>
//                   <Group gap="lg" mt="xs">
//                     <Text size="sm" c="gray.3">📅 {quiz.date}</Text>
//                     <Text size="sm" c="gray.3">📍 {quiz.venue}</Text>
//                   </Group>
//                 </Stack>
//               </Center>
//             </Card>
//           </Grid.Col>

//           {/* Main Content Area */}
//           <Grid.Col span={12} style={{ padding: '0.5rem', flex: 1 }}>
//             <Grid style={{ height: '100%' }}>
//               {/* Quiz Master - Left */}
//               <Grid.Col span={3}>
//                 <Card 
//                   style={{ 
//                     background: 'rgba(255, 255, 255, 0.1)', 
//                     backdropFilter: 'blur(10px)',
//                     border: 'none',
//                     color: 'white',
//                     height: '100%'
//                   }}
//                   radius="lg"
//                 >
//                   <Center style={{ height: '100%' }}>
//                     <Stack gap="sm" align="center">
//                       <Text size="2.5rem" style={{ lineHeight: 1 }}>{quiz.quizMaster.photo}</Text>
//                       <Title order={4}>Quiz Master</Title>
//                       <Text c="blue.2">{quiz.quizMaster.name}</Text>
//                     </Stack>
//                   </Center>
//                 </Card>
//               </Grid.Col>

//               {/* Teams - Center */}
//               <Grid.Col span={6}>
//                 <Grid style={{ height: '100%' }}>
//                   {quizData.teams.map((team) => (
//                     <Grid.Col span={6} key={team.id}>
//                       <Card 
//                         style={{ 
//                           background: 'rgba(255, 255, 255, 0.1)', 
//                           backdropFilter: 'blur(10px)',
//                           border: 'none',
//                           color: 'white',
//                           height: '100%'
//                         }}
//                         radius="lg"
//                       >
//                         <Stack gap="xs" style={{ height: '100%' }}>
//                           <Title order={5} ta="center" c="yellow.3">{team.name}</Title>
//                           <Stack gap="xs" style={{ flex: 1 }}>
//                             {team.participants.map((participant, idx) => (
//                               <Group key={idx} gap="xs" align="center">
//                                 <Text size="lg">{participant.photo}</Text>
//                                 <Text size="sm">{participant.name}</Text>
//                               </Group>
//                             ))}
//                           </Stack>
//                         </Stack>
//                       </Card>
//                     </Grid.Col>
//                   ))}
//                 </Grid>
//               </Grid.Col>

//               {/* Rounds - Right */}
//               <Grid.Col span={3}>
//                 <Card 
//                   style={{ 
//                     background: 'rgba(255, 255, 255, 0.1)', 
//                     backdropFilter: 'blur(10px)',
//                     border: 'none',
//                     color: 'white',
//                     height: '100%'
//                   }}
//                   radius="lg"
//                 >
//                   <Stack gap="xs" style={{ height: '100%' }}>
//                     <Title order={4} ta="center" mb="sm">Quiz Rounds</Title>
//                     <Stack gap="xs" style={{ flex: 1, overflowY: 'auto' }}>
//                       {rounds.map((round, idx) => (
//                         <Card 
//                           key={round.id}
//                           style={{ 
//                             background: 'rgba(255, 255, 255, 0.1)',
//                             border: 'none',
//                             color: 'white',
//                             padding: '0.75rem'
//                           }}
//                           radius="md"
//                         >
//                           <Stack gap="md">
//                             <Group gap="xs" align="center">
//                               {getRoundIcon(round.type)}
//                               <Box>
//                                 <Text size="sm" fw={600}>Round {idx + 1}</Text>
//                                 <Text size="xs" c="gray.3">{round.name}</Text>
//                                 <Text size="xs" c="gray.4" tt="capitalize">
//                                   {round.type.replace('_', ' ')}
//                                 </Text>
//                               </Box>
//                             </Group>
//                             <Stack gap="xs">
//                               <Flex justify="space-between">
//                                 <Text size="xs">Correct:</Text>
//                                 <Badge size="xs" color="green" variant="light">
//                                   +{round.points.correct}
//                                 </Badge>
//                               </Flex>
//                               <Flex justify="space-between">
//                                 <Text size="xs">Wrong:</Text>
//                                 <Badge size="xs" color="red" variant="light">
//                                   {round.points.wrong}
//                                 </Badge>
//                               </Flex>
//                               <Flex justify="space-between">
//                                 <Text size="xs">Bonus:</Text>
//                                 <Badge size="xs" color="yellow" variant="light">
//                                   +{round.points.bonus}
//                                 </Badge>
//                               </Flex>
//                             </Stack>
//                           </Stack>
//                         </Card>
//                       ))}
//                     </Stack>
//                   </Stack>
//                 </Card>
//               </Grid.Col>
//             </Grid>
//           </Grid.Col>

//           {/* Start Button - Bottom */}
//           <Grid.Col span={12} style={{ padding: '0.5rem' }}>
//             <Center>
//               <Button
//                 onClick={() => navigate('/quiz')}
//                 size="lg"
//                 radius="xl"
//                 style={{
//                   background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
//                   border: 'none',
//                   fontSize: '1.25rem',
//                   fontWeight: 'bold',
//                   padding: '1rem 2rem',
//                   boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
//                 }}
//                 leftSection={<Play size={20} />}
//               >
//                 Start Quiz
//               </Button>
//             </Center>
//           </Grid.Col>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default Details;

import { Container, Title, Text, Group, Card, SimpleGrid, Button, Center, Stack } from '@mantine/core';
import { MapPin, Play, School, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestionTypeIcon } from '../components/QuestionTypeIcon';
import { getQuestionTypeColor } from '../components/QuestionTypeColor';
// import { quizData } from '../mock-data'; // use this mock data for quick testing

const Details = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { quizData } = location.state || {};
  console.log(quizData);

  return (
    <div style={{
      // background: 'linear-gradient(to bottom right, #1E3A8A, #6B21A8, #312E81)',
      // background: 'linear-gradient(135deg, #1e3a8a 0%, #7c3aed 50%, #3730a3 100%)',
      // color: 'white',
      minHeight: '100vh',
      // padding: '2rem',
    }}>
      <Container size="lg" py="lg">
        {/* Header */}
        <Stack align="center" gap={4} mb="lg">
          <Title order={1} c="blue">{quizData.quizName}</Title>
          <Group>
            <School size={20} color="green" />
            <Title order={2}>{quizData.schoolName}</Title>
          </Group>
          <Group>
            <MapPin size={20} color="red" />
            <Text fw={500} size="lg">{quizData.address}</Text>
            </Group>
            <Text fw={500} size="lg">📅 {new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())}</Text>
          <Group>
          <User size={20} color="violet" />
          <Text ta="center" size="lg">Quiz Master: <span style={{ fontWeight: 'bold' }}>{quizData.quizMaster}</span></Text>
          </Group>
        </Stack>

        {/* Teams */}
        <Title order={3} ta="center" mb="md">Teams</Title>
        <SimpleGrid cols={4}>
          {quizData.teams.map((team: any) => (
            <Card key={team.id} shadow="sm" padding="lg" radius="md">
              <Title order={3} c="blue" ta="center" mb="sm">{team.name}</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                {team.members.map((member: any, idx: number) => (
                  <Text key={idx}>{member}</Text>
                ))}
              </div>
            </Card>
          ))}
        </SimpleGrid>

        {/* Rounds Preview */}
        <Title order={3} my="md" ta="center">Quiz Rounds</Title>
        <SimpleGrid cols={3}>
          {quizData.roundsData.map((round: any, idx: number) => (
            <Card key={idx} shadow="sm" padding="md" radius="md">
              <Group gap="md" mb="md" c={getQuestionTypeColor(round.questionType)}>
                {getQuestionTypeIcon(round.questionType)}
                <Text size="lg" fw={600}>Round {idx + 1} ({round.questionType})</Text>
              </Group>
              <Text>
                Number of Questions: <strong>{round.numberOfQuestions}</strong>
              </Text>
            </Card>
          ))}
        </SimpleGrid>

        {/* Start Button */}
        <Center mt="lg">
          <Button
            onClick={() => navigate('/quiz-start', { state: { quizData } })}
            variant="gradient"
            gradient={{ from: 'green', to: 'blue' }}
            size="xl"
            leftSection={<Play size={24} />}
            style={{ fontWeight: 'bold' }}
            fullWidth
          >
            Start Quiz
          </Button>
        </Center>
      </Container>
    </div>
  );
};

export default Details;


