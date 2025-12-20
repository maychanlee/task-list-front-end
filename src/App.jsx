import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const toggleTask = (task) => {
  return { ...task, isComplete: !task.isComplete };
};

const kbaseURL = 'http://localhost:5000';

const getAllTasksAPI = () => {
  return axios.get(`${kbaseURL}/tasks`)
    .then(response => response.data)
    .catch(error => console.log(error));
};

const markCompleteAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_complete`)
    .catch(error => console.log(error));
};

const markIncompleteAPI = id => {
  return axios.patch(`${kbaseURL}/tasks/${id}/mark_incomplete`)
    .catch(error => console.log(error));
};

const toggleCompleteAPI = task => {
  return task.isComplete
    ? markIncompleteAPI(task.id)
    : markCompleteAPI(task.id);
};

const deleteTaskAPI = id => {
  return axios.delete(`${kbaseURL}/tasks/${id}`)
    .catch(error => console.log(error));
};

const addTaskAPI = (newTask) => {
  return axios.post(`${kbaseURL}/tasks`, newTask)
    .then(response => response.data)   // вернёт созданный task
    .catch(error => console.log(error));
};

const convertFromAPI = (apiTask) => {
  const newTask = {
    ...apiTask,
    isComplete: apiTask.is_complete,
  };
  delete newTask.is_complete;
  return newTask;
};

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

  const onAddTaskCallback = (formData) => {
    return addTaskAPI(formData).then((createdTask) => {
      return setTaskData((prev) => [convertFromAPI(createdTask), ...prev]);
    });
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div className="page">
          <NewTaskForm onAddTaskCallback={onAddTaskCallback} />
          <div className="task-list-wrapper">
            <TaskList
              tasks={taskData}
              onToggleCompleteTask={handleToggleCompleteTask}
              onDeleteTask={handleDeleteTask}/>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
