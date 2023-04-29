import Home from "./views/Home/Home";
import { Routes, Route} from "react-router-dom";
import Login from "./views/Login/Login";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
}

export default App;
