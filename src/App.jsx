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

const toggleTask = (task) => {
  return { ...task, isComplete: !task.isComplete };
};

const App = () => {
  const [taskData, setTaskData] = useState(TASKS);

  const handleToggleCompleteTask = (id) => {
    setTaskData((taskData) => {
      return taskData.map((task) => {
        if (task.id === id) {
          return toggleTask(task);
        } else {
          return task;
        }
      });
    });
  };

  const handleDeleteTask = (id) => {
    setTaskData((taskData) => {
      return taskData.filter((task) => task.id !== id);
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
      </main>
    </div>
  );
};

export default App;
