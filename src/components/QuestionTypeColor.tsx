export const getQuestionTypeColor = (type: string) => {
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