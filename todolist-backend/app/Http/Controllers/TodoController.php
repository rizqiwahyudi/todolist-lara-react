<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $todos = Todo::all();

        return response()->json([
            'message' => 'Get all Todos Successfully.',
            'data'    => $todos
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $todo = Todo::create($data);

        if ($todo) {
            return response()->json([
                'message' => 'Create Todo Successfully.',
                'data'    => $todo
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function show(Todo $todo)
    {
        return response()->json([
            'message' => 'Show Todo Successfully.',
            'data'    => $todo
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        $data = $request->all();
        $todoUpdate = $todo->update($data);

        if ($todoUpdate) {
            return response()->json([
                'message' => 'Updated Todo Successfully.',
                'data'    => $todo
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();

        if ($todo) {
            return response()->json([
                'message' => 'Delete Temporarily Todo Successfully.',
                'data'    => $todo
            ]);
        }
    }

    public function getDeletedTodos()
    {
        $todos = Todo::onlyTrashed()->get();

        return response()->json([
            'message' => 'Get all deleted temporarily Todos successfully.',
            'data' => $todos,
        ]);
    }

    public function restoreTodo($id)
    {
        $todo = Todo::onlyTrashed()->where('id', $id)->first();
        $todo->restore();
        
        if ($todo) {
            return response()->json([
                'message' => 'Restore Todo Successfully.',
                'data'    => $todo
            ]);
        }
    }

    public function restoreTodos()
    {
        $todos = Todo::onlyTrashed();
        $todos->restore();

        if ($todos) {
            return response()->json([
                'message' => 'Restore All Todos Successfully.'
            ]);
        }
    }

    public function deletePermanentTodo($id)
    {
        $todo = Todo::onlyTrashed()->where('id', $id)->first();
        $todo->forceDelete();

        if ($todo) {
            return response()->json([
                'message' => 'Delete Pemanently Todo Successfully.',
                'data'    => $todo
            ]);
        }
    }

    public function deletePermanentTodos()
    {
        $todos = Todo::onlyTrashed();
        $todos->forceDelete();

        if ($todos) {
            return response()->json([
                'message' => 'Delete Pemanently All Todos Successfully.',
            ]);
        }
    }
}