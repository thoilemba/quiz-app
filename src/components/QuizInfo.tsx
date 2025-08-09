import { Group, Image, Stack, Text } from "@mantine/core";
import { Trophy, Users, User, Hash, ClipboardPenLine, School, MapPin } from "lucide-react";

export default function QuizInfo({ quizName, numberOfTeams, numberOfMembers, numberOfRounds, quizMaster, schoolName, address, schoolLogo }: { quizName: string, numberOfTeams: number, numberOfMembers: number, numberOfRounds: number, quizMaster: string, schoolName: string, address: string, schoolLogo: string }) {
    return (
        <Group justify="center" mb="md">
            <Stack gap="xs">
                {schoolLogo && (
                    <Group justify="center">
                        <Image
                            src={schoolLogo}
                            w={150}
                            h={150}
                            // width={30}
                            // height={30}
                            fit="contain"
                            // style={{ borderRadius: '50%' }}
                        />
                    </Group>
                )}
                <Group>
                    <Trophy size={16} color="blue" />
                    <Text>Quiz Name: <span style={{ fontWeight: 'bold' }}>{quizName}</span></Text>
                </Group>
                <Group>
                    <School size={16} color="blue" />
                    <Text>School Name: <span style={{ fontWeight: 'bold' }}>{schoolName}</span></Text>
                </Group>
                <Group>
                    <MapPin size={16} color="blue" />
                    <Text>Address: <span style={{ fontWeight: 'bold' }}>{address}</span></Text>
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