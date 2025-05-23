
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout'
import Home from './views/Home'
import { Toaster } from 'sonner'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import CollectionPage from './views/CollectionPage'
import ProductDetails from './components/Products/ProductDetails'
import Checkout from './components/Cart/CheckOut'
import OrderConfirmationPage from './views/OrderConfirmationPage'
import OrderDetailsPage from './views/OrderDetailsPage'
import MyOrdersPage from './views/MyOrdersPage'
import AdminLayout from './components/Admin/AdminLayout'
import AdminHome from './views/AdminHome'
import UserManagement from './components/Admin/UserManagement'
import ProductManagement from './components/Admin/ProductManagement'
import EditProduct from './components/Admin/EditProduct'
import OrderManagement from './components/Admin/OrderManagement'

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
              <Route path='/Checkout' element={<Checkout />} />
              <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
              <Route path='/order/:id' element={<OrderDetailsPage />} />
              <Route path='/my-orders' element={<MyOrdersPage />} />
            </Route>
            <Route path='/admin' element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path='users' element={<UserManagement />} />
              <Route path='products' element={<ProductManagement />} />
              <Route path='products/:id/edit' element={<EditProduct />} />
              <Route path='orders' element={<OrderManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
