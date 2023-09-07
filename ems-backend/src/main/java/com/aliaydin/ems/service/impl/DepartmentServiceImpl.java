package com.aliaydin.ems.service.impl;

import com.aliaydin.ems.dao.DepartmentDAO;
import com.aliaydin.ems.dto.DepartmentDTO;
import com.aliaydin.ems.entity.Department;
import com.aliaydin.ems.entity.Employee;
import com.aliaydin.ems.exception.ResourceNotFoundException;
import com.aliaydin.ems.mapper.DepartmentMapper;
import com.aliaydin.ems.mapper.EmployeeMapper;
import com.aliaydin.ems.service.DepartmentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private DepartmentDAO departmentDAO;
    @Override
    public DepartmentDTO createDepartment(DepartmentDTO departmentDTO) {
        Department department = DepartmentMapper.mapToDepartment(departmentDTO);

        Department savedDepartment = departmentDAO.save(department);

        return DepartmentMapper.mapToDepartmentDTO(savedDepartment);
    }

    @Override
    public DepartmentDTO getDepartmentById(Long departmentId) {
        Department department = departmentDAO.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department with id: " + departmentId + " not found..!"));

        return DepartmentMapper.mapToDepartmentDTO(department);
    }


    @Override
    public List<DepartmentDTO> getAllDepartments() {
        List<Department> departments = departmentDAO.findAll();
        return departments.stream().map((department) -> DepartmentMapper.mapToDepartmentDTO(department))
                .collect(Collectors.toList());
    }

    @Override
    public DepartmentDTO updateDepartment(Long departmentId, DepartmentDTO departmentDTO) {

        Department department = departmentDAO.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department with id: " + departmentId + " not found..!"));

        department.setDepartmentName(departmentDTO.getDepartmentName());
        department.setDepartmentDescription(departmentDTO.getDepartmentDescription());

        Department savedDepartment = departmentDAO.save(department);

        return DepartmentMapper.mapToDepartmentDTO(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        Department department = departmentDAO.findById(departmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Department with id: " + departmentId + " not found..!"));

        departmentDAO.deleteById(departmentId);
    }
}
