import { Route, Routes } from 'react-router-dom'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css';

import Quiz from './components/Quiz'
import Details from './pages/details'
import Results from './pages/results'
import CreateQuiz from './pages/create-quiz'
import CreateTeams from './pages/create-teams'
import CreateRounds from './pages/create-rounds'
import CreateQuestions from './pages/create-questions';
import HomePage from './pages/home';
import QuizStart from './pages/quiz-start';

function App() {

  const theme = createTheme({
    /** Your theme configuration here */
  });

  return (
    <MantineProvider theme={theme}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/create-teams" element={<CreateTeams />} />
        <Route path="/create-rounds" element={<CreateRounds />} />
        <Route path="/create-questions" element={<CreateQuestions />} />
        <Route path="/quiz-detail" element={<Details />} />
        <Route path="/quiz" element={<Quiz />} />
        {/* <Route path="/quiz" element={<QuizStart />} /> */}
        <Route path="/results" element={<Results />} />
      </Routes>
    </MantineProvider>
  )
}

export default App
