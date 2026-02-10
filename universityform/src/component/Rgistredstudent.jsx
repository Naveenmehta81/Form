import React, { useEffect, useState } from "react";
import "./Table.css";

const Rgistredstudent = ({ resgisteredData, onEdit, deletestudentdata }) => {
  // const [currentpage, setCurrentpage] = useState(1);
  // const [totapage, setTotalpage] = useState(0);

  // const limit = 2;
  // const total = 5 ;

  // useEffect(() => {
  //   const skip = (currentpage - 1) * limit;
  //   fetch(`http://localhost:8000/collegestudent/?limit=${limit}&skip=${skip}`)
  //     .then((res) => res.json())
  //      .catch((err) => console.log("error call for api ", err));
  // }, [currentpage]);

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
                    onClick={() =>
                      deletestudentdata && deletestudentdata(student.id)
                    } // Call parent delete function
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
      {/* <div>
        <button
          onClick={() => setCurrentpage((prev) => prev - 1)}
          disabled={currentpage === 1}
        >
          Back
        </button>
        {[...Array(totapage)].map((_, i) => (
          <button key={i} onClick={() => setCurrentpage(i + 1)}>
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentpage((prev) => prev + 1)}
          disabled={currentpage === totapage}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Rgistredstudent;
