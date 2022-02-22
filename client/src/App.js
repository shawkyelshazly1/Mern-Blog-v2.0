import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import { loadUser } from "./redux/auth/auth-actions";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import ErrorNotification from "./components/ErrorNotification";
import AddPost from "./components/AddPost";
import BlogPost from "./components/BlogPost";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
          <ErrorNotification />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/posts/create" element={<AddPost />} />
            <Route path="/posts/:post_id" element={<BlogPost />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
