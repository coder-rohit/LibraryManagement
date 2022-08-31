import './App.css';
import Login from './components/Pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Admin from './components/Dashboard/DashboardHome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//student components
import Students from './components/Dashboard/Submenu/Students/StudentsHome';
import AddStudent from './components/Dashboard/Submenu/Students/AddStudent';
import EditStudent from './components/Dashboard/Submenu/Students/EditStudent';
//book components
import AddBook from './components/Dashboard/Submenu/Books/AddBook';
import EditBook from './components/Dashboard/Submenu/Books/EditBook';
import BookHome from './components/Dashboard/Submenu/Books/BookHome';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        {/* students */}
        <Route path='/studentHome' element={<Students />} />
        <Route path='/editStudent' element={<EditStudent />} />
        <Route path='/addStudent' element={<AddStudent />} />
        {/* book */}
        <Route path='/bookHome' element={<BookHome />} />
        <Route path='/editBook' element={<EditBook />} />
        <Route path='/addBook' element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;