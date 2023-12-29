import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Test from './pages/Test'
import ResultPage from './pages/ResultPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage></HomePage>}></Route>
      <Route path='/rs' element={<ResultPage></ResultPage>}></Route>
      <Route path='/test' element={<Test></Test>}></Route>
    </Routes>
  )
}

export default App
