import { inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { switchMap, scan, tap, startWith } from "rxjs/operators";
import { MyApi } from "./my-api";

@Injectable({
  providedIn: "root",
})
export class MyService {
  myApiService = inject(MyApi);

  #modifyEmployees$ = new Subject<{ name: string; action: "add" | "remove" }>();
  employees$ = this.myApiService
    .load()
    .pipe(
      switchMap((initialEmployees) =>
        this.#modifyEmployees$.pipe(
          // need an initial emission
          startWith({name: '', action: 'remove'}),
          // collect values
          scan(
            (acc, curr) =>
              curr.action === "add"
                ? [...acc, curr.name]
                : acc.filter(employee => employee !== curr.name),
            [...initialEmployees]
          ),
          // save modified values back to API
          tap((employees) => this.myApiService.save(employees))
        )
      ),
    );

  addEmployee(employee: string) {
    this.#modifyEmployees$.next({ name: employee, action: "add" });
  }

  removeEmployee(employee: string){
    this.#modifyEmployees$.next({name: employee, action: "remove"});
  }

}
