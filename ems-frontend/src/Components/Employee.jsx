import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../Services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { listDepartments } from "../Services/DepartmentService";

const Employee = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const navigate = useNavigate();

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const employee = { firstName, lastName, email, departmentId };
    //console.log(employee);

    if (validateForm()) {
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      navigate("/employees");
    } else {
      console.log("validate false");
    }
  };

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName == "") {
      errorsCopy.firstName = "First Name is Required..!";
      valid = false;
    } else {
      errorsCopy.firstName = "";
    }
    if (lastName == "") {
      errorsCopy.lastName = "Last Name is Required..!";
      valid = false;
    } else {
      errorsCopy.lastName = "";
    }
    if (email == "") {
      errorsCopy.email = "Email is Required..!";
      valid = false;
    } else {
      errorsCopy.email = "";
    }

    if (departmentId) {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Select department";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentId(response.data.departmentId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const pageTitle = () => {
    if (id) {
      return (
        <h2 className="text-center" style={{ marginTop: "20px" }}>
          Update Employee
        </h2>
      );
    } else {
      return (
        <h2 className="text-center" style={{ marginTop: "20px" }}>
          Add Employee
        </h2>
      );
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ marginTop: "50px" }}>
        <div className="card col-md-6 offset-md-3 ">
          {pageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee's First Name"
                  name="firstName"
                  value={firstName}
                  onChange={handleFirstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                />

                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter Employee's Last Name"
                  name="lastName"
                  value={lastName}
                  onChange={handleLastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Email:</label>
                <input
                  type="text"
                  placeholder="Enter Employee's Email"
                  name="email"
                  value={email}
                  onChange={handleEmail}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Select Department:</label>
                <select
                  className={`form-control ${
                    errors.department ? "is-invalid" : ""
                  }`}
                  value={departmentId}
                  onChange={(e) => setDepartmentId(e.target.value)}
                >
                  <option value="Select Department">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {" "}
                      {department.departmentName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback"> {errors.department} </div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
