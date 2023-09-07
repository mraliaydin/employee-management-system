package com.aliaydin.ems.dao;

import com.aliaydin.ems.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentDAO extends JpaRepository<Department, Long> {
}
