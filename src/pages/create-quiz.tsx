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
    Paper,
    FileButton,
    ActionIcon,
    Image,
    Center,
    Text
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

export default function CreateQuiz() {
    const navigate = useNavigate();
    const [quizName, setQuizName] = useState('Testing');
    const [numberOfTeams, setNumberOfTeams] = useState(4);
    const [numberOfMembers, setNumberOfMembers] = useState(4);
    const [numberOfRounds, setNumberOfRounds] = useState(3);
    const [schoolName, setSchoolName] = useState('');
    const [address, setAddress] = useState('');
    const [quizMaster, setQuizMaster] = useState('');
    const [logo, setLogo] = useState<string | null>(null);

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
                quizMaster,
                logo
            }
        });
    };

    // const handleCancel = () => {
    //     console.log('Cancelled');
    //     // Add your cancel logic here
    // };

    const handleFileUpload = (file: File | null) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setLogo(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogo(null);
    };

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
                        <Text ta="center" fw={600}>Upload School Logo (Optional)</Text>
                        <Center>
                            {/* <Box w={150} h={150} style={{ position: "relative" }}>
                                {logo ? (
                                    <>
                                        <Image
                                            src={logo}
                                            alt="Uploaded Logo"
                                            radius="md"
                                            w="100%"
                                            h="100%"
                                            fit="contain"
                                        />
                                        <ActionIcon
                                            color="red"
                                            variant="filled"
                                            radius="xl"
                                            size="sm"
                                            onClick={removeLogo}
                                            style={{
                                                position: "absolute",
                                                top: 4,
                                                right: 4,
                                                zIndex: 2,
                                            }}
                                        >
                                            <X size={14} />
                                        </ActionIcon>
                                    </>
                                ) : (
                                    <Group
                                        w="100%"
                                        h="100%"
                                        style={{
                                            border: "1px dashed #ccc",
                                            borderRadius: "8px",
                                        }}
                                        justify="center"
                                        align="center"
                                    >
                                        <FileButton onChange={handleFileUpload} accept="image/*">
                                            {(props) => (
                                                <Button {...props} variant="light" size="xs">
                                                    Upload Logo
                                                </Button>
                                            )}
                                        </FileButton>
                                    </Group>
                                )}
                            </Box> */}
                            <Box w={150} h={150} style={{ position: "relative" }}>
                                {logo ? (
                                    <>
                                        <Image
                                            src={logo}
                                            alt="Uploaded Logo"
                                            radius="md"
                                            w="100%"
                                            h="100%"
                                            fit="contain"
                                        />
                                        <ActionIcon
                                            color="red"
                                            variant="filled"
                                            radius="xl"
                                            size="sm"
                                            onClick={removeLogo}
                                            style={{
                                                position: "absolute",
                                                top: 4,
                                                right: 4,
                                                zIndex: 2,
                                            }}
                                        >
                                            <X size={14} />
                                        </ActionIcon>
                                    </>
                                ) : (
                                    <FileButton onChange={handleFileUpload} accept="image/*">
                                        {(props) => (
                                            <Center
                                                {...props}
                                                style={{
                                                    border: "1px dashed #ccc",
                                                    borderRadius: "8px",
                                                    width: "100%",
                                                    height: "100%",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                <Upload size="2rem" strokeWidth={1.5} />
                                            </Center>
                                        )}
                                    </FileButton>
                                )}
                            </Box>
                        </Center>
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