import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MyService } from "../shared/data-access/subject.service";

@Component({
  standalone: true,
  selector: "app-home",
  template: `
    <ul>
      <li *ngFor="let employee of myService.getEmployees() | async">
        {{ employee }}
      </li>
    </ul>

    <button (click)="myService.addEmployee('Josh')">Add</button>
    <button (click)="myService.removeEmployee('Josh')">Remove</button>
  `,
  imports: [CommonModule],
})
export default class HomeComponent {
  myService = inject(MyService);
}
