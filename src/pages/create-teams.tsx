import { useState } from 'react';
import {
    Container,
    Title,
    TextInput,
    Button,
    Group,
    Stack,
    Paper,
    Grid,
} from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const TeamsDetailForm = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { quizName, numberOfTeams, numberOfMembers, numberOfRounds, quizMaster, schoolName, address, logo } = location.state || {};

    const [teams, setTeams] = useState(
        Array.from({ length: numberOfTeams }, (_, i) => ({
            id: i + 1,
            name: 'Team ' + (i + 1),
            members: Array(numberOfMembers).fill('Member ' + (i + 1))
        }))
    );

    //   const addTeam = () => {
    //     const newTeam = {
    //       id: teams.length + 1,
    //       name: '',
    //       members: ['', '', '', '']
    //     };
    //     setTeams([...teams, newTeam]);
    //   };

    // const removeTeam = (teamId) => {
    //     if (teams.length > 1) {
    //         setTeams(teams.filter(team => team.id !== teamId));
    //     }
    // };

    const updateTeamName = (teamId: number, name: string) => {
        setTeams(teams.map(team =>
            team.id === teamId ? { ...team, name } : team
        ));
    };

    const updateMemberName = (teamId: number, memberIndex: number, name: string) => {
        setTeams(teams.map(team =>
            team.id === teamId
                ? {
                    ...team,
                    members: team.members.map((member, index) =>
                        index === memberIndex ? name : member
                    )
                }
                : team
        ));
    };

    const handleContinue = () => {
        console.log('Teams data:', teams);
        navigate('/create-rounds', {
            state: {
                quizName,
                schoolName,
                address,
                numberOfTeams,
                numberOfMembers,
                numberOfRounds,
                teams,
                quizMaster,
                logo
            }
        });
    };

    return (

        <Container size="lg" py="xl">
            <BackButton />
            <Title order={1} ta="center">
                Provide Teams Details
            </Title>
            <Paper mt="xl" p="md" shadow="sm" radius="md" withBorder>
                <Title order={3} mb="md" ta="center" tt="uppercase" c="blue">{quizName}</Title>
                <Stack gap="xl">
                    {teams.map((team, teamIndex) => (
                        <Paper key={team.id} p="md" withBorder>
                            <Group justify="center" mb="md">
                                <TextInput
                                    placeholder={`Team ${teamIndex + 1} Name`}
                                    label={`Team ${teamIndex + 1} Name`}
                                    required
                                    size="md"
                                    value={team.name}
                                    onChange={(e) => updateTeamName(team.id, e.target.value)}
                                    ta="center"
                                // style={{ flex: 1 }}
                                />
                                {/* {teams.length > 1 && (
                                    <ActionIcon
                                        color="red"
                                        variant="light"
                                        size="lg"
                                        onClick={() => removeTeam(team.id)}
                                        style={{ marginTop: '25px' }}
                                    >
                                        <Trash size={16} />
                                    </ActionIcon>
                                )} */}


                            </Group>

                            {/* <Group justify="center"> */}
                            <Grid>
                                {team.members.map((member, memberIndex) => (
                                    <Grid.Col key={memberIndex} span={6}>
                                        <TextInput
                                            placeholder={`Member ${memberIndex + 1} Name`}
                                            size="md"
                                            value={member}
                                            onChange={(e) => updateMemberName(team.id, memberIndex, e.target.value)}
                                        />
                                    </Grid.Col>
                                ))}
                            </Grid>
                            {/* </Group> */}
                        </Paper>
                    ))}

                    {/* <Group justify="center">
                        <Button
                            leftSection={<Plus size={16} />}
                            variant="outline"
                            onClick={addTeam}
                        >
                            Add Team
                        </Button>
                    </Group> */}

                    <Group justify="center">
                        <Button
                            size="lg"
                            onClick={handleContinue}
                            fullWidth
                            disabled={teams.some(team => team.name.trim() === '') || teams.some(team => team.members.some(member => member.trim() === ''))}
                        >
                            Continue
                        </Button>
                    </Group>
                </Stack>
            </Paper>
        </Container>
    );
};

export default TeamsDetailForm;