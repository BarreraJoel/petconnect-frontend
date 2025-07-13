import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  @Input() isLoading: boolean = false;
  visible: boolean = false;
  fadeOut = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isLoading']) {
      if (this.isLoading) {
        this.visible = true;
        this.fadeOut = false;
      } else {
        // Empieza el fade-out
        this.fadeOut = true;
        setTimeout(() => {
          this.visible = false;
        }, 300); // tiempo igual a la duración de la animación CSS
      }
    }
  }
}
