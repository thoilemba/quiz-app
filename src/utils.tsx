export const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string); // includes `data:image/png;base64,...`
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};


declare global {
  interface Window {
    electronAPI: {
      saveQuizJSON: (data: any) => Promise<{ success: boolean; error?: string; message?: string }>;
      loadQuizJson: () => Promise<any>;
      playCorrectSound: () => Promise<string>;
      playWrongSound: () => Promise<string>;
    };
  }
}