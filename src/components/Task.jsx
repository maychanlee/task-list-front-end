import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, description,isComplete, onToggleComplete = () => {},
  onDelete = () => {} }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <div className="tasks__item__content">
        <button
          className={`tasks__item__toggle ${buttonClass}`}
          onClick={() => onToggleComplete(id)}
        >
          {title}
        </button>

        {description && (
          <div className="tasks__item__description">{description}</div>
        )}
      </div>

      <button className="tasks__item__remove button" onClick={() => onDelete(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Task;
