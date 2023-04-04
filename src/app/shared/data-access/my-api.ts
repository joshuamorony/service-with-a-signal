import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";

@Injectable({ providedIn: "root" })
export class MyApi {
  load() {
    return of(["Josh", "Bob", "Jen"]).pipe(delay(2000));
  }
}
