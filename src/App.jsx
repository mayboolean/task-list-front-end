import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];



const App = () => {
  // state
  const [taskData, setTaskData] = useState(TASKS);

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
