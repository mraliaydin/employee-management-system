import React, { useEffect, useState } from "react";
import {
  createDepartment,
  getDepartment,
  updateDepartment,
} from "../Services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const Department = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [errors, setErrors] = useState({
    departmentName: "",
    departmentDescription: "",
  });

  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const handleDepartmentName = (e) => {
    setDepartmentName(e.target.value);
  };
  const handleDepartmentDescription = (e) => {
    setDepartmentDescription(e.target.value);
  };

  const saveOrUpdateDepartment = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const department = { departmentName, departmentDescription };

      if (id) {
        console.log("update");
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      navigate("/departments");
    } else {
      console.log("validate false");
    }
  };

  useEffect(() => {
    if (id) {
      getDepartment(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName);
          setDepartmentDescription(response.data.departmentName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const validateForm = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (departmentName == "") {
      errorsCopy.departmentName = "Department Name is Required..!";
      valid = false;
    } else {
      errorsCopy.departmentName = "";
    }
    if (departmentDescription == "") {
      errorsCopy.departmentDescription =
        "Department Description is Required..!";
      valid = false;
    } else {
      errorsCopy.departmentDescription = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return (
        <h2 className="text-center" style={{ marginTop: "20px" }}>
          Update Department
        </h2>
      );
    } else {
      return (
        <h2 className="text-center" style={{ marginTop: "20px" }}>
          Add Department
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
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  placeholder="Enter Department Name"
                  name="departmentName"
                  value={departmentName}
                  onChange={handleDepartmentName}
                  className={`form-control ${
                    errors.departmentName ? "is-invalid" : ""
                  }`}
                />

                {errors.departmentName && (
                  <div className="invalid-feedback">
                    {errors.departmentName}
                  </div>
                )}
              </div>

              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  placeholder="Enter Department Description"
                  name="departmentDescription"
                  value={departmentDescription}
                  onChange={handleDepartmentDescription}
                  className={`form-control ${
                    errors.departmentDescription ? "is-invalid" : ""
                  }`}
                />
                {errors.departmentDescription && (
                  <div className="invalid-feedback">
                    {errors.departmentDescription}
                  </div>
                )}
              </div>

              <button
                className="btn btn-success"
                onClick={saveOrUpdateDepartment}
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

export default Department;
