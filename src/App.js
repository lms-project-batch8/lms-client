import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizPage from "./pages/QuizPage/QuizPage"
import QuizLanding from "./components/QuizLanding";
import CourseLanding from "./components/CourseLanding"
import AddTrainer from "./components/Forms/AddTrainer";
import AddTrainee from "./components/Forms/AddTrainee";
import LoginPage from "./pages/Login/LoginPage";
const App = () => {
  return (
      <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />} path="/"/>
        <Route element={<QuizLanding />} path="/quiz/:id" />
        <Route element={<CourseLanding/>} path="/course/:id"/>
        <Route element={<AddTrainer/>} path="/addtrainer"/>
        <Route element={<AddTrainee/>} path="/addtrainee"/>
        <Route element={<QuizPage />} path="/quiz/:id/start" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
      </BrowserRouter>
  );
}

export default App;
