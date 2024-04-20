// App.js
import { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "../components/register/RegistrationForm";
import Login from "../components/login/Login";
import HomePage from "../components/home_page/HomePage";

class RoutingPage extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    );
  }
}

export default RoutingPage;
