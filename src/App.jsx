import { useState } from 'react'
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';

function App() {
  // login
  const [isAuth, setIsAuth] = useState(false) //已登入未登入模板切換 (尚未教到路由、登出尚未串)
  
  return (
    <>
      { isAuth? <ProductPage />  : <LoginPage setIsAuth={setIsAuth} /> }
    </>
  )
}

export default App
