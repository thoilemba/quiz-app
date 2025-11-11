import { Stack, Group, Badge, Title, Flex, Center, Paper, Button, Text } from "@mantine/core";
import { Play } from "lucide-react";
import { getQuestionTypeColor } from "./QuestionTypeColor";
import { getQuestionTypeIcon } from "./QuestionTypeIcon";


// Used in quiz-start to display each rounds details
export default function RoundDetail({ round, onContinue }: { round: any, onContinue: () => void }) {
    return (
        <Stack my="xl">
            <Paper
                p="md"
                radius="md"
                style={{
                    flex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(12px)',
                    // border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
            >

                {/* Round Info */}
                <Stack justify="space-between">
                    <Title ta="center">
                        Round {round.roundNumber}
                    </Title>
                    {round.questionType === 'rapid-fire' && <Group gap="xs" justify="center">
                        <Text size="lg">Time Limit: 5 seconds</Text>
                    </Group>}
                    <Center>
                        <Badge
                            variant="outline"
                            color={getQuestionTypeColor(round.questionType)}
                            size="lg"
                            p="md"
                            style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
                        >
                            <Flex gap="xs">
                                {getQuestionTypeIcon(round.questionType)}{round.questionType}
                            </Flex>
                        </Badge>
                    </Center>
                    <Group gap="xs" justify="center">
                        {/* <HelpCircle size={32} /> */}
                        <Title ta="center">
                            Number of Questions: {round.numberOfQuestions}
                        </Title>
                    </Group>
                </Stack>
            </Paper>
            <Button
                variant="gradient"
                gradient={{ from: 'green', to: 'blue' }}
                size="lg"
                leftSection={<Play size={20} />}
                onClick={onContinue}
            >
                Start
            </Button>
        </Stack>
    );
}