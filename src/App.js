import './App.css';
import Login from './Login/Login';
import Register from './Login/Register';
import Header from './Header/Header';
import Homepage from './Homepage/Homepage';
import Detail from './Detail/Detail';
import Cart from './Cart/Cart';
import Admin from './Admin/Admin';
import Checkout from './Cart/Checkout';
import CheckOrder from './Admin/CheckOrder';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Homepage />
          </Route>
          <Route path="/home" exact>
            <Homepage />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/checkout" exact>
            <Checkout />
          </Route>
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/admin" exact>
            <Admin />
          </Route>
          <Route path="/checkorder" exact>
            <CheckOrder />
          </Route>
          {/* <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/about" >
            <About />
          </Route>
          <Route path="/blog" exact >
            <Blog />
          </Route>
          <Route path="/blog/:id" >
            <Detail />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
