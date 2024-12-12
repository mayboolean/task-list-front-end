import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onTaskToggleCompletion, onTaskDelete }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const taskClicked = () => {
    onTaskToggleCompletion(id);
  };

  const deleteClicked = () => {
    onTaskDelete(id);
  };
  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => taskClicked()}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={()=> deleteClicked()}
      >x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskToggleCompletion: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
};

export default Task;
