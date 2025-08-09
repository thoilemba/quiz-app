// import { useState } from "react";
// import {
//     Container,
//     Title,
//     Paper,
//     Grid,
//     Text,
//     NumberInput,
//     Select,
//     Button,
//     Group,
//     Badge,
//     Alert,
//     Flex,
//     Stack,
//     TextInput,
//     Textarea,
//     Box
// } from '@mantine/core';
// import { Circle, FileAudio, Zap, User, Users, Trophy, Hash } from "lucide-react";
// import { useLocation } from 'react-router-dom';
// import BackButton from "../components/BackButton";

// interface Round {
//     roundNumber: number;
//     numberOfQuestions: number;
//     questionType: string;
//     questions: string[];
// }

// export default function CreateRounds() {

//     const location = useLocation();
//     const { quizName, numberOfTeams, numberOfMembers, numberOfRounds, teams } = location.state || {};

//     // Simulated location state (in your actual app, this would come from useLocation())
//     // const locationState = {
//     //     quizName: "Science Quiz",
//     //     numberOfTeams: 4,
//     //     numberOfMembers: 3,
//     //     numberOfRounds: 5,
//     //     teams: ["Team A", "Team B", "Team C", "Team D"]
//     // };

//     // Initialize rounds configuration
//     const [roundsConfig, setRoundsConfig] = useState<Round[]>(() => {
//         const initialConfig = [];
//         for (let i = 1; i <= numberOfRounds; i++) {
//             initialConfig.push({
//                 roundNumber: i,
//                 numberOfQuestions: 0, // default value
//                 questionType: "", // default type
//                 questions: []
//             });
//         }
//         return initialConfig;
//     });

//     const questionTypes = [
//         {
//             value: "normal",
//             label: "Normal Round",
//             description: "4 answers options - Allow pass"
//         },
//         {
//             value: "audio-visual",
//             label: "Audio/Visual Round",
//             description: "4 answers options - Allow pass"
//         },
//         {
//             value: "rapid-fire",
//             label: "Rapid Fire Round",
//             description: "5 seconds - No options shown - No pass"
//         }
//     ];

//     const [questionData, setQuestionData] = useState({
//         statement: 'temp',
//         optionA: 'temp',
//         optionB: 'temp',
//         optionC: 'temp',
//         optionD: 'temp',
//         correctOption: 'Option A'
//     });

//     const handleRoundConfigChange = (roundIndex: number, field: string, value: string | number) => {
//         setRoundsConfig(prev => {
//             const updated = [...prev];
//             updated[roundIndex] = {
//                 ...updated[roundIndex],
//                 [field]: value
//             };
//             return updated;
//         });
//     };

//     const handleCreateQuiz = () => {
//         // Here you would typically navigate to the next step or save the configuration
//         console.log("Quiz Configuration:", {
//             quizName,
//             numberOfTeams,
//             numberOfMembers,
//             teams,
//             roundsConfig
//         });
//         // Add navigation logic here
//     };

//     const getQuestionTypeColor = (type: string) => {
//         switch (type) {
//             case 'audio-visual':
//                 return 'blue';
//             case 'rapid-fire':
//                 return 'orange';
//             case 'normal':
//                 return 'green';
//             default:
//                 return 'gray';
//         }
//     };

//     const getQuestionTypeIcon = (type: string) => {
//         switch (type) {
//             case 'audio-visual':
//                 return <FileAudio size={16} />;
//             case 'rapid-fire':
//                 return <Zap size={16} />;
//             case 'normal':
//                 return <Circle size={16} />;
//             default:
//                 return <Circle size={16} />;
//         }
//     };

//     const handleQuestionChange = (roundIndex: number, questionIndex: number, value: string) => {
//         // Update the specific question in the round
//         const updatedRounds = [...roundsConfig];
//         if (!updatedRounds[roundIndex].questions) {
//             updatedRounds[roundIndex].questions = [];
//         }
//         updatedRounds[roundIndex].questions[questionIndex] = value;
//         const updatedQuestion = {
//             statement: questionData.statement,
//             options: [questionData.optionA, questionData.optionB, questionData.optionC, questionData.optionD],
//             correctOption: questionData.correctOption
//         };
//         updatedRounds[roundIndex].questions[questionIndex] = updatedQuestion;
//         setRoundsConfig(updatedRounds); // or however you manage your state
//     };


//     const handleChange = (field: string, value: string) => {
//         setQuestionData(prev => ({
//             ...prev,
//             [field]: value
//         }));
//     };

//     return (
//         <Container size="xl" py="xl" >
//             <BackButton />
//             <Title order={1} mb="md" ta="center">Create Rounds</Title>

//             {/* <Group justify="center" mb="md">
//                 <Badge
//                     color="blue"
//                     variant="light"
//                     size="lg"
//                     leftSection={<Trophy size={14} />}
//                 >
//                     Quiz Name: {quizName}
//                 </Badge>
//                 <Badge
//                     color="green"
//                     variant="light"
//                     size="lg"
//                     leftSection={<Users size={14} />}
//                 >
//                     Teams: {numberOfTeams}
//                 </Badge>
//                 <Badge
//                     color="violet"
//                     variant="light"
//                     size="lg"
//                     leftSection={<User size={14} />}
//                 >
//                     Members per Team: {numberOfMembers}
//                 </Badge>
//                 <Badge
//                     color="orange"
//                     variant="light"
//                     size="lg"
//                     leftSection={<Hash size={14} />}
//                 >
//                     Total Rounds: {numberOfRounds}
//                 </Badge>
//             </Group> */}

//             <Group justify="center" mb="md">
//                 <Stack gap="xs">
//                     <Group>
//                         <Trophy size={16} color="blue" />
//                         <Text>Quiz Name: <span style={{ fontWeight: 'bold' }}>{quizName}</span></Text>
//                     </Group>
//                     <Group>
//                         <Users size={16} color="green" />
//                         <Text>Teams: <span style={{ fontWeight: 'bold' }}>{numberOfTeams}</span></Text>
//                     </Group>
//                     <Group>
//                         <User size={16} color="violet" />
//                         <Text>Members per Team: <span style={{ fontWeight: 'bold' }}>{numberOfMembers}</span></Text>
//                     </Group>
//                     <Group>
//                         <Hash size={16} color="orange" />
//                         <Text>Rounds: <span style={{ fontWeight: 'bold' }}>{numberOfRounds}</span></Text>
//                     </Group>
//                 </Stack>
//             </Group>

//             <Stack gap="lg">
//                 {roundsConfig.map((round, index) => (
//                     <Paper key={round.roundNumber} shadow="sm" p="lg" withBorder>
//                         <Group justify="apart" mb="md">
//                             <Title order={3}>Round {round.roundNumber}</Title>
//                             <Badge
//                                 color={getQuestionTypeColor(round.questionType)}
//                                 variant="light"
//                                 size="lg"
//                             >
//                                 {questionTypes.find(type => type.value === round.questionType)?.label}
//                             </Badge>
//                         </Group>

//                         <Grid>
//                             {/* Question Type */}
//                             <Flex gap="md" >
//                                 <Select
//                                     label="Question Type"
//                                     description="Select the type of questions for this round"
//                                     placeholder="Choose question type"
//                                     value={round.questionType}
//                                     onChange={(value) => handleRoundConfigChange(index, 'questionType', value as string)}
//                                     data={questionTypes.map(type => ({
//                                         value: type.value,
//                                         label: type.label
//                                     }))}
//                                     required
//                                 />

//                                 {/* <Box mt="md"> */}
//                                 {round.questionType && (
//                                     <Alert
//                                         icon={getQuestionTypeIcon(round.questionType)}
//                                         color={getQuestionTypeColor(round.questionType)}
//                                         variant="light"
//                                     >
//                                         <Text size="sm">
//                                             {/* <Text component="span" fw={500}>
//                                                 {questionTypes.find(type => type.value === round.questionType)?.label}:
//                                             </Text>{' '} */}
//                                             {questionTypes.find(type => type.value === round.questionType)?.description}
//                                         </Text>
//                                     </Alert>
//                                 )}
//                                 {/* </Box> */}
//                             </Flex>
//                             <Grid.Col>
//                                 <NumberInput
//                                     label="Number of Questions"
//                                     description="Enter the number of questions for this round"
//                                     placeholder="Enter number of questions"
//                                     value={round.numberOfQuestions}
//                                     onChange={(value) => handleRoundConfigChange(index, 'numberOfQuestions', value)}
//                                     min={1}
//                                     max={50}
//                                     required
//                                 />
//                             </Grid.Col>
//                             {/* Render question inputs dynamically */}
//                             {round.numberOfQuestions > 0 && (
//                                 <>
//                                     {Array.from({ length: round.numberOfQuestions }).map((_, qIndex) => (
//                                         // <Grid.Col key={qIndex} span={12}>
//                                         //     <TextInput
//                                         //         label={`Question ${qIndex + 1}`}
//                                         //         placeholder={`Enter question ${qIndex + 1}`}
//                                         //         value={round.questions?.[qIndex] || ''}
//                                         //         onChange={(event) =>
//                                         //             handleQuestionChange(index, qIndex, event.currentTarget.value)
//                                         //         }
//                                         //         required
//                                         //     />
//                                         // </Grid.Col>

//                                         <Box p="md" style={{ maxWidth: '800px', margin: '0 auto' }}>
//                                             <Stack gap="xs">
//                                                     <TextInput
//                                                         label={`Question ${qIndex + 1}`}
//                                                         placeholder="Enter your question here..."
//                                                         // value={questionData.statement}
//                                                         // onChange={(event) => handleChange('statement', event.currentTarget.value)}
//                                                         value={round.questions?.[qIndex] || ''}
//                                                         onChange={(event) =>
//                                                             handleQuestionChange(index, qIndex, event.currentTarget.value)
//                                                         }
//                                                         required
//                                                     />

//                                                 {/* Options Grid */}    
//                                                 <Grid>
//                                                     <Grid.Col span={6}>
//                                                         <TextInput
//                                                             label="Option A"
//                                                             placeholder="Enter option A..."
//                                                             value={questionData.optionA}
//                                                             onChange={(event) => handleChange('optionA', event.currentTarget.value)}
//                                                             styles={{
//                                                                 label: {
//                                                                     fontSize: '14px',
//                                                                     color: '#868e96',
//                                                                     // marginBottom: '8px'
//                                                                 }
//                                                             }}
//                                                         />
//                                                     </Grid.Col>

//                                                     <Grid.Col span={6}>
//                                                         <TextInput
//                                                             label="Option B"
//                                                             placeholder="Enter option B..."
//                                                             value={questionData.optionB}
//                                                             onChange={(event) => handleChange('optionB', event.currentTarget.value)}
//                                                             styles={{
//                                                                 label: {
//                                                                     fontSize: '14px',
//                                                                     color: '#868e96',
//                                                                     // marginBottom: '8px'
//                                                                 }
//                                                             }}
//                                                         />
//                                                     </Grid.Col>

//                                                     <Grid.Col span={6}>
//                                                         <TextInput
//                                                             label="Option C"
//                                                             placeholder="Enter option C..."
//                                                             value={questionData.optionC}
//                                                             onChange={(event) => handleChange('optionC', event.currentTarget.value)}
//                                                             styles={{
//                                                                 label: {
//                                                                     fontSize: '14px',
//                                                                     color: '#868e96',
//                                                                     // marginBottom: '8px'
//                                                                 }
//                                                             }}
//                                                         />
//                                                     </Grid.Col>

//                                                     <Grid.Col span={6}>
//                                                         <TextInput
//                                                             label="Option D"
//                                                             placeholder="Enter option D..."
//                                                             value={questionData.optionD}
//                                                             onChange={(event) => handleChange('optionD', event.currentTarget.value)}
//                                                             styles={{
//                                                                 label: {
//                                                                     fontSize: '14px',
//                                                                     color: '#868e96',
//                                                                     // marginBottom: '8px'
//                                                                 }
//                                                             }}
//                                                         />
//                                                     </Grid.Col>
//                                                 </Grid>

//                                                 {/* Correct Option Selector */}
//                                                 <Box style={{ maxWidth: '300px' }}>
//                                                     <Select
//                                                         label="Correct Option"
//                                                         placeholder="Select correct option"
//                                                         value={questionData.correctOption}
//                                                         onChange={(value) => handleChange('correctOption', value as string)}
//                                                         data={[
//                                                             { value: 'Option A', label: 'Option A' },
//                                                             { value: 'Option B', label: 'Option B' },
//                                                             { value: 'Option C', label: 'Option C' },
//                                                             { value: 'Option D', label: 'Option D' }
//                                                         ]}
//                                                         styles={{
//                                                             label: {
//                                                                 fontSize: '14px',
//                                                                 color: '#868e96',
//                                                                 // marginBottom: '8px'
//                                                             }
//                                                         }}
//                                                     />
//                                                 </Box>
//                                             </Stack>
//                                         </Box>
//                                     ))}

//                                 </>
//                             )}
//                         </Grid>
//                     </Paper>
//                 ))}
//             </Stack>

//             <Flex justify="center" gap="md" py="md">

//                 <Button
//                     fullWidth
//                     onClick={handleCreateQuiz}
//                     size="lg"
//                     disabled={roundsConfig.some(round => !round.questionType || !round.numberOfQuestions)}
//                 >
//                     Create Quiz
//                 </Button>
//             </Flex>
//         </Container>
//     );
// }


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
        console.log("Quiz Configuration:", {
            quizName,
            schoolName,
            address,
            numberOfTeams,
            numberOfMembers,
            numberOfRounds,
            teams,
            quizMaster,
            roundsConfig,
        });
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
            
            {/* Quiz Details */}
            {/* <Group justify="center" mb="md">
                <Stack gap="xs">
                    <Group>
                        <Trophy size={16} color="blue" />
                        <Text>Quiz Name: <span style={{ fontWeight: 'bold' }}>{quizName}</span></Text>
                    </Group>
                    <Group>
                        <Users size={16} color="green" />
                        <Text>Teams: <span style={{ fontWeight: 'bold' }}>{numberOfTeams}</span></Text>
                    </Group>
                    <Group>
                        <User size={16} color="violet" />
                        <Text>Members per Team: <span style={{ fontWeight: 'bold' }}>{numberOfMembers}</span></Text>
                    </Group>
                    <Group>
                        <Hash size={16} color="orange" />
                        <Text>Rounds: <span style={{ fontWeight: 'bold' }}>{numberOfRounds}</span></Text>
                    </Group>
                </Stack>
            </Group> */}
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

                            {/* <Box mt="md"> */}
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
                            {/* </Box> */}
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