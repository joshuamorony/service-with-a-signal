import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MyService {
  private employees$ = new BehaviorSubject<string[]>([]);

  getEmployees() {
    return this.employees$.asObservable();
  }

  addEmployee(employee: string) {
    this.employees$.next([...this.employees$.value, employee]);
  }

  removeEmployee(employeeToRemove: string) {
    this.employees$.next([
      ...this.employees$.value.filter((employee) => employee !== employeeToRemove),
    ]);
  }
}
