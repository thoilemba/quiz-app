import { Volume2, Zap, FileText } from "lucide-react";

export const getRoundIcon = (type: string) => {
    switch (type) {
        case 'audio-visual': return <Volume2 className="w-5 h-5" />;
        case 'rapid-fire': return <Zap className="w-5 h-5" />;
        default: return <FileText className="w-5 h-5" />;
    }
};