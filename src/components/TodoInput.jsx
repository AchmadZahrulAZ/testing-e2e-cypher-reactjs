import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTodo, updateTodo } from '../redux/async/todosSlice';

const TodoInput = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const { isUpdate, todo, loading } = useSelector((state) => state.todos);
  const { language, translations } = useSelector((state) => state.language);

  // Reset Redux state untuk todo
  const resetTodo = () => {
    dispatch({
      type: 'todos/resetTodo', // Ganti dengan action yang sesuai untuk mereset todo di Redux
    });
  };

  useEffect(() => {
    if (todo?.id) {
      setText(todo.text); // Isi input dengan teks todo saat akan di-update
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== '') {
      if (isUpdate) {
        dispatch(updateTodo({ id: todo.id, text })); // Update todo
      } else {
        const newTodo = {
          id: uuidv4(),
          text,
          completed: false,
        };
        dispatch(addTodo(newTodo)); // Tambah todo baru
      }
      setText(''); // Reset input
      resetTodo(); // Reset Redux state untuk todo
    }
  };

  return (
    <div className="mb-3">
      <form className="input-group" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder={translations[language].addTaskPlaceholder}
          required
          value={text}
          cy-data="input-form"
          onChange={(e) => setText(e.target.value)}
          disabled={loading}
        />
        <button
          className={`btn ${isUpdate ? 'btn-warning' : 'btn-primary'}`}
          type="submit"
          cy-data="input-button"
          disabled={loading}
        >
          {isUpdate ? translations[language].updateButton : translations[language].addButton}
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
