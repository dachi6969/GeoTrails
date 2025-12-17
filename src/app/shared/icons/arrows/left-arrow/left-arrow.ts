import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../../theme/colors';

@Component({
  selector: 'left-arrow',
  imports: [],
  templateUrl: './left-arrow.html',
  styleUrl: './left-arrow.css',
})
export class LeftArrow {
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
