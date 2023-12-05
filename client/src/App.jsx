import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Reports from "./Pages/Coupon";
import { setProducts, setUsers } from "./state/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Coupon from "./Pages/Coupon";
function App() {
  const isAuth = Boolean(useSelector((state) => state.token));
  console.log({ isAuth });
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/all")
      .then((res) => {
        const users = res.data;
        // console.log(users);

        dispatch(setUsers({ users }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/" />}
          >
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="reports" element={<Coupon />} />
          </Route>
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
