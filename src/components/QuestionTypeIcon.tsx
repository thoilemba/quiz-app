import { FileAudio, Zap, CheckSquare2, Circle } from "lucide-react";

export const getQuestionTypeIcon = (type: string) => {
    switch (type) {
        case 'audio-visual':
            return <FileAudio size={16} />;
        case 'rapid-fire':
            return <Zap size={16} />;
        case 'normal':
            return <CheckSquare2 size={16} />;
        default:
            return <Circle size={16} />;
    }
};