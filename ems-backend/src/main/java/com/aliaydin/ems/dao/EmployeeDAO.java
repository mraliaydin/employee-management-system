package com.aliaydin.ems.dao;

import com.aliaydin.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDAO extends JpaRepository<Employee, Long> {
}
