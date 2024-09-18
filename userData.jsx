import React from 'react';
import { useNavigate } from 'react-router-dom';

const TablePage = ({ formData, onEdit }) => {
  const navigate = useNavigate();

  const handleEdit = (index) => {
    onEdit(index);
    navigate('/');
  };

  return (
    <div>
      <h2>User Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>File Name</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {formData.map((data, index) => (
            <tr key={index}>
              <td>{data.userName}</td>
              <td>{data.email}</td>
              <td>{data.file ? data.file.name : 'No File'}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
