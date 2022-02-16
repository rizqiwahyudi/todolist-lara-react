import api from '../Api';
import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ProgressBar from 'react-bootstrap/ProgressBar';

const TrashTodos = () => {
    const [todos, setTodos] = useState([]);
    const navigate          = useNavigate();

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = async () => {
        const res = await api.get('/todos/trash');
        setTodos(res.data.data);
    }

    const restoreTodo = async (id) => {
        await api.get(`/todos/restore/${id}`).then(({data}) => {
            Swal.fire({
                title: data.message,
                icon: 'success',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                navigate('/');
            })
        })
    }

    const restoreAllTodos = async () => {
        await api.get('/todos/restore').then(({data}) => {
            Swal.fire({
                title: data.message,
                icon: 'success',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                navigate('/');
            })
        })
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
                  api.delete(`/todos/delete-permanent/${id}`).then(({data}) => {
                        Swal.fire({
                            title: data.message,
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        }).then((result) => {
                            navigate('/');
                        })
                  })
              }
          })
    }

    const deleteAllTodos = async () => {
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
                api.delete('/todos/delete-permanent').then(({data}) => {
                    Swal.fire({
                        title: data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                    }).then((result) => {
                        navigate('/');
                    })
                })
              }
          })
    }

    return (
        <div>
            <button className="btn btn-outline-danger" onClick={() => deleteAllTodos()}>Delete All</button>&nbsp;
            <button className="btn btn-outline-primary" onClick={() => restoreAllTodos()}>Restore All</button>&nbsp;
            <Link to="/" className="btn btn-outline-secondary">Kembali</Link>

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
                                <button className="btn btn-outline-info" onClick={() => restoreTodo(todo.id)}>Restore</button>&nbsp;
                                <button className="btn btn-outline-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    )
}

export default TrashTodos;