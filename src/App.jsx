import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kBaseUrl = 'http://localhost:5000';

const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then( response => {
      const newTasks = response.data;
      console.log(newTasks);
      return newTasks;
    });
};

const App = () => {
  // state
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    // invoke API function
    getAllTasksApi()
      .then(tasks => { // chain a then, where a tasks is passed in
        setTaskData(tasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);
  // to update the TASKS data state to change isComplete when button is clicked
  const toggleComplete = (taskId) => {
    setTaskData(tasks => {
      return tasks.map(task => {
        if (task.id === taskId) {
          return {...task, isComplete: !task.isComplete};
        } else {
          return task;
        }
      });
    });
  };

  const deleteTask = (taskId) => {
    setTaskData(taskData => taskData.filter(task => {
      return task.id != taskId;
    }));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList
          tasks={taskData}
          onTaskToggleCompletion={toggleComplete}
          onTaskDelete={deleteTask}
        />}</div>
      </main>
    </div>
  );
};

export default App;
