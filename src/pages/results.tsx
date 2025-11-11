import { useLocation } from 'react-router-dom';
// import { quizData } from '../mock-data'; 
import {
  Container,
  Title,
  Text,
  Paper,
  Grid,
  Center,
  Box,
  Stack,
  Button,
  Flex,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { generateQuizResultPdf } from '../components/ResultPDF';

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizData, scores } = location.state || {};
  // console.log("quizData", quizData);

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

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #1e3a8a, #6b21a8, #4f46e5)',
        color: 'white',
      }}
    >
      <Flex justify="space-between" p="md">
        <Button
          onClick={() => navigate('/', { replace: true })} variant="outline" c="white"
        >
          Back to Home
        </Button>
        <Button onClick={() => generateQuizResultPdf(quizData, sortedTeams)}>Print Result</Button>
      </Flex>
      <Container size="lg" py="md">
        <Center mb="lg">
          <Stack align="center" gap="xs">
            <Text fz={60}>🏆</Text>
            <Title order={1} fw={700}>Quiz Results</Title>
            <Title order={2} c="blue.2">{quizData.quizName}</Title>
          </Stack>
        </Center>

        {/* Podium */}
        <Grid gutter="xl" justify="center" mb="xl">
          {sortedTeams.map((team, idx) => (
            <Grid.Col
              key={team.id}
              span={{ base: 12, sm: 6, md: 3 }}
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
                  {team.members.map((member: string, memberIdx: number) => (
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