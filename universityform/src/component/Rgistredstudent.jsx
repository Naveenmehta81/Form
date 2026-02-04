import React from "react";

const Rgistredstudent = ({ resgisteredData, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <h1 className="table-title">Registered Students Database</h1>

      {resgisteredData && resgisteredData.length > 0 ? (
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resgisteredData.map((student, index) => (
              <tr key={student.id || index}>
                <td>{index + 1}</td>
                <td>
                  {student.firstname} {student.lastname}
                </td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.address}</td>
                <td className="action-buttons">
                  <button
                    className="btn edit-btn"
                    onClick={() => onEdit && onEdit(student)} // Call parent edit function
                  >
                     Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => onDelete && onDelete(student.id)} // Call parent delete function
                  >
                     Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No students registered yet.</p>
      )}
    </div>
  );
};

export default Rgistredstudent;
