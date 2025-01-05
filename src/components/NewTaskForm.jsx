import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTaskCallback }) => {
  const kDefaultState = {
    title:'',
    description: '',
    isComplete: false,
  };

  const [formData, setFormData] = useState(kDefaultState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = {...formData, [fieldName]: fieldValue};
    setFormData(newFormData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title) { return; }
    console.log(typeof(onAddTaskCallback));
    onAddTaskCallback({...formData,
      isComplete: formData.isComplete === 'true'
    });
    setFormData(kDefaultState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}></input>
      </div>
      <div>
        <label htmlFor='description'>Description:</label>
        <input
          type='text'
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}></input>
      </div>
      <div>
        Completed?
        <input type='radio'
          id='yes'
          name='isComplete'
          value={formData.isComplete}
          onChange={handleChange}/>
        <label htmlFor='yes'>Yes</label>
        <input
          type='radio'
          id='no'
          name='isComplete'
          value='false'
          onChange={handleChange}/>
        <label htmlFor='no'>No</label>
      </div>
      <button type='submit'>Add task</button>
    </form>
  );
};
NewTaskForm.propTypes = {
  onAddTaskCallback: PropTypes.func.isRequired,
};
export default NewTaskForm;