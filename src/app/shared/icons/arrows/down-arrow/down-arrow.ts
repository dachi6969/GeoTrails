import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../../theme/colors';

@Component({
  selector: 'down-arrow',
  imports: [],
  templateUrl: './down-arrow.html',
  styleUrl: './down-arrow.css',
})
export class DownArrow {
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
