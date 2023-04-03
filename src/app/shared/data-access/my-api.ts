import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class MyApi {
  loadData() {
    return of(["Josh", "Bob", "Jen"]).pipe(delay(2000));
  }
}
