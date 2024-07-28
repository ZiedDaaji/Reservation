import './App.css';
import {Route, Routes} from 'react-router-dom';
import Test from './component/Test';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/test" element={<Test/>} />
      </Routes>
    </div>
  );
}

export default App;
