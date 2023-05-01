import Home from "./views/Home/Home";
import { Routes, Route} from "react-router-dom";
import Login from "./views/Login/Login";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;
