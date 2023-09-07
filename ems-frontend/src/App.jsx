import "./App.css";
import Department from "./Components/Department";
import Employee from "./Components/Employee";
import Header from "./Components/Header";
import ListDepartment from "./Components/ListDepartment";
import ListEmployee from "./Components/ListEmployee";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/employees" element={<ListEmployee />} />
        <Route path="/addEmployee" element={<Employee />} />
        <Route path="/editEmployee/:id" element={<Employee />} />
        <Route path="/departments" element={<ListDepartment />} />
        <Route path="/addDepartment" element={<Department />} />
        <Route path="/editDepartment/:id" element={<Department />} />
      </Routes>
    </>
  );
}

export default App;
