import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizPage from "./pages/QuizPage/QuizPage"
import QuizLanding from "./components/QuizLanding";

const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path="/"/>
        <Route element={<QuizLanding />} path="/quiz/:id" />
        <Route element={<QuizPage />} path="/quiz/:id/start" />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
