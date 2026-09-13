import { Component } from '@angular/core'; // Component is needed because this file defines an Angular component.

import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

import { FormsModule } from '@angular/forms'; // FormsModule is needed because our HTML uses [(ngModel)].

@Component({
  
  selector: 'app-root',// HTML name of our root component.
  imports: [  // Angular features used inside app.component.html.
    RouterLink, // used for navigation
    RouterLinkActive, // used to show the active route using CSS
    RouterOutlet, // displays the component for the current route
    FormsModule, // needed for [(ngModel)]
  ],
  templateUrl: './app.component.html',// HTML file connected to this component.
  styleUrl: './app.component.css',// CSS file connected to this component.
})
export class App {
  // Variable that holds the main page title.
  title = 'Developer Learning Hub';

  // Boolean value that controls whether the technology buttons are disabled.
  disabledButton = false;
  
  // Default value shown in the learning-goal input.
  technology = 'Learn Angular';
}
