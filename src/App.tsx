import { Route, Routes } from 'react-router-dom'
import Quiz from './components/Quiz'
import SetupQuiz from './components/SetupQuiz'
import ResultsScreen from './components/ResultsScreen'

function App() {

  return (
    <>
    <Routes>
      {/* <Route path="/" element={<QuizApp />} /> */}
      <Route path="/" element={<SetupQuiz />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<ResultsScreen />} />
    </Routes>
    </>
  )
}

export default App
