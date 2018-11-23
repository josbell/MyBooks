import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'My Books';
  links = [
    { label: 'Search', path: '/dashboard' },
    { label: 'Have Read', path: '/book-list' }
  ];
  activeLink = this.links[0];

  constructor() { }

  ngOnInit() {
  }

}
