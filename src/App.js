import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizPage from "./pages/QuizPage/QuizPage"
import QuizLanding from "./components/QuizLanding";
import CourseLanding from "./components/CourseLanding"
import AddTrainer from "./components/Forms/AddTrainer";
import AddTrainee from "./components/Forms/AddTrainee";
import LoginPage from "./pages/Login/LoginPage";
import RequireAuth from "./pages/Login/RequireAuth";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth><Dashboard /></RequireAuth>} path="/" />
          <Route element={<RequireAuth><QuizLanding /></RequireAuth>} path="/quiz/:id" />
          <Route element={<RequireAuth><CourseLanding/></RequireAuth>} path="/course/:id"/>
          <Route element={<RequireAuth><AddTrainer/></RequireAuth>} path="/addtrainer"/>
          <Route element={<RequireAuth><AddTrainee/></RequireAuth>} path="/addtrainee"/>
          <Route element={<RequireAuth><QuizPage /></RequireAuth>} path="/quiz/:id/start" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
