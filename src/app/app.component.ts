import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MyAngularCourse';
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        console.log('Navigation started:', event);
      }

      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event);
      }

      if (event instanceof NavigationError) {
        console.error('Navigation error:', event);
      }
    });
  }
}
