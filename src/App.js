
import './App.css';
import Portfolio from './components/Route/Portfolio';
import Topbar from './components/Navbar';
import Home from './components/Route/Home';
import Model from './components/Model/Model';
import CheckFace from './components/Route/CheckFace';
import PrivateRoute from './components/Route/PrivateRoute';
import Coco from './components/Model/CoCo';
import FaceMesh from './components/Model/FaceMesh';
import PredictAge from './components/Model/PredictAge';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const authed = useSelector(state => state.checkLogged);
  const key =  authed.isAuthed || sessionStorage.getItem('key');
  console.log(key);
  return (
    <Router>
      <div className="App">
        <Topbar />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <PrivateRoute exact path="/model">
              <Model />
          </PrivateRoute>
          <PrivateRoute exact path="/model/cocossd">
              <Coco />
          </PrivateRoute>
          <PrivateRoute exact path="/model/facemesh">
              <FaceMesh />
          </PrivateRoute>
          <PrivateRoute exact path="/model/predictAge">
              <PredictAge />
          </PrivateRoute>
          <PrivateRoute path="/creator">
            <Portfolio />
          </PrivateRoute>
          <Route path="/">
            {key ?
            <Home />
            :<CheckFace />
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
