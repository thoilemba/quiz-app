import { useState } from "react";
import {
    Container,
    Title,
    Paper,
    Text,
    NumberInput,
    Select,
    Button,
    Group,
    Badge,
    Alert,
    Flex,
    Stack,
} from '@mantine/core';
import { Circle, FileAudio, Zap } from "lucide-react";
import { useLocation } from 'react-router-dom';
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import QuizInfo from "../components/QuizInfo";

export default function CreateRounds() {

    const location = useLocation();
    const { quizName, numberOfTeams, numberOfMembers, numberOfRounds, teams, quizMaster, schoolName, address, logo } = location.state || {};
    const navigate = useNavigate();

    // Initialize rounds configuration
    const [roundsConfig, setRoundsConfig] = useState(() => {
        const initialConfig = [];
        for (let i = 1; i <= numberOfRounds; i++) {
            initialConfig.push({
                roundNumber: i,
                numberOfQuestions: 0, // default value
                questionType: "" // default type
            });
        }
        return initialConfig;
    });

    const questionTypes = [
        {
            value: "normal",
            label: "Normal Round",
            description: "4 answers options - Allow pass"
        },
        {
            value: "audio-visual",
            label: "Audio/Visual Round",
            description: "4 answers options - Allow pass"
        },
        {
            value: "rapid-fire",
            label: "Rapid Fire Round",
            description: "5 seconds - No options shown - No pass"
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
        // console.log("Quiz Configuration:", {
        //     quizName,
        //     schoolName,
        //     address,
        //     numberOfTeams,
        //     numberOfMembers,
        //     numberOfRounds,
        //     teams,
        //     quizMaster,
        //     roundsConfig,
        // });
        navigate('/create-questions', {
            state: {
                quizName,
                schoolName,
                address,
                numberOfTeams,
                numberOfMembers,
                numberOfRounds,
                teams,
                quizMaster,
                logo,
                roundsConfig
            }
        });
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
        <Container size="md" py="xl">
            <BackButton />
            <Title order={1} mb="md" ta="center">Create Rounds</Title>

            {/* Quiz Details */}
            <QuizInfo
                quizName={quizName}
                schoolName={schoolName}
                address={address}
                numberOfTeams={numberOfTeams}
                numberOfMembers={numberOfMembers}
                numberOfRounds={numberOfRounds}
                quizMaster={quizMaster}
                schoolLogo={logo}
            />

            <Stack gap="lg">
                {roundsConfig.map((round, index) => (
                    <Paper key={round.roundNumber} shadow="sm" p="lg" withBorder>
                        <Group justify="apart" mb="md">
                            <Title order={3}>Round {round.roundNumber}</Title>
                            {round.questionType && (
                                <Badge
                                    color={getQuestionTypeColor(round.questionType)}
                                    variant="light"
                                    size="lg"
                                >
                                    {questionTypes.find(type => type.value === round.questionType)?.label}
                                </Badge>
                            )}
                        </Group>
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

                            {round.questionType && (
                                <Alert
                                    icon={getQuestionTypeIcon(round.questionType)}
                                    color={getQuestionTypeColor(round.questionType)}
                                    variant="light"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text size="sm">
                                        {questionTypes.find(type => type.value === round.questionType)?.description}
                                    </Text>
                                </Alert>
                            )}
                        </Flex>
                        <NumberInput
                            label="Number of Questions"
                            description="Enter the number of questions for this round"
                            placeholder="Enter number of questions"
                            value={round.numberOfQuestions}
                            onChange={(value) => handleRoundConfigChange(index, 'numberOfQuestions', value)}
                            min={1}
                            max={20}
                            required
                        />
                    </Paper>
                ))}
            </Stack>

            <Flex justify="center" gap="md" py="md">
                <Button
                    fullWidth
                    onClick={handleCreateQuiz}
                    size="lg"
                    disabled={roundsConfig.some(round => !round.questionType) || roundsConfig.some(round => !round.numberOfQuestions)}
                >
                    Continue
                </Button>
            </Flex>
        </Container>
    );
}