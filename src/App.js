import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Home } from "./Home";
import { AskQuestions } from "./AskQuestions";
import { LoadingDocument } from "./LoadingDocument";
import { ASMELSessionProvider } from "./ASMELContext";
import {ViewDocument} from "./ViewDocument";
import {ViewSubmissions} from "./ViewSubmissions";

function Footer() {
  return (
    <footer>
      <p>
        This system is intended solely for individuals possessing a CDC number
        or prison security personnel authorized by the institution. Unauthorized
        access or use of this system is strictly prohibited and may result in
        disciplinary action, legal consequences, or both. All activities within
        this system are monitored and recorded. If you are not an authorized
        user, please exit immediately. By continuing to access this system, you
        acknowledge and consent to these terms.
      </p>
    </footer>
  );
}

function App() {
  return (
    <ASMELSessionProvider>
      <Router>
        <flex className="App">
          <Routes>
            <Route path="*" exact element={<Login />} />
            <Route path={"/home"} element={<Home />} />
            <Route path={"/questions"} element={<AskQuestions />} />
            <Route path={"/loading"} element={<LoadingDocument />} />
            <Route path={"/viewQuestions"} element={<ViewDocument/>}/>\
            <Route path={"/viewSubmissions"} element={<ViewSubmissions/>}/>
          </Routes>
          <Footer />
        </flex>
      </Router>
    </ASMELSessionProvider>
  );
}

export default App;
