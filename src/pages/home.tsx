import {
    Container,
    Title,
    Text,
    Button,
    Group,
    Stack,
    ThemeIcon,
    Center,
} from '@mantine/core';
import {
    Plus,
    Upload,
    BookOpen,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuizHomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleCreateQuiz = () => {
        navigate('/create-quiz');
    };

    const handleLoadQuiz = async () => {
        try {
            const data = await window.electronAPI.loadQuizJson();
            // console.log('Quiz data loaded:', data);
            if (data) {
                navigate('/quiz-detail', { state: { quizData: data } }); // use 'data' directly
            }
        } catch (error) {
            // console.error('Failed to load quiz data:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert(`Failed to load quiz data: ${errorMessage}`);
        }
    };

    return (
        <Container size="xl" py="xl">
            {/* Header Section */}
            <Center mb="xl">
                <Stack align="center" gap="md">
                    <ThemeIcon size={60} radius="xl" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
                        <BookOpen size={30} />
                    </ThemeIcon>
                    <Title order={1} size="h1" ta="center" c="blue">
                        Quiz Master
                    </Title>
                    <Text size="lg" c="dimmed" ta="center">
                        Create, share, and take interactive quizzes
                    </Text>
                </Stack>
            </Center>

            {/* Action Buttons */}
            <Center mb="xl">
                <Group gap="lg">
                    <Button
                        size="lg"
                        leftSection={<Plus size={20} />}
                        onClick={handleCreateQuiz}
                        variant="filled"
                        radius="md"
                    >
                        Create New Quiz
                    </Button>
                    <Button
                        size="lg"
                        leftSection={<Upload size={20} />}
                        onClick={handleLoadQuiz}
                        variant="outline"
                        radius="md"
                    >
                        Load Quiz
                    </Button>
                </Group>
            </Center>
        </Container>
    );
};

export default QuizHomePage;