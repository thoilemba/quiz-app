import { app, BrowserWindow, ipcMain, dialog, Menu } from 'electron';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../dist/index.html'));
  } else {
    win.loadURL('http://localhost:5173');
  }
};

app.whenReady().then(() => {

  const template = [
    {
      label: 'Navigation',
      submenu: [
        {
          label: 'Back',
          // accelerator: 'Alt+Left', // Keyboard shortcut
          click: (menuItem, browserWindow) => {
            if (browserWindow && browserWindow.webContents.navigationHistory.canGoBack()) {
              browserWindow.webContents.navigationHistory.goBack();
            }
          }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  createWindow();

  ipcMain.handle('save-quiz-json', async (event, quizData) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      title: 'Save Quiz Data',
      defaultPath: 'quiz-data.json',
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });

    if (canceled || !filePath) return { success: false, message: 'Save operation cancelled' };

    try {
      fs.writeFileSync(filePath, JSON.stringify(quizData, null, 2));
      return { success: true };
    } catch (err) {
      console.error('Error saving quiz:', err);
      return { success: false, error: err.message };
    }
  });

  // Handle file picker + reading file
  ipcMain.handle('load-quiz-json', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'JSON', extensions: ['json'] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    const filePath = result.filePaths[0];
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  });

  // Add these new IPC handlers for sound paths
  ipcMain.handle('get-correct-sound-path', () => {
    if (app.isPackaged) {
      // In production, sounds are in the dist folder
      return join(__dirname, '../dist/sounds/correct.wav');
    } else {
      // In development, sounds are in the public folder
      return join(__dirname, '../public/sounds/correct.wav');
    }
  });

  ipcMain.handle('get-wrong-sound-path', () => {
    if (app.isPackaged) {
      return join(__dirname, '../dist/sounds/wrong.wav');
    } else {
      return join(__dirname, '../public/sounds/wrong.wav');
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

