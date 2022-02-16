import api from '../Api';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ListTodos = () => {

    const [todos, setTodo] = useState([]);

    useEffect(() => {
        getTodos()
    },[])

    const getTodos = async () => {
        const res = await api.get('/todos');
        setTodo(res.data.data);
    }

    const deleteTodo = async (id) => {
        await Swal.fire({
             title: 'Are you sure?',
             text: "You won't be able to revert this!",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonColor: '#3085d6',
             cancelButtonColor: '#d33',
             confirmButtonText: 'Yes, delete it!'
           }).then((result) => {
             if (result.isConfirmed) {
              api.delete(`/todos/${id}`).then(({data}) => {
                Swal.fire({
                    title: data.message,
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                }).then((result) => {
                    getTodos()
                })
              })
             }
           })
     }

     const deleteTodos = async () => {
        await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                api.delete('/todos/destroy-all').then(({data}) => {
                    Swal.fire({
                        title: data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        getTodos()
                    })
                })
            }
        })
     }

    return (
        <div>
            <Link to="/addTodo" className="btn btn-outline-primary">Create Todo</Link>&nbsp;
            <button className="btn btn-outline-danger" onClick={() => deleteTodos()}>Delete All</button>&nbsp;
            <Link to="/trash" className="btn btn-outline-warning">Trash</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Progress</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { todos.map((todo,index) => (
                        <tr key={todo.id}>
                            <td>{index+1}</td>
                            <td>{todo.name}</td>
                            <td>{todo.start_date}</td>
                            <td>{todo.end_date}</td>
                            <td>
                                <ProgressBar now={todo.progress} label={`${todo.progress}%`} />
                            </td>
                            <td>
                                <Link className="btn btn-outline-info" to={`/editTodo/${todo.id}`}>Edit</Link>&nbsp;
                                <button className="btn btn-outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default ListTodos;