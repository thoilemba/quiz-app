import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
    return (
        <Button
            leftSection={<ArrowLeft size={16} />}
            variant="default"
            color="blue"
            onClick={() => window.history.back()}
        >
            Back
        </Button>
    );
};

export default BackButton;