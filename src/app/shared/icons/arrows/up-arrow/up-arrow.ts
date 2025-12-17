import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../../theme/colors';

@Component({
  selector: 'up-arrow',
  imports: [],
  templateUrl: './up-arrow.html',
  styleUrl: './up-arrow.css',
})
export class UpArrow {
  size = input<number>(24);
  color = input<ColorVariant>('dark');

  onClick = output();

  currentColor = computed(() => {
    return colors[this.color()];
  })

  handleClick() {
    this.onClick.emit();
  }
}
