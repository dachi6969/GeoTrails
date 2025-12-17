import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../../theme/colors';


@Component({
  selector: 'right-arrow',
  imports: [],
  templateUrl: './right-arrow.html',
  styleUrl: './right-arrow.css',
})
export class RightArrow {
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
