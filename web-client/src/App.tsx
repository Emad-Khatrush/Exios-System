import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LandingPage from "./containers/LandingPage/LandingPage";
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';

type Props = {}

const App = (props: Props) => {
  
  return (
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path='/home' element={<Home />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App;
