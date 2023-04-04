import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { MyApi } from "./my-api";

@Injectable({
  providedIn: "root",
})
export class MyService {
  myApiService = inject(MyApi);

  #employees = signal<string[]>([]); // private to this service
  employees = computed(() => this.#employees()); //exposed publicly

  hasLoaded = false;

  init = effect(() => {
    this.loadEmployees();
  });

  save = effect(() => {
    if (this.hasLoaded) {
      this.myApiService.save(this.employees());
    }
  });

  async loadEmployees() {
    // sacrilege!
    const initialEmployees = await lastValueFrom(this.myApiService.load());
    this.#employees.update((employees) => [...initialEmployees, ...employees]);
    this.hasLoaded = true;
  }

  addEmployee(employee: string) {
    this.#employees.update((employees) => [...employees, employee]);
  }

  removeEmployee(employeeToRemove: string) {
    this.#employees.update((employees) => [
      ...employees.filter((employee) => employee !== employeeToRemove),
    ]);
  }
}
