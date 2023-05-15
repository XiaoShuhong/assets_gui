import React from 'react';
import addIcon from '../assets/image/addicon.png';

const AddImageButton = ({ onClick }) => {
  return (
      <img src={addIcon} alt="Add Icon" className="add-button-icon" onClick={onClick}/>
  );
};
export default AddImageButton;