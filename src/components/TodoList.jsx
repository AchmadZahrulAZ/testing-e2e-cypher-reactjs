import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentTodo, toggleTodo, fetchTodos, deleteTodo } from '../redux/async/todosSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error, isSuccess } = useSelector((state) => state.todos);
  const { language, translations } = useSelector((state) => state.language);

  // Fetch todos saat komponen pertama kali dirender
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  // Perbarui todos jika operasi sukses
  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchTodos()); // Update list todos jika berhasil mengubah data
    }
  }, [isSuccess, dispatch]);

  if (loading) {
    return <div className="alert alert-secondary text-center">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  if (todos.length === 0) {
    return <div className="alert alert-secondary text-center">{language === 'en' ? 'You have no todos' : 'Tidak ada tugas'}</div>;
  }

  // Handle toggle completed status
  const handleToggle = (todoId, completed) => {
    console.log('Mengubah status todo:', { id: todoId, completed: !completed }); // Debug
    dispatch(toggleTodo({ id: todoId, completed: !completed }))
      .unwrap()
      .then((updatedTodo) => {
        console.log('Todo berhasil diperbarui:', updatedTodo); // Debug
      })
      .catch((error) => {
        console.error('Gagal memperbarui todo:', error); // Debug
      });
  };
  

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-secondary' : ''}`}>
          <span
            style={{
              cursor: 'pointer',
              textDecoration: todo.completed ? 'line-through' : 'none', // Cross out if completed
            }}
            onClick={() => handleToggle(todo.id, todo.completed)} // Trigger toggle status on click
          >
            {todo.text}
          </span>
          <div>
            {/* Edit Button */}
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering todo toggle
                dispatch(currentTodo(todo)); // Set the current todo for editing
              }}
              cy-data="edit-button"
            >
              {translations[language].editButton}
            </button>

            {/* Delete Button */}
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering todo toggle
                dispatch(deleteTodo(todo.id)); // Dispatch delete action
              }}
              cy-data="delete-button"
            >
              {translations[language].deleteButton}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
