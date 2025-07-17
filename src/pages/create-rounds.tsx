import { useState } from "react";
import {
    Container,
    Title,
    Paper,
    Grid,
    Text,
    NumberInput,
    Select,
    Button,
    Group,
    Badge,
    Alert,
    Flex,
    Stack,
    Card
} from '@mantine/core';
import { Circle, FileAudio, Zap, User, Users, CircuitBoard, List, Trophy, HashIcon, Hash } from "lucide-react";
import { useLocation } from 'react-router-dom';
import BackButton from "../components/BackButton";

export default function CreateRounds() {

    const location = useLocation();
    const { quizName, numberOfTeams, numberOfMembers, numberOfRounds, teams } = location.state || {};

    // Simulated location state (in your actual app, this would come from useLocation())
    // const locationState = {
    //     quizName: "Science Quiz",
    //     numberOfTeams: 4,
    //     numberOfMembers: 3,
    //     numberOfRounds: 5,
    //     teams: ["Team A", "Team B", "Team C", "Team D"]
    // };

    // Initialize rounds configuration
    const [roundsConfig, setRoundsConfig] = useState(() => {
        const initialConfig = [];
        for (let i = 1; i <= numberOfRounds; i++) {
            initialConfig.push({
                roundNumber: i,
                numberOfQuestions: 5, // default value
                questionType: "" // default type
            });
        }
        return initialConfig;
    });

    const questionTypes = [
        {
            value: "audio-visual",
            label: "Audio/Visual Round",
            description: "4 answers options - Allow pass"
        },
        {
            value: "rapid-fire",
            label: "Rapid Fire Round",
            description: "5 seconds - No options shown - No pass"
        },
        {
            value: "normal",
            label: "Normal Round",
            description: "4 answers options - Allow pass"
        }
    ];

    const handleRoundConfigChange = (roundIndex: number, field: string, value: string | number) => {
        setRoundsConfig(prev => {
            const updated = [...prev];
            updated[roundIndex] = {
                ...updated[roundIndex],
                [field]: value
            };
            return updated;
        });
    };

    const handleCreateQuiz = () => {
        // Here you would typically navigate to the next step or save the configuration
        console.log("Quiz Configuration:", {
            quizName,
            numberOfTeams,
            numberOfMembers,
            teams,
            roundsConfig
        });
        // Add navigation logic here
    };

    const getQuestionTypeColor = (type: string) => {
        switch (type) {
            case 'audio-visual':
                return 'blue';
            case 'rapid-fire':
                return 'orange';
            case 'normal':
                return 'green';
            default:
                return 'gray';
        }
    };

    const getQuestionTypeIcon = (type: string) => {
        switch (type) {
            case 'audio-visual':
                return <FileAudio size={16} />;
            case 'rapid-fire':
                return <Zap size={16} />;
            case 'normal':
                return <Circle size={16} />;
            default:
                return <Circle size={16} />;
        }
    };

    return (
        <Container size="xl" py="xl" >
            <BackButton />
            <Title order={1} mb="md" ta="center">Create Rounds</Title>

            {/* <Group justify="center" mb="md">
                <Badge
                    color="blue"
                    variant="light"
                    size="lg"
                    leftSection={<Trophy size={14} />}
                >
                    Quiz Name: {quizName}
                </Badge>
                <Badge
                    color="green"
                    variant="light"
                    size="lg"
                    leftSection={<Users size={14} />}
                >
                    Teams: {numberOfTeams}
                </Badge>
                <Badge
                    color="violet"
                    variant="light"
                    size="lg"
                    leftSection={<User size={14} />}
                >
                    Members per Team: {numberOfMembers}
                </Badge>
                <Badge
                    color="orange"
                    variant="light"
                    size="lg"
                    leftSection={<Hash size={14} />}
                >
                    Total Rounds: {numberOfRounds}
                </Badge>
            </Group> */}

            <Group justify="center" mb="md">
                <Stack gap="xs">
                    <Group>
                        <Trophy size={16} color="blue"/>
                        <Text>Quiz Name: <span style={{ fontWeight: 'bold' }}>{quizName}</span></Text>
                    </Group>
                    <Group>
                        <Users size={16} color="green"/>
                        <Text>Teams: <span style={{ fontWeight: 'bold' }}>{numberOfTeams}</span></Text>
                    </Group>
                    <Group>
                        <User size={16} color="violet"/>
                        <Text>Members per Team: <span style={{ fontWeight: 'bold' }}>{numberOfMembers}</span></Text>
                    </Group>
                    <Group>
                        <Hash size={16} color="orange"/>
                        <Text>Rounds: <span style={{ fontWeight: 'bold' }}>{numberOfRounds}</span></Text>
                    </Group>
                </Stack>
            </Group>

            <Stack gap="lg">
                {roundsConfig.map((round, index) => (
                    <Paper key={round.roundNumber} shadow="sm" p="lg" withBorder>
                        <Group justify="apart" mb="md">
                            <Title order={3}>Round {round.roundNumber}</Title>
                            <Badge
                                color={getQuestionTypeColor(round.questionType)}
                                variant="light"
                                size="lg"
                            >
                                {questionTypes.find(type => type.value === round.questionType)?.label}
                            </Badge>
                        </Group>

                        <Grid>
                            <Flex gap="md" >
                                <Select
                                    label="Question Type"
                                    description="Select the type of questions for this round"
                                    placeholder="Choose question type"
                                    value={round.questionType}
                                    onChange={(value) => handleRoundConfigChange(index, 'questionType', value as string)}
                                    data={questionTypes.map(type => ({
                                        value: type.value,
                                        label: type.label
                                    }))}
                                    required
                                />

                                {/* <Box mt="md"> */}
                                {round.questionType && (
                                    <Alert
                                        icon={getQuestionTypeIcon(round.questionType)}
                                        color={getQuestionTypeColor(round.questionType)}
                                        variant="light"
                                    >
                                        <Text size="sm">
                                            {/* <Text component="span" fw={500}>
                                                {questionTypes.find(type => type.value === round.questionType)?.label}:
                                            </Text>{' '} */}
                                            {questionTypes.find(type => type.value === round.questionType)?.description}
                                        </Text>
                                    </Alert>
                                )}
                                {/* </Box> */}
                            </Flex>
                            <Grid.Col>
                                <NumberInput
                                    label="Number of Questions"
                                    description="Enter the number of questions for this round"
                                    placeholder="Enter number of questions"
                                    value={round.numberOfQuestions}
                                    onChange={(value) => handleRoundConfigChange(index, 'numberOfQuestions', value)}
                                    min={1}
                                    max={50}
                                    required
                                />
                            </Grid.Col>
                        </Grid>
                    </Paper>
                ))}
            </Stack>

            <Flex justify="center" gap="md" py="md">

                <Button
                    fullWidth
                    onClick={handleCreateQuiz}
                    size="lg"
                    disabled={roundsConfig.some(round => !round.questionType)}
                >
                    Create Quiz
                </Button>
            </Flex>
        </Container>
    );
}