import { Routes, Route } from 'react-router';
import HomePage from './Components/pages/Home';
import "./App.css";
import CapturePage from './Components/pages/Capture';
import FrameChildrenPage from './Components/pages/FrameChildren';
import FramePage from './Components/pages/Frame';
import SelectImagePage from './Components/pages/SelectImage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/frame" element={<FramePage />} />
      <Route path="/frame/:id" element={<FrameChildrenPage />} />
      <Route path="/capture/:id" element={<CapturePage />} />
      <Route path="/select-image" element={<SelectImagePage />} />
      <Route path="" element />
    </Routes>
  );
}

export default App;
