import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Navbar from "./components/Navbar"; // Import navbar

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-body">
                <TodoInput />
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
