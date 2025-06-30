import { Routes, Route } from 'react-router';
import Home from './Components/Home';
import Frame from './Components/Frame';
import PrintFrame from './Components/PrintFrame';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/camera" element={<Frame />} />
        <Route path="/select-print-frame" element={<PrintFrame />} />
      </Routes>
  </>
  );
}

export default App;
