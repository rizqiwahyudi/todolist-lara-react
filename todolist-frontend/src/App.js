import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import EditTodo from './components/EditTodo';
import TrashTodos from './components/TrashTodos';


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="addTodo" element={<AddTodo />} />
          <Route path="editTodo/:id" element={<EditTodo />} />
          <Route path="trash" element={<TrashTodos />} />
          <Route path="*" element={
            <h3>There's nothing here!</h3>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
