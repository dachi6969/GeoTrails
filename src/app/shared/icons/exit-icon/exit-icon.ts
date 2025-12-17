import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';


@Component({
  selector: 'exit-icon',
  imports: [],
  templateUrl: './exit-icon.html',
  styleUrl: './exit-icon.css',
})
export class ExitIcon {
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
