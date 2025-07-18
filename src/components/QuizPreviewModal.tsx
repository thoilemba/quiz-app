import { useState } from 'react';
import {
    Modal,
    Button,
    Text,
    Title,
    Group,
    Stack,
    Card,
    Badge,
    Paper,
    Box,
    Divider,
    ScrollArea,
    ThemeIcon,
    Alert,
    Grid,
    List
} from '@mantine/core';
import { Eye, Check, Play, Save, Users, User } from 'lucide-react';
import { getQuestionTypeIcon } from './QuestionTypeIcon';
import { getQuestionTypeColor } from './QuestionTypeColor';
import QuizInfo from './QuizInfo';

// Define question types
// interface BaseQuestion {
//   statement: string;
//   type: 'normal' | 'audio-visual' | 'rapid-fire';
// }

// interface MultipleChoiceQuestion extends BaseQuestion {
//   options: string[];
//   correctOption: string;
//   media?: {
//     type: string;
//     url: string;
//   };
//   correctAnswer?: never;
// }

// interface RapidFireQuestion extends BaseQuestion {
//   correctAnswer: string;
//   options?: never;
//   correctOption?: never;
//   media?: never;
// }

// type Question = MultipleChoiceQuestion | RapidFireQuestion;

// interface Round {
//   roundNumber: number;
//   numberOfQuestions: number;
//   questionType: 'normal' | 'audio-visual' | 'rapid-fire';
//   questions: Question[];
// }

const QuizPreviewModal = ({ rounds, teams, quizName, numberOfTeams, numberOfMembers, numberOfRounds }: { rounds: any, teams: any, quizName: string, numberOfTeams: number, numberOfMembers: number, numberOfRounds: number }) => {
    const [opened, setOpened] = useState(false);

    // Sample data - replace with your actual rounds data
    //   const rounds = [
    //     {
    //       "roundNumber": 1,
    //       "numberOfQuestions": 2,
    //       "questionType": "normal",
    //       "questions": [
    //         {
    //           "statement": "What is the capital of France?",
    //           "options": [
    //             "London",
    //             "Berlin",
    //             "Paris",
    //             "Madrid"
    //           ],
    //           "correctOption": "Option C"
    //         },
    //         {
    //           "statement": "Which planet is known as the Red Planet?",
    //           "options": [
    //             "Mars",
    //             "Venus",
    //             "Jupiter",
    //             "Saturn"
    //           ],
    //           "correctOption": "Option A"
    //         }
    //       ]
    //     },
    //     {
    //       "roundNumber": 2,
    //       "numberOfQuestions": 1,
    //       "questionType": "audio-visual",
    //       "questions": [
    //         {
    //           "statement": "What sound does this animal make?",
    //           "media": {
    //             "type": "audio",
    //             "url": "https://example.com/dog-bark.mp3"
    //           },
    //           "options": [
    //             "Bark",
    //             "Meow",
    //             "Moo",
    //             "Chirp"
    //           ],
    //           "correctOption": "Option A"
    //         }
    //       ]
    //     },
    //     {
    //       "roundNumber": 3,
    //       "numberOfQuestions": 1,
    //       "questionType": "rapid-fire",
    //       "questions": [
    //         {
    //           "statement": "What is 2 + 2?",
    //           "correctAnswer": "4"
    //         }
    //       ]
    //     }
    //   ];

    // const teamsData = [
    //     {
    //         id: 1,
    //         name: "Manipur Royal Knights",
    //         members: ["Moirangthem Mangalsana Meitei", "Thongam Nirmala Devi"]
    //     },
    //     {
    //         id: 2,
    //         name: "Team 2",
    //         members: ["Yumnam Roshnibala Devi", "Thangjam Puneshori Chanu"]
    //     },
    //     {
    //         id: 3,
    //         name: "Team 3",
    //         members: ["Member 3", "Member 3"]
    //     },
    //     {
    //         id: 4,
    //         name: "Team 4",
    //         members: ["Member 4", "Member 4"]
    //     }
    // ];

    // console.log('Teams Data:', teams);

    const saveAllQuestions = () => {
        console.log('All Questions Data:', rounds);
        // Here you can send the data to your backend or local storage
        setOpened(false);
        // You can use Mantine notifications here
        alert('Quiz saved successfully!');
    };


    // const totalQuestions = rounds.reduce((total: any, round: any) => total + round.numberOfQuestions, 0);

    return (
        <Box>
            {/* Trigger Button */}
            <Button
                leftSection={<Eye size={16} />}
                onClick={() => setOpened(true)}
                size="md"
                variant="filled"
                fullWidth
            >
                Preview & Save Quiz
            </Button>

            {/* Modal */}
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={
                    <Group gap="xs" justify="center">
                        <Title order={2} >Quiz Preview</Title>
                    </Group>
                }
                size="xl"
                scrollAreaComponent={ScrollArea.Autosize}
                styles={{
                    title: {
                        width: '100%',
                    },
                    content: { maxHeight: '90vh' },
                    body: { maxHeight: 'calc(90vh - 120px)' }
                }}
            >
                <QuizInfo
                    quizName={quizName}
                    numberOfTeams={numberOfTeams}
                    numberOfMembers={numberOfMembers}
                    numberOfRounds={numberOfRounds}
                    quizMaster="Dr. Moirangthem Surbala Devi"
                />
                {/* <Stack justify="center" gap="xs">
                    <Title order={3} ta="center" c="blue">Quiz Master</Title>
                    <Text ta="center">Dr. Moirangthem Mangalsana Meitei</Text>
                </Stack> */}
                <Stack gap="lg" p="md">
                    <Title order={3} ta="center" c="blue">Teams</Title>
                    <Grid gutter="xl">
                        {teams.map((team: any) => (
                            <Grid.Col key={team.id} span={6}>
                                <Card
                                    shadow="sm"
                                    padding="lg"
                                    radius="md"
                                    withBorder
                                    style={{ height: '100%' }}
                                >
                                    <Group mb="md" gap="xs">
                                        <Users size={18} />
                                        <Text fw={500} size="lg">{team.name}</Text>
                                    </Group>

                                    <Text fw={500} size="sm" c="dimmed">Members:</Text>

                                    <List
                                        spacing="xs"
                                        mt="sm"
                                        center
                                        icon={<User size={14} />}
                                    >
                                        {team.members.map((member: any, index: number) => (
                                            <List.Item key={`${team.id}-${index}`}>
                                                <Text>{member}</Text>
                                            </List.Item>
                                        ))}
                                    </List>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                    {rounds.map((round: any, roundIndex: any) => (
                        <Card key={roundIndex} withBorder radius="md" p="lg">
                            {/* Round Header */}
                            <Group justify="space-between" mb="md">
                                <Group>
                                    <ThemeIcon size="lg" radius="xl" variant="filled">
                                        {round.roundNumber}
                                    </ThemeIcon>
                                    <Title order={3}>Round {round.roundNumber}</Title>
                                    ({round.numberOfQuestions} {round.numberOfQuestions === 1 ? 'Question' : 'Questions'})
                                </Group>
                                <Badge
                                    leftSection={getQuestionTypeIcon(round.questionType)}
                                    color={getQuestionTypeColor(round.questionType)}
                                    variant="light"
                                    size="lg"
                                >
                                    {round.questionType.replace('-', ' ').toUpperCase()}
                                </Badge>
                            </Group>

                            {/* Questions */}
                            <Stack gap="md">
                                {round.questions.map((question: any, questionIndex: any) => (
                                    <Paper key={questionIndex} withBorder p="md" radius="md">
                                        <Group align="flex-start" gap="sm">
                                            <ThemeIcon size="sm" radius="xl" variant="light" color="gray">
                                                {questionIndex + 1}
                                            </ThemeIcon>
                                            <Stack gap="sm" style={{ flex: 1 }}>
                                                {question.statement || (
                                                    <Text c="dimmed" fs="italic">No statement provided</Text>
                                                )}


                                                {/* Media Display */}
                                                {('media' in question) && question.media && (
                                                    <Alert
                                                        icon={<Play size={16} />}
                                                        title="Media Content"
                                                        color="blue"
                                                        variant="light"
                                                    >
                                                        <Text size="sm" mb="xs">
                                                            <Text component="span" fw={500}>Type:</Text>{' '}
                                                            <Text component="span" tt="capitalize">{question.media.type}</Text>
                                                        </Text>
                                                        {/* Preview the media file */}
                                                        {/* <Text size="xs" c="dimmed" style={{ wordBreak: 'break-all' }}>
                                                            {question.media.url || (
                                                                <Text component="span" fs="italic">No URL provided</Text>
                                                            )}
                                                        </Text> */}
                                                    </Alert>
                                                )}

                                                {/* Options or Answer */}
                                                {'options' in question ? (
                                                    <Stack gap="xs">
                                                        <Text size="sm" fw={500} c="dimmed">Options:</Text>
                                                        <Stack gap="xs">
                                                            {question.options.map((option: any, optionIndex: any) => {
                                                                const optionLetter = String.fromCharCode(65 + optionIndex);
                                                                const isCorrect = question.correctOption === `Option ${optionLetter}`;
                                                                return (
                                                                    <Paper
                                                                        key={optionIndex}
                                                                        p="xs"
                                                                        radius="sm"
                                                                        bg={isCorrect ? 'green.0' : 'gray.0'}
                                                                        style={{
                                                                            border: isCorrect ? '1px solid var(--mantine-color-green-3)' : '1px solid var(--mantine-color-gray-3)'
                                                                        }}
                                                                    >
                                                                        <Group gap="xs" justify="space-between">
                                                                            <Group gap="xs">
                                                                                <Text size="sm" fw={500}>{optionLetter}.</Text>
                                                                                <Text size="sm">
                                                                                    {option || (
                                                                                        <Text component="span" c="dimmed" fs="italic">No option provided</Text>
                                                                                    )}
                                                                                </Text>
                                                                            </Group>
                                                                            {isCorrect && (
                                                                                <Badge
                                                                                    size="xs"
                                                                                    color="green"
                                                                                    leftSection={<Check size={12} />}
                                                                                >
                                                                                    Correct
                                                                                </Badge>
                                                                            )}
                                                                        </Group>
                                                                    </Paper>
                                                                );
                                                            })}
                                                        </Stack>
                                                    </Stack>
                                                ) : (
                                                    <Stack gap="xs">
                                                        <Text size="sm" fw={500} c="dimmed">Correct Answer:</Text>
                                                        <Paper
                                                            p="xs"
                                                            radius="sm"
                                                            bg="green.0"
                                                            style={{ border: '1px solid var(--mantine-color-green-3)' }}
                                                        >
                                                            <Text size="sm" c="green.8">
                                                                {question.correctAnswer || (
                                                                    <Text component="span" c="dimmed" fs="italic">No answer provided</Text>
                                                                )}
                                                            </Text>
                                                        </Paper>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Group>
                                    </Paper>
                                ))}
                            </Stack>
                        </Card>
                    ))}
                </Stack>

                <Divider my="lg" />

                {/* Modal Footer */}
                <Group justify="center" pb="md">
                    {/* <Group> */}
                    <Button
                        variant="subtle"
                        onClick={() => setOpened(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        leftSection={<Save size={16} />}
                        onClick={saveAllQuestions}
                        color="green"
                    >
                        Save Quiz
                    </Button>
                    {/* </Group> */}
                </Group>
            </Modal>
        </Box>
    );
};

export default QuizPreviewModal;