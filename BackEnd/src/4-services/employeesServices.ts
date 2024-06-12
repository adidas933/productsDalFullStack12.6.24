import { OkPacketParams } from 'mysql2';
import { dal } from '../2-utils/dal';
import { EmployeeModel } from '../3-models/employeeModel';

// employee service - any logic regarding employees:
class EmployeeService {
  // Get all employees:
  public async getAllEmployees() {
    // Create sql:
    const sql = 'SELECT id, firstName, lastName, birthDate FROM employees';
    // Execute:
    const employees = await dal.execute(sql);
    // Return:
    return employees;
  }

  public async getSpecificEmployee(id: number) {
    const sql =
      'SELECT id, firstName, lastName, birthDate FROM employees WHERE id = ?';
    const employees = await dal.execute(sql, [id]);
    const employee = employees[0];
    return employee;
  }

  public async postEmployee(employee: EmployeeModel) {
    // Create sql:
    const sql =
      'INSERT INTO employees (firstName, lastName, birthDate) VALUES (?, ?, ?)';
    // Execute:
    const info: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.birthDate,
    ]);
    // Return:
    employee.id = info.insertId;
    return employee;
  }

  public async updateEmployee(employee: EmployeeModel) {
    const sql =
      'UPDATE employees SET firstName = ?, lastName = ?, birthDate = ? WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [
      employee.firstName,
      employee.lastName,
      employee.birthDate,
      employee.id,
    ]);
    return employee;
  }

  public async deleteEmployee(id: number) {
    const sql = 'DELETE from employees WHERE id = ?';
    const info: OkPacketParams = await dal.execute(sql, [id]);
  }
}

export const employeeService = new EmployeeService();
