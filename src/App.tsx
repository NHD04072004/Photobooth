import { Routes, Route } from 'react-router';
import Home from './Components/pages/Home';
import Frame from './Components/pages/Frame';
import "./App.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/frame" element={<Frame />} />
    </Routes>
  );
}

export default App;
