// import { useState } from 'react';
// import PropTypes from 'prop-types';
// import './NewTaskForm.css';

// const NewTaskForm = (props) => {
//   const [formFields, setFormFields] = useState({
//     title: '',
//     description: '',
//   });

//   const handleTitleChange = (event) => {
//     setFormFields({
//       ...formFields,
//       title: event.target.value,
//     });
//   };
//   const handleDescriptionChange = (event) => {
//     setFormFields({
//       ...formFields,
//       description: event.target.value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     props.onTaskAdd({
//       titleData: formFields.title,
//       descriptionData: formFields.description,
//     });

//     setFormFields({
//       title: '',
//       description: '',
//     });
// };


//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input
//           id="fullTitle"
//           title="fullTitle"
//           value={formFields.title}
//           onChange={handleTitleChange} />
//       </div>
//       <div>
//         <label htmlFor="description">Description:</label>
//         <input
//           id="description"
//           name="description"
//           value={formFields.description}
//           onChange={handleDescriptionChange} />
//       </div>
//       <input
//         type="submit"
//         value="Add Task" />
//     </form>
// );
// };

// NewTaskForm.propTypes = {
//   onTaskAdd: PropTypes.func.isRequired,
// };

// export default NewTaskForm;

import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const kNewFormData = {
  title: '',
  isComplete: 'false',
};

const NewTaskForm = ({ onAddTaskCallback }) => {
  const [taskData, setTaskData] = useState(kNewFormData);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setTaskData(oldData => ({ ...oldData, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskData.title) { return; }

    setTaskData(kNewFormData);

    onAddTaskCallback({
      ...taskData,
      isComplete: taskData.isComplete === 'true'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="new-task__form">
      <section>
        <h2>Add a Task</h2>
        <div className="new-task__fields">
          <label htmlFor="new-task__title">Title</label>
          <input
            name="title"
            id="new-task__title"
            value={taskData.title}
            onChange={handleChange}
          />
          <label htmlFor="new-task__isComplete">Complete</label>
          <select
            value={taskData.isComplete}
            onChange={handleChange}
            name="isComplete"
            id="new-task__isComplete"
          >
            <option value="true">
							Yes
            </option>
            <option value="false">
							No
            </option>
          </select>
          <button className="button new-task__submit" type="submit">
						Add Task
          </button>
        </div>
      </section>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;