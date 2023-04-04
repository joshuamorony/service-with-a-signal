import { computed, Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MyService {
  #employees = signal<string[]>([]); // private to this service
  employees = computed(() => this.#employees()); //exposed publicly

  addEmployee(employee: string) {
    this.#employees.update((employees) => [...employees, employee]);
  }

  removeEmployee(employeeToRemove: string) {
    this.#employees.update((employees) => [
      ...employees.filter((employee) => employee !== employeeToRemove),
    ]);
  }
}
