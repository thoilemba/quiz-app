import { useState } from 'react';
import {
    Container,
    Title,
    TextInput,
    Select,
    Button,
    Stack,
    Group,
    Box,
    Paper
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function CreateQuiz() {
    const navigate = useNavigate();
    const [quizName, setQuizName] = useState('Testing');
    const [numberOfTeams, setNumberOfTeams] = useState(4);
    const [numberOfMembers, setNumberOfMembers] = useState(4);
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [schoolName, setSchoolName] = useState('');
    const [address, setAddress] = useState('');
    const [quizMaster, setQuizMaster] = useState('');

    const teamOptions = [
        { value: '2', label: '2 (Two)' },
        { value: '3', label: '3 (Three)' },
        { value: '4', label: '4 (Four)' },
        { value: '5', label: '5 (Five)' },
        { value: '6', label: '6 (Six)' },
        { value: '7', label: '7 (Seven)' },
        { value: '8', label: '8 (Eight)' },
        { value: '9', label: '9 (Nine)' },
        { value: '10', label: '10 (Ten)' }
    ];

    const numberOptions = [
        { value: '1', label: '1 (One)' },
        { value: '2', label: '2 (Two)' },
        { value: '3', label: '3 (Three)' },
        { value: '4', label: '4 (Four)' },
        { value: '5', label: '5 (Five)' },
        { value: '6', label: '6 (Six)' },
        { value: '7', label: '7 (Seven)' },
        { value: '8', label: '8 (Eight)' },
        { value: '9', label: '9 (Nine)' },
        { value: '10', label: '10 (Ten)' }
    ];

    const handleSaveAndContinue = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent page reload
        console.log('Quiz Data:', {
            quizName,
            numberOfTeams,
            numberOfMembers,
            numberOfRounds,
            schoolName,
            address,
            quizMaster
        });
        // Add your save logic here
        navigate('/create-teams', {
            state: {
                quizName,
                numberOfTeams,
                numberOfMembers,
                numberOfRounds,
                schoolName,
                address,
                quizMaster
            }
        });
    };

    // const handleCancel = () => {
    //     console.log('Cancelled');
    //     // Add your cancel logic here
    // };

    return (
        <Container size="sm" py="xl">
            <Box mb="xl">
                <Group justify="center" align="center">
                    <Title c="dark.8" >
                        Create New Quiz
                    </Title>
                </Group>
            </Box>
            <Paper p="md" shadow="sm" radius="md" withBorder>



                <form onSubmit={handleSaveAndContinue}>
                    <Stack>
                        <TextInput
                            label="Quiz Name"
                            placeholder="Quiz Name"
                            required
                            value={quizName}
                            onChange={(event) => setQuizName(event.currentTarget.value)}
                            size="md"
                        />

                        <TextInput
                            label="School Name"
                            placeholder="School Name"
                            required
                            value={schoolName}
                            onChange={(event) => setSchoolName(event.currentTarget.value)}
                            size="md"
                        />

                        <TextInput
                            label="Address"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={(event) => setAddress(event.currentTarget.value)}
                            size="md"
                        />

                        <Select
                            label="Number of Teams"
                            placeholder="Select number of teams"
                            value={numberOfTeams.toString()}
                            onChange={(value) => setNumberOfTeams(Number(value))}
                            data={teamOptions}
                            size="md"
                        />

                        <Select
                            label="Number of members per team"
                            placeholder="Select number of members per team"
                            value={numberOfMembers.toString()}
                            onChange={(value) => setNumberOfMembers(Number(value))}
                            data={numberOptions}
                            size="md"
                        />

                        <Select
                            label="Number of Quiz Rounds"
                            placeholder="Select number of rounds"
                            value={numberOfRounds.toString()}
                            onChange={(value) => setNumberOfRounds(Number(value))}
                            data={numberOptions}
                            size="md"
                        />

                        <TextInput
                            label="Quiz Master"
                            placeholder="Quiz Master"
                            required
                            value={quizMaster}
                            onChange={(event) => setQuizMaster(event.currentTarget.value)}
                            size="md"
                        />

                        <Stack gap="md">
                            <Button
                                // onClick={handleSaveAndContinue}
                                size="md"
                                fullWidth
                                type="submit"
                            // disabled={quizName === '' || numberOfTeams === '' || numberOfRounds === ''}
                            >
                                Continue
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Paper>
        </Container>
    );
}