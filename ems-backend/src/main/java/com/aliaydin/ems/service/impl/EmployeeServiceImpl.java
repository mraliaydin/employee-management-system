package com.aliaydin.ems.service.impl;

import com.aliaydin.ems.dao.DepartmentDAO;
import com.aliaydin.ems.dao.EmployeeDAO;
import com.aliaydin.ems.dto.EmployeeDTO;
import com.aliaydin.ems.entity.Department;
import com.aliaydin.ems.entity.Employee;
import com.aliaydin.ems.exception.ResourceNotFoundException;
import com.aliaydin.ems.mapper.EmployeeMapper;
import com.aliaydin.ems.service.EmployeeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeDAO employeeDAO;
    private DepartmentDAO departmentDAO;

    @Override
    public EmployeeDTO createEmployee(EmployeeDTO employeeDTO) {

        Employee employee = EmployeeMapper.mapToEmployee(employeeDTO);

        Department department = departmentDAO.findById(employeeDTO.getDepartmentId())
                .orElseThrow(()->new ResourceNotFoundException("Department with id: " + employeeDTO.getDepartmentId() + " not found!"));

        employee.setDepartment(department);
        Employee savedEmployee = employeeDAO.save(employee);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDTO getEmployeeById(Long employeeId) {

        Employee employee = employeeDAO.findById(employeeId)
                .orElseThrow(()->new ResourceNotFoundException("Employee with id: " + employeeId + " not found!"));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        List<Employee> employees = employeeDAO.findAll();
        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO updateEmployee(Long employeeId, EmployeeDTO updatedEmployee) {

        Employee employee = employeeDAO.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id: " + employeeId + " not found..!"));

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Department department = departmentDAO.findById(updatedEmployee.getDepartmentId())
                .orElseThrow(()->new ResourceNotFoundException("Department with id: " + updatedEmployee.getDepartmentId() + " not found!"));

        employee.setDepartment(department);

        Employee updatedEmployeeObj = employeeDAO.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeDAO.findById(employeeId)
                .orElseThrow(()-> new ResourceNotFoundException("Employee with id: " + employeeId + " not found..!"));

        employeeDAO.deleteById(employeeId);
    }
}
