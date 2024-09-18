import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormPage = ({ onSave, editableData }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [isFileReplaced, setIsFileReplaced] = useState(false);
  const navigate = useNavigate();

  // If we're editing, populate the form with the current values
  useEffect(() => {
    if (editableData) {
      setUserName(editableData.userName);
      setEmail(editableData.email);
      setFile(editableData.file); // Keep the existing file in memory
    }
  }, [editableData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userName,
      email,
      file: isFileReplaced ? file : editableData.file, // Use the new file if replaced, otherwise keep the old one
    };
    onSave(formData);
    setUserName('');
    setEmail('');
    setFile(null);
    setIsFileReplaced(false);
    navigate('/table');
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setIsFileReplaced(true); // Mark that the file has been replaced
  };

  return (
    <div>
      <h2>{editableData ? 'Edit User' : 'Create User'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload File:</label>
          <input type="file" onChange={handleFileChange} required={!file}/>
          {editableData && !isFileReplaced && editableData.file && (
            <p>Current File: {editableData.file.name}</p> // Show existing file name if editing
          )}
        </div>
        <button type="submit">{editableData ? 'Update' : 'Save'}</button>
      </form>
    </div>
  );
};

export default FormPage;
