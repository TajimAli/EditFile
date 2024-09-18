import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormPage from './userForm';
import TablePage from './userData';

function Mainn() {
  const [formData, setFormData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  // Save the form data (either as a new entry or update an existing one)
  const handleSave = (data) => {
    if (editingIndex !== null) {
      const updatedData = formData.map((item, index) =>
        index === editingIndex ? data : item
      );
      setFormData(updatedData);
      setEditingIndex(null);
    } else {
      setFormData([...formData, data]);
    }
  };

  // Set the index of the item to be edited
  const handleEdit = (index) => {
    setEditingIndex(index);
  };

  return (
    <Router>
      <Routes>
        {/* Form Page Route */}
        <Route
          path="/"
          element={
            <FormPage
              onSave={handleSave}
              editableData={editingIndex !== null ? formData[editingIndex] : null}
            />
          }
        />
        {/* Table Page Route */}
        <Route
          path="/table"
          element={<TablePage formData={formData} onEdit={handleEdit} />}
        />
      </Routes>
    </Router>
  );
}

export default Mainn;
