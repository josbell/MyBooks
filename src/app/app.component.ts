import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Books';
  links = [
    { label: 'Search', path: '/dashboard' },
    { label: 'Have Read', path: '/book-list' },
    { label: 'To Read', path: '/book-list' },
    { label: 'Top Five', path: '/book-list' }
  ];
  activeLink = this.links[0];
}
