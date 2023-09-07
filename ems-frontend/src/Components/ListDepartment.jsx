import React, { useEffect, useState } from "react";
import {
  deleteDepartment,
  listDepartments,
} from "../Services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartment = () => {
  const navigate = useNavigate();
  const getAllDepartments = () => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllDepartments();
  }, []);

  const updateDepartment = (id) => {
    navigate(`/editDepartment/${id}`);
  };

  const removeDepartment = (id) => {
    deleteDepartment(id)
      .then((response) => {
        getAllDepartments();
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [departments, setDepartments] = useState([]);
  return (
    <div className="container">
      <h2 className="text-center">List Of Departments</h2>
      <Link to="/addDepartment" className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateDepartment(department.id)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => removeDepartment(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDepartment;
