import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizPage from "./pages/QuizPage/QuizPage"
import QuizLanding from "./components/QuizLanding";
import CourseLanding from "./components/CourseLanding"
import LoginPage from "./pages/Login/LoginPage";
import RequireAuth from "./pages/Login/RequireAuth";
import EditUser from "./components/Forms/EditUser";
import QuizCreationPage from "./pages/QuizCreationPage";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth><Dashboard /></RequireAuth>} path="/" />
          <Route element={<RequireAuth><QuizLanding /></RequireAuth>} path="/quiz/:id" />
          <Route element={<RequireAuth><CourseLanding/></RequireAuth>} path="/course/:id"/>
          <Route element={<RequireAuth><QuizPage /></RequireAuth>} path="/quiz/:id/start" />
          <Route element={<RequireAuth><EditUser/></RequireAuth>} path="/users/edit/:id"/>
          <Route element={<RequireAuth><QuizCreationPage /></RequireAuth>} path="/quiz/new"/>
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
