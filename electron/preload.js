const { contextBridge, ipcRenderer } = require('electron');

// Optional: Expose APIs to renderer if needed
window.addEventListener('DOMContentLoaded', () => {
  console.log('Electron preload loaded');
});


contextBridge.exposeInMainWorld('electronAPI', {
  saveQuizJSON: (quizData) => ipcRenderer.invoke('save-quiz-json', quizData),
  loadQuizJson: () => ipcRenderer.invoke('load-quiz-json'),
  playCorrectSound: () => ipcRenderer.invoke('get-correct-sound-path'),
  playWrongSound: () => ipcRenderer.invoke('get-wrong-sound-path')
});