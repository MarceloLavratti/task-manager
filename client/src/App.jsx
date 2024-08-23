import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from './services/appRoutes'
import Header from './components/header/header';
import './App.css'

const App = () => {

  return (
    <>
      <Router>       
        <Header />
        <AppRoutes />
      </Router>
    </>
  )
}

export default App
