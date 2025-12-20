import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onToggleCompleteTask = () => {}, onDeleteTask = () => {}}) => {
  const taskComponents = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        description={task.description}
        isComplete={task.isComplete}
        onToggleComplete={onToggleCompleteTask}
        onDelete={onDeleteTask}
      />
    );
  });
  return <ul className="tasks__list no-bullet">{taskComponents}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggleCompleteTask: PropTypes.func,
  onDeleteTask: PropTypes.func,
};

export default TaskList;
