import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Course from './component/Course';
import AddCourse from './component/AddCourse';
import UpdateCourse from './component/EditCourse';
import ViewCourse from './component/ViewCourse';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Course/>}/>
        <Route path="/add" element={<AddCourse/>}/>
        <Route path="/update/:id" element={<UpdateCourse />} />
        <Route path="/course/:id" element={<ViewCourse />} />
        <Route path="/courses" element={<Course/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
