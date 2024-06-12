export class EmployeeModel {
  public id: number;
  public firstName: string;
  public lastName: string;
  public birthDate: string;

  public constructor(employee: EmployeeModel) {
    this.id = employee.id;
    this.firstName = employee.firstName;
    this.lastName = employee.lastName;
    this.birthDate = employee.birthDate;
  }
}
