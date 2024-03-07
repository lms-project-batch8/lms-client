import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="main  bg-dark-purple">
          <Navbar />
        </div>
        <div className="flex">
          <div className={`w-[170px] h-screen bg-dark-purple`}>
            <Menu/>
          </div>  
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
