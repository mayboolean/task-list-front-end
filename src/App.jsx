import { useState, useEffect } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm';

const kBaseUrl = 'http://localhost:5000';

const taskApiToJson = task => {
  // unpack the fields of a task, renaming is_complete to isComplete in the
  // process.
  const { description, id, is_complete: isComplete, title } = task;

  // reassemble the fields into an object, now with JS-style fields
  return { description, id, isComplete, title };
};

// // helper function to get all tasks. this function makes the axios call, and
// // unpacks the response data (returning a list of task objects), or throwing
// // a simple error. in order for this to be used from the component, we need to
// // be sure to return the final promise, so that the component can add additional
// // then/catch clauses to update its state or do any additional error handling

const getTasksAsync = async () => {
  try {
    const response = await axios.get(`${kBaseUrl}/tasks`);

    return response.data.map(taskApiToJson);
  } catch (err) {
    console.log(err);

    throw new Error('error fetching tasks');
  }
};

// // helper function to mark a task complete or incomplete. To do so, we need
// // to know the id of the task being modified, as well as whether we are
// // marking it complete or incomplete. Using that information, we can pick which
// // endpoint to use (since marking complete and incomplete are two different
// // endpoints in task-list).

const updateTaskAsync = async (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';

  try {
    const response = await axios.patch(`${kBaseUrl}/tasks/${id}/${endpoint}`);
    return taskApiToJson(response.data.task);
  } catch (err) {
    console.log(err);

    throw new Error(`error updating task ${id}`);
  }
};

const deleteTaskAsync = async id => {
  try {
    await axios.delete(`${kBaseUrl}/tasks/${id}`);
  } catch (err) {
    console.log(err);

    throw new Error(`error deleting task ${id}`);
  }
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    refreshTasks();
  }, []);

//       // anything we throw will skip over any intervening then clauses to become
//       // the input to the next catch clause
//       throw new Error(`error deleting task ${id}`);
//     });
// };

  const refreshTasks = async () => {
    try {
      const tasks = await getTasksAsync();
      setTasks(tasks);
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateTask = async id => {
    const task = tasks.find(task => task.id === id);

    if (!task) { return; }

    try {
      const newTask = await updateTaskAsync(id, !task.isComplete);

      setTasks(oldTasks => {
        return oldTasks.map(task => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task;
          }
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };


  const deleteTaskAsync = async id => {
    try {
      await axios.delete(`${kBaseUrl}/tasks/${id}`);
    } catch (err) {
      console.log(err);
      throw new Error(`error deleting task ${id}`);
    }
  };

  // const addTaskData = (newTask) => {
  //   const nextId = Math.max(0, ...taskData.map((task) => task.id)) + 1;

  //   // Duplicate the student list
  //   const newTasktList = [...taskData];

  //   newTaskList.push({
  //     id: nextId,
  //     titleData: newTask.titleData,
  //     descriptionData: newdescription.descriptionData,
  //     isComplete: false
  //   });

  //   setTaskData(newTaskList);

  const addTaskAsync = async taskData => {
    const { title, isComplete } = taskData;

    const description = 'created in Task List Front End';
    const completedAt = isComplete ? new Date() : null;

    const body = { title, description, 'completed_at': completedAt };
    try {
      const response = await axios.post(`${kBaseUrl}/tasks`, body);
      return taskApiToJson(response.data.task);
    } catch (err) {
      console.log(err);
      throw new Error('error creating task');
    }
  };

  const deleteTask = async id => {
    try {
      await deleteTaskAsync(id);
      setTasks(oldTasks => {
        return oldTasks.filter(task => task.id !== id);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const addTask = async taskData => {
    try {
      const task = await addTaskAsync(taskData);
      setTasks(oldTasks => [...oldTasks, task]);
    } catch (err) {
      console.log(err.message);
    }
  };
  // // OLD DELETE TASK
  // const deleteTask = (taskId) => {
  //   setTask(task => task.filter(task => {
  //     return task.id != taskId;
  //   }));
  // };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onToggleCompleteCallback={updateTask}
            onDeleteCallback={deleteTask}
          />
          <NewTaskForm 
            onAddTaskCallback={addTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
