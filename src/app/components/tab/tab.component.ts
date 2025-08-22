import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tab',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent {

}
