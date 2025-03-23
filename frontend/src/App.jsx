
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './views/Home'
import { Toaster } from 'sonner'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Toaster position='top-right' />
          <Routes>
            <Route path='/' element={<UserLayout />}>
					    <Route index element={<Home />} />
            </Route>

          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
