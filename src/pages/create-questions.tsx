import { Container, Title, Paper, Group, Badge, Box, Grid, Select, TextInput, Stack, Button, Space, FileInput, Image, Center, Modal, Text } from "@mantine/core";
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
    const { quizName, numberOfTeams, numberOfMembers, numberOfRounds, teams, roundsConfig, quizMaster, schoolName, address, logo } = location.state || {};
    const [confirmModalOpened, setConfirmModalOpened] = useState(false);

    const [rounds, setRounds] = useState(() =>
        roundsConfig.map((round: any) => ({
            ...round,
            questions: Array.from({ length: round.numberOfQuestions }).map(() => {
                switch (round.questionType) {
                    case 'normal':
                        return {
                            statement: '',
                            options: ['', '', '', ''],
                            correctAnswer: ''
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
                            correctAnswer: ''
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
        schoolLogo: logo,
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

        // Check file size (10MB limit for videos)
        const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 10MB in bytes
        const round = rounds[roundIndex];
        const isVideo = round.questions[questionIndex].media.type === 'video';

        if (isVideo && file.size > MAX_VIDEO_SIZE) {
            alert('Video file size must be less than 50MB');
            return;
        }
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

    // Check if all required fields are filled to enable the continue button
    const isFormValid = () => {
        return rounds.every((round: any) =>
            round.questions.every((question: any) =>
                question.statement.trim() !== '' &&
                (round.questionType === 'rapid-fire'
                    ? question.correctAnswer.trim() !== ''
                    : round.questionType === 'audio-visual'
                        ? question.media.data.trim() !== '' &&
                        question.media.type.trim() !== '' &&
                        question.correctAnswer.trim() !== ''
                        : question.correctAnswer.trim() !== '' &&
                        question.options.every((option: string) => option.trim() !== '')
                )
            )
        );
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
                                                {/* Options */}
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
                                                        required
                                                        label="Correct Option"
                                                        placeholder="Select correct option"
                                                        value={question.correctAnswer}
                                                        disabled={question.options.some((option: string) => option === '')}
                                                        onChange={(value) =>
                                                            handleQuestionChange(roundIndex, questionIndex, 'correctAnswer', value as string)
                                                        }
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
                                                        { value: 'audio', label: 'Audio' },
                                                        { value: 'video', label: 'Video' }
                                                    ]}
                                                />
                                                <FileInput
                                                    label="Select Media File"
                                                    placeholder="Click to upload media file"
                                                    description={question.media.type === 'video' ? 'Max file size: 50MB' : ''}
                                                    accept={
                                                        question.media.type === 'image'
                                                            ? 'image/*'
                                                            : question.media.type === 'audio'
                                                                ? 'audio/*'
                                                                : 'video/*'
                                                    }
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

                                                {question.media.type === 'video' && question.media.data && (
                                                    <Box w={200}>
                                                        <video controls>
                                                            {/* <source src={URL.createObjectURL(question.media.url)} type="video/mp4" /> */}
                                                            <source src={question.media.data} type="video/mp4" />
                                                            Your browser does not support the video element.
                                                        </video>
                                                    </Box>
                                                )}
                                                {/* Options */}
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
                                                {/* Correct Option */}
                                                <Box style={{ maxWidth: '300px' }}>
                                                    <Select
                                                        required
                                                        label="Correct Option"
                                                        placeholder="Select correct option"
                                                        value={question.correctAnswer}
                                                        disabled={question.options.some((option: string) => option === '')}
                                                        onChange={(value) =>
                                                            handleQuestionChange(roundIndex, questionIndex, 'correctAnswer', value as string)
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
                    onClick={() => console.log('All Questions Data:', quizData)}
                    // variant="outline"
                    color="blue"
                    size="md"
                    mt="md"
                    fullWidth
                >
                    Log Questions (for testing purpose)
                </Button> */}

                <Center mt="lg">
                    <Button
                        onClick={() => setConfirmModalOpened(true)}
                        // type="submit" // use this if you want to submit the form
                        variant="gradient"
                        gradient={{ from: 'green', to: 'blue' }}
                        size="lg"
                        color="blue"
                        // leftSection={<Play size={24} />}
                        style={{ fontWeight: 'bold' }}
                        fullWidth
                        disabled={!isFormValid()}
                    >
                        Proceed to Start Quiz
                    </Button>
                </Center>
                <Space h="sm" />
                {rounds && <QuizPreviewModal quizData={quizData} isFormValid={isFormValid()} />}
                <Modal
                    opened={confirmModalOpened}
                    onClose={() => setConfirmModalOpened(false)}
                    title="Confirm Quiz Start"
                    centered
                    styles={{
                        title: {
                            width: '100%',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }
                    }}
                >
                    <Text mb="lg">
                        Are you sure you want to start the quiz? Quiz data are not saved!
                    </Text>

                    <Group justify="center" mt="md">
                        <Button variant="outline" color="red" onClick={() => setConfirmModalOpened(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleContinue}>
                            Start Quiz
                        </Button>
                    </Group>
                </Modal>
            </form>
        </Container>
    );
}