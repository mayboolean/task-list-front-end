import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const kBaseUrl = 'http://localhost:5000';

// convert API response into JS case is_complete -> isComplete
// make a new object that copies response with the correct keys
const reformatAPI = (apiTasks) => {
  const newTask = {
    ...apiTasks,
    isComplete: apiTasks.is_complete // makes new JS case key
  };
  delete newTask.is_complete;
  return newTask;
};


const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then( response => {
      const apiTasks = response.data;
      // convert api response
      const newTasks = apiTasks.map(reformatAPI);
      return newTasks;
    });
};

const deleteTaskAPI = (taskId) => {
  return axios.delete(`${kBaseUrl}/tasks/${taskId}`)
    .catch(error => {
      console.log(error);
    });
};

const addTaskAsync = (taskData) => {
  // extract values from taskData
  const { title, isComplete } = taskData;

  // compute additional values
  const description = 'created in Task List Front End';
  const completedAt = isComplete ? new Date() : null;

  // build a request body using a string key to avoid having the linter
  // yell at us
  const body = { title, description, 'completed_at': completedAt };

  // return the end of the promise chain to allow further then/catch calls
  return axios.post(`${kBaseUrl}/tasks`, body)
    .then(response => {
    // convert the received task from having python-like keys to JS-like keys
    // using a helper function (taskApiToJson)

      // the value we return from a then will become the input to the next then
      return reformatAPI(response.data.task);
    })
    .catch(err => {
      console.log(err);

      // anything we throw will skip over any intervening then clauses to become
      // the input to the next catch clause
      throw new Error('error creating task');
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
    deleteTaskAPI(taskId)
      .then(() => {
        setTaskData(taskData => taskData.filter(task => {
          return task.id != taskId;
        }));
      });
  };

  const addTask = taskData => {
    console.log(taskData);
    return addTaskAsync(taskData)
      .then(task => {
      // use the callback style of updating the tasks list
      // oldTasks will receive the current contents of the tasks state
      // this is very short, so we can use the implied return arrow function
        setTaskData(oldTasks => [...oldTasks, task]);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList
            tasks={taskData}
            onTaskToggleCompletion={toggleComplete}
            onTaskDelete={deleteTask}
          />}
        </div>
        <NewTaskForm
          onAddTaskCallback={addTask}></NewTaskForm>
      </main>
    </div>
  );
};

export default App;
