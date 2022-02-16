import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../Api';
import Swal from 'sweetalert2';

const AddTodo = () => {
    const navigate                          = useNavigate();
    const [todoName, setTodoName]           = useState('');
    const [todoStartDate, setTodoStartDate] = useState('');
    const [todoEndDate, setTodoEndDate]     = useState('');
    const [todoProgress, setTodoProgress]   = useState('');

    const saveTodo = async (e) => {
        e.preventDefault();

        await api.post('/todos', {
            name: todoName,
            start_date: todoStartDate,
            end_date: todoEndDate,
            progress: todoProgress
        });
        Swal.fire({
            title: 'Data created successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/");
            }
        })
    }

    return (
        <div>
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <p>Create Todo</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveTodo}>
                            <div className="form-group">
                                <label htmlFor="name">Name :</label>
                                <input type="text" id="name" value={todoName} onChange={(e) => setTodoName(e.target.value)} className="form-control" placeholder="Enter Your Todo's Name.." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="start_date">Start Date :</label>
                                <input type="date" id="start_date" value={todoStartDate} onChange={(e) => setTodoStartDate(e.target.value)} className="form-control" placeholder="Enter Your Todo's Start Date.." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="end_date">End Date :</label>
                                <input type="date" id="end_date" value={todoEndDate} onChange={(e) => setTodoEndDate(e.target.value)} className="form-control" placeholder="Enter Your Todo's End Date.." />
                            </div>
                            <div className="form-group">
                                <label htmlFor="progress">Progress :</label>
                                <input type="number" id="progress" value={todoProgress} onChange={(e) => setTodoProgress(e.target.value)} className="form-control" max={100} placeholder="Enter Your Todo's Progress.." />
                            </div>
                            <div className="row pt-3">
                                <div className="form-group">
                                    <button className="btn btn-primary">Submit</button>&nbsp;
                                    <Link to="/" className="btn btn-secondary">Kembali</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodo;