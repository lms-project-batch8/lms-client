import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import QuizPage from "./pages/QuizPage/QuizPage";
import QuizLanding from "./components/QuizLanding";
import CourseLanding from "./components/CourseLanding";
import LoginPage from "./pages/Login/LoginPage";
import RequireAuth from "./pages/Login/RequireAuth";
import EditUser from "./components/Forms/EditUser";
import QuizCreationPage from "./pages/QuizCreationPage";
import CourseDashBoard from "./components/Course/CourseDashBoard";
import CourseCreationPage from "./components/Course/CourseCreationPage";
import QuizEditPage from "./pages/QuizEditPage";
import Error from "./components/Error";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth><Dashboard /></RequireAuth>} path="/" />
          <Route element={<RequireAuth><QuizLanding /></RequireAuth>} path="/quiz/:id" />
          <Route element={<RequireAuth><QuizPage /></RequireAuth>} path="/quiz/:id/start" />
          <Route element={<RequireAuth><EditUser /></RequireAuth>} path="/users/edit/:id"/>
          <Route element={<RequireAuth><QuizCreationPage/></RequireAuth>} path="/quiz/new"/>
          <Route element={<RequireAuth><QuizEditPage /></RequireAuth>} path="/quiz/:id/edit"/>
          <Route element={<RequireAuth><CourseCreationPage /></RequireAuth>} path="/course/new"/>
          <Route element={<RequireAuth><CourseDashBoard /></RequireAuth>} path="/courses/:id"/>
          <Route element={<Error />} path="/error" />
          <Route element={<LoginPage />} path="/login" />
        </Routes>
      </BrowserRouter>
  );
};

export default App;