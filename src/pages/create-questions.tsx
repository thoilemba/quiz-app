import { Container, Title, Paper, Group, Badge, Box, Grid, Select, TextInput, Stack, Button, Space, FileInput, Image, Center } from "@mantine/core";
import BackButton from "../components/BackButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import QuizPreviewModal from "../components/QuizPreviewModal";
import { getQuestionTypeColor } from "../components/QuestionTypeColor";
import { getQuestionTypeIcon } from "../components/QuestionTypeIcon";
import { readFileAsBase64 } from "../utils";


export default function CreateQuestions() {
    const navigate = useNavigate();
    const location = useLocation();
    const { quizName, numberOfTeams, numberOfMembers, numberOfRounds, teams, roundsConfig, quizMaster, schoolName, address } = location.state || {};

    const [rounds, setRounds] = useState(() =>
        roundsConfig.map((round: any) => ({
            ...round,
            questions: Array.from({ length: round.numberOfQuestions }).map(() => {
                switch (round.questionType) {
                    case 'normal':
                        return {
                            statement: '',
                            options: ['', '', '', ''],
                            correctOption: 'Option A'
                        };
                    case 'audio-visual':
                        return {
                            statement: '',
                            media: {
                                type: '',         // 'image' or 'audio'
                                name: '',         // optional: store original file name
                                data: ''          // ✅ base64 string
                            },
                            options: ['', '', '', ''],
                            correctOption: 'Option A'
                        };
                    case 'rapid-fire':
                        return {
                            statement: '',
                            correctAnswer: ''
                        };
                    default:
                        return {};
                }
            })
        }))
    );

    const quizData = {
        quizName: quizName,
        schoolName: schoolName,
        address: address,
        numberOfTeams: numberOfTeams,
        numberOfMembers: numberOfMembers,
        numberOfRounds: numberOfRounds,
        quizMaster: quizMaster,
        teams: teams,
        roundsData: rounds,
    };

    // function to handle question change
    const handleQuestionChange = (roundIndex: number, questionIndex: number, field: string, value: string) => {
        setRounds((prevRounds: any) => {
            const newRounds = [...prevRounds];
            newRounds[roundIndex].questions[questionIndex][field] = value;
            return newRounds;
        });
    };

    // function to handle option change
    const handleOptionChange = (roundIndex: number, questionIndex: number, optionIndex: number, value: string) => {
        setRounds((prevRounds: any) => {
            const newRounds = [...prevRounds];
            newRounds[roundIndex].questions[questionIndex].options[optionIndex] = value;
            return newRounds;
        });
    };

    // function to handle media type change
    const handleMediaTypeChange = (roundIndex: number, questionIndex: number, field: string, value: string) => {
        setRounds((prevRounds: any) => {
            const newRounds = [...prevRounds];
            newRounds[roundIndex].questions[questionIndex].media[field] = value;
            return newRounds;
        });
    };

    // function to handle media change
    const handleMediaChange = async (roundIndex: number, questionIndex: number, field: string, value: File | string | null) => {

        // console.log('Received value:', value);
        // console.log('Type:', typeof value);
        // console.log('Instance of File:', value instanceof File);
        // console.log('Instance of Blob:', value instanceof Blob);

        if (!value || typeof value !== 'object' || !(value instanceof Blob)) {
            console.warn('Invalid file passed to handleMediaChange:', value);
            return;
        }

        const file = value as File;
        const base64 = await readFileAsBase64(file); // convert to base64
        setRounds((prevRounds: any) => {
            const newRounds = [...prevRounds];
            newRounds[roundIndex].questions[questionIndex].media[field] = base64;
            return newRounds;
        });
    };

    const handleContinue = (event: React.FormEvent) => {
        event.preventDefault();
        navigate('/quiz-detail', { state: { quizData } });
    };

    return (
        <Container size="md" py="xl">
            <form onSubmit={handleContinue}>
                <BackButton />
                <Title order={1} mb="md" ta="center">Create Questions</Title>
                <Title order={3} ta="center" c="blue" mb="md">Quiz Name: {quizName}</Title>
                {rounds.map((round: any, roundIndex: number) => (
                    <Paper p="md" my="md" shadow="sm" radius="md" withBorder key={round.roundNumber}>
                        <Box mb="md" key={round.roundNumber}>
                            <Group justify="center">
                                <Title order={3}>Round {round.roundNumber}</Title>
                                <Badge color="blue" variant="outline" size="lg">
                                    {round.numberOfQuestions} Questions
                                </Badge>
                                <Badge
                                    color={getQuestionTypeColor(round.questionType)}
                                    variant="light"
                                    size="lg"
                                    leftSection={getQuestionTypeIcon(round.questionType)}
                                >
                                    {round.questionType}
                                </Badge>
                            </Group>
                            {round.questions.map((question: any, questionIndex: number) => (
                                <Box key={questionIndex} p="md" style={{ maxWidth: '800px', margin: '0 auto' }}>
                                    <Stack gap="xs">
                                        {/* Common field: Statement */}
                                        <TextInput
                                            label={`Question ${questionIndex + 1}`}
                                            placeholder="Enter your question here..."
                                            value={question.statement}
                                            onChange={(event) =>
                                                handleQuestionChange(roundIndex, questionIndex, 'statement', event.currentTarget.value)
                                            }
                                            required
                                        />

                                        {/* Normal Round Fields */}
                                        {round.questionType === 'normal' && (
                                            <>
                                                <Grid>
                                                    {question.options.map((option: string, optionIndex: number) => (
                                                        <Grid.Col span={6} key={optionIndex}>
                                                            <TextInput
                                                                required
                                                                label={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                                                placeholder={`Enter option ${String.fromCharCode(65 + optionIndex)}...`}
                                                                value={option}
                                                                onChange={(event) =>
                                                                    handleOptionChange(roundIndex, questionIndex, optionIndex, event.currentTarget.value)
                                                                }
                                                                styles={{
                                                                    label: { fontSize: '14px', color: '#868e96' }
                                                                }}
                                                            />
                                                        </Grid.Col>
                                                    ))}
                                                </Grid>
                                                <Box style={{ maxWidth: '300px' }}>
                                                    <Select
                                                        label="Correct Option"
                                                        placeholder="Select correct option"
                                                        value={question.correctOption}
                                                        disabled={question.options.some((option: string) => option === '')}
                                                        onChange={(value) =>
                                                            handleQuestionChange(roundIndex, questionIndex, 'correctOption', value as string)
                                                        }
                                                        // data={[
                                                        //     { value: 'Option A', label: 'Option A' },
                                                        //     { value: 'Option B', label: 'Option B' },
                                                        //     { value: 'Option C', label: 'Option C' },
                                                        //     { value: 'Option D', label: 'Option D' }
                                                        // ]}
                                                        data={question.options
                                                            .filter((option: string, index: number, array: string[]) => {
                                                                // Only include non-empty options and remove duplicates
                                                                return option.trim() !== '' && 
                                                                       array.indexOf(option) === index; // Keep only first occurrence of duplicate
                                                            })
                                                            .map((option: string) => ({
                                                                value: option, // Pass the actual option text as value
                                                                label: `${option}`
                                                            }))
                                                        }
                                                        styles={{
                                                            label: { fontSize: '14px', color: '#868e96' }
                                                        }}
                                                    />
                                                </Box>
                                            </>
                                        )}

                                        {/* Audio/Visual Round Fields */}
                                        {round.questionType === 'audio-visual' && (
                                            <>
                                                <Select
                                                    required
                                                    label="Media Type"
                                                    placeholder="Select media type"
                                                    value={question.media.type}
                                                    onChange={(value) =>
                                                        handleMediaTypeChange(roundIndex, questionIndex, 'type', value as string)
                                                    }
                                                    data={[
                                                        { value: 'image', label: 'Image' },
                                                        { value: 'audio', label: 'Audio' }
                                                    ]}
                                                />
                                                <FileInput
                                                    label="Select Media File"
                                                    placeholder="Click to upload media file"
                                                    accept={question.media.type === 'image' ? 'image/*' : 'audio/*'}
                                                    value={question.media.data}
                                                    onChange={(file) =>
                                                        handleMediaChange(roundIndex, questionIndex, 'data', file)
                                                    }
                                                    disabled={question.media.type === ''}
                                                />
                                                {question.media.type === 'image' && question.media.data && (
                                                    <Image
                                                        // src={URL.createObjectURL(question.media.url)}
                                                        src={question.media.data}
                                                        alt="Selected Image"
                                                        w={200}
                                                        // h={200}
                                                        style={{ objectFit: 'contain' }}
                                                    />
                                                )}

                                                {question.media.type === 'audio' && question.media.data && (
                                                    <audio controls>
                                                        {/* <source src={URL.createObjectURL(question.media.url)} type="audio/mp3" /> */}
                                                        <source src={question.media.data} type="audio/mp3" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                )}

                                                <Grid>
                                                    {question.options.map((option: string, optionIndex: number) => (
                                                        <Grid.Col span={6} key={optionIndex}>
                                                            <TextInput
                                                                required
                                                                label={`Option ${String.fromCharCode(65 + optionIndex)}`}
                                                                placeholder={`Enter option ${String.fromCharCode(65 + optionIndex)}...`}
                                                                value={option}
                                                                onChange={(event) =>
                                                                    handleOptionChange(roundIndex, questionIndex, optionIndex, event.currentTarget.value)
                                                                }
                                                                styles={{
                                                                    label: { fontSize: '14px', color: '#868e96' }
                                                                }}
                                                            />
                                                        </Grid.Col>
                                                    ))}
                                                </Grid>
                                                <Box style={{ maxWidth: '300px' }}>
                                                    <Select
                                                        label="Correct Option"
                                                        placeholder="Select correct option"
                                                        value={question.correctOption}
                                                        disabled={question.options.some((option: string) => option === '')}
                                                        onChange={(value) =>
                                                            handleQuestionChange(roundIndex, questionIndex, 'correctOption', value as string)
                                                        }
                                                        // data={[
                                                        //     { value: 'Option A', label: 'Option A' },
                                                        //     { value: 'Option B', label: 'Option B' },
                                                        //     { value: 'Option C', label: 'Option C' },
                                                        //     { value: 'Option D', label: 'Option D' }
                                                        // ]}
                                                        data={question.options
                                                            .filter((option: string, index: number, array: string[]) => {
                                                                // Only include non-empty options and remove duplicates
                                                                return option.trim() !== '' && 
                                                                       array.indexOf(option) === index; // Keep only first occurrence of duplicate
                                                            })
                                                            .map((option: string) => ({
                                                                value: option, // Pass the actual option text as value
                                                                label: `${option}`
                                                            }))
                                                        }
                                                        styles={{
                                                            label: { fontSize: '14px', color: '#868e96' }
                                                        }}
                                                    />
                                                </Box>
                                            </>
                                        )}

                                        {/* Rapid-Fire Round Fields */}
                                        {round.questionType === 'rapid-fire' && (
                                            <TextInput
                                                required
                                                label="Correct Answer"
                                                placeholder="Enter the correct answer..."
                                                value={question.correctAnswer}
                                                onChange={(event) =>
                                                    handleQuestionChange(roundIndex, questionIndex, 'correctAnswer', event.currentTarget.value)
                                                }
                                            />
                                        )}
                                    </Stack>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                ))}
                {/* <Button
                onClick={() => console.log('All Questions Data:', quizDetails, rounds)}
                // variant="outline"
                color="blue"
                size="md"
                mt="md"
                fullWidth
            >
                Log Questions (for testing purpose)
            </Button> */}
                {/* Start Button */}
                <Center mt="lg">
                    <Button
                        // onClick={handleContinue}
                        type="submit"
                        variant="gradient"
                        gradient={{ from: 'green', to: 'blue' }}
                        size="xl"
                        color="blue"
                        // leftSection={<Play size={24} />}
                        style={{ fontWeight: 'bold' }}
                        fullWidth
                    // disabled={rounds.some((round: any) => round.questions.some((question: any) => !question.statement || question.options.some((option: any) => !option)))}
                    >
                        Continue
                    </Button>
                </Center>
                <Space h="sm" />
                {rounds && <QuizPreviewModal quizData={quizData} />}
            </form>
        </Container>
    );
}