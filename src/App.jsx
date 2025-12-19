import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const toggleTask = (task) => {
  return { ...task, isComplete: !task.isComplete };
};

const kBaseUrl = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const markCompleteAPI = id => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
    .catch(error => console.log(error));
};

const markIncompleteAPI = id => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
    .catch(error => console.log(error));
};

const toggleCompleteAPI = task => {
  return task.isComplete
    ? markIncompleteAPI(task.id)
    : markCompleteAPI(task.id);
};

const deleteTaskAPI = id => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
    .catch(error => console.log(error));
};

const addTaskAPI = taskData => {
  const {
    title,
    isComplete
  } = taskData;

  const description = 'use HTTP Patch to modify -- added with Vite + React';
  const completedAt = isComplete ? new Date() : null;

  const body = {
    title,
    description,
    'completed_at': completedAt
  };

  return axios.post(`${kBaseUrl}/tasks`, body)
    .then(response => {
      return convertFromAPI(response.data.task);
    })
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete,
  };
  return newTask;
};

// const createTaskAPI = (titleText) => {
//   return axios
//     .post(`${kBaseUrl}/tasks`, { title: titleText, description: '' })
//     .then(response => response.data)
//     .catch(error => console.log(error));
// };

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    return getAllTasksAPI()
      .then(tasks => {
        const newTasks = tasks.map(convertFromAPI);
        setTaskData(newTasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleToggleCompleteTask = (id) => {
    const task = taskData.find(t => t.id === id);
    if (!task) return;

    return toggleCompleteAPI(task)
      .then(() => {
        return setTaskData((taskData) => {
          return taskData.map((task) => {
            if (task.id === id) {
              return toggleTask(task);
            } else {
              return task;
            }
          });
        });
      });
  };

  const handleDeleteTask = (id) => {
    return deleteTaskAPI(id)
      .then(() => {
        return setTaskData((taskData) => {
          return taskData.filter((task) => task.id !== id);
        });
      });
  };

  const handleAddTask = (taskData) => {
    return addTaskAPI(taskData)
      .then(task => {
        setTaskData(beforeTask => [...beforeTask,task]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList
          tasks={taskData}
          onToggleCompleteTask={handleToggleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
        <NewTaskForm onHandleSubmit={handleAddTask}/>
      </main>
    </div>
  );
};

export default App;
