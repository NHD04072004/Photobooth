import { Routes, Route } from 'react-router';
import Home from './Components/pages/Home';
import Frame from './Components/pages/Frame';
import "./App.css";
import Capture from './Components/pages/Capture';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/frame" element={<Frame />} />
      <Route path="/capture/:id" element={<Capture />} />
      <Route path="" element />
    </Routes>
  );
}

export default App;
