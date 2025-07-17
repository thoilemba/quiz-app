import { Route, Routes } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css';

import Quiz from './components/Quiz'
import Detail from './pages/details'
import Results from './pages/results'
import CreateQuiz from './pages/create-quiz'
import CreateTeams from './pages/create-teams'
import CreateRounds from './pages/create-rounds'

function App() {

  const theme = createTheme({
    /** Your theme configuration here */
  });

  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/" element={<CreateQuiz />} />
        <Route path="/create-teams" element={<CreateTeams />} />
        <Route path="/create-rounds" element={<CreateRounds />} />
        <Route path="/quiz-detail" element={<Detail />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
