import React from 'react';
import { TextField, FlatButton } from 'material-ui';

const AddBooks = () => {
  return (
    <div id="add-books-container">
      <h1>Add Your Books</h1> 
      <div>
        <TextField />
        <FlatButton label="Search"/>
      </div> 
    </div>
  );
};

export default AddBooks;