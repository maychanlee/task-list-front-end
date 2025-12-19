import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const newForm = {
  title: '',
  isComplete: false,
};

const NewTaskForm = ({onHandleSubmit}) => {
  const [taskData, setTaskData] = useState(newForm);

  const handleTaskChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setTaskData(beforeData => ({
      ...beforeData,
      [fieldName]: fieldValue
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!taskData.title) {return;}
    setTaskData(newForm);

    const newTask = {
      ...taskData,
      isComplete: taskData.isComplete === 'true'
    };

    onHandleSubmit(newTask);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section>
        <h2>Add a Task</h2>
        <label htmlFor='title'>Task Title:</label>
        <input
          name='title'
          value={taskData.title}
          onChange={handleTaskChange}
        />
      </section>
    </form>
  );
};

NewTaskForm.propTypes = {
  onHandleSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;