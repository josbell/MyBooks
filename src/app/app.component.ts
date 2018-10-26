import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Books';
  links = [
    { label: 'Dashboad', path: '/dashboard' },
    { label: 'Book List', path: '/book-list' }
  ];
  activeLink = this.links[0];
}
