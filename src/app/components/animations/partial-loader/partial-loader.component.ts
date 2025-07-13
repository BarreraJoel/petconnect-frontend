import { Component, Input } from '@angular/core';

@Component({
  selector: 'partial-loader',
  standalone: true,
  imports: [],
  templateUrl: './partial-loader.component.html',
  styleUrl: './partial-loader.component.css'
})
export class PartialLoaderComponent {
  @Input() isLoading: boolean = false;

}
