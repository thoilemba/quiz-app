import { Group, Stack, Text } from "@mantine/core";
import { Trophy, Users, User, Hash, ClipboardPenLine } from "lucide-react";

export default function QuizInfo({ quizName, numberOfTeams, numberOfMembers, numberOfRounds, quizMaster }: { quizName: string, numberOfTeams: number, numberOfMembers: number, numberOfRounds: number, quizMaster: string }) {
    return (
        <Group justify="center" mb="md">
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
                <Group>
                    <ClipboardPenLine size={16} color="red" />
                    <Text>Quiz Master: <span style={{ fontWeight: 'bold' }}>{quizMaster}</span></Text>
                </Group>
            </Stack>
        </Group>
    );
}