
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './views/Home'
import { Toaster } from 'sonner'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import CollectionPage from './views/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'

function App() {

  return (
    <div>
        <BrowserRouter>
          <Toaster position='top-right' />
          <Routes>
            <Route path='/' element={<UserLayout />}>
					    <Route index element={<Home />} />
					    <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/collections/:collection' element={<CollectionPage />} />
              <Route path='/product/:id' element={<ProductDetails />} />
            </Route>

          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
