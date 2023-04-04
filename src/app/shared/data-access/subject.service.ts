import { inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MyApi } from "./my-api";

@Injectable({
  providedIn: "root",
})
export class MyService {

  #employees$ = new BehaviorSubject<string[]>([]); // private to this service
  employees$ = this.#employees$.asObservable(); // exposed publicly

  addEmployee(employee: string) {
    this.#employees$.next([...this.#employees$.value, employee]);
  }

  removeEmployee(employeeToRemove: string) {
    this.#employees$.next([
      ...this.#employees$.value.filter((employee) => employee !== employeeToRemove),
    ]);
  }
}
