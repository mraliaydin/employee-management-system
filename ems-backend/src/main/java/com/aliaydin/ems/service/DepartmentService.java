package com.aliaydin.ems.service;

import com.aliaydin.ems.dto.DepartmentDTO;
import com.aliaydin.ems.entity.Department;
import org.springframework.stereotype.Service;

import java.util.List;

public interface DepartmentService {

    DepartmentDTO createDepartment(DepartmentDTO departmentDTO);

    DepartmentDTO getDepartmentById(Long departmentId);

    List<DepartmentDTO> getAllDepartments();

    DepartmentDTO updateDepartment(Long departmentId, DepartmentDTO departmentDTO);

    void deleteDepartment(Long departmentId);
}
