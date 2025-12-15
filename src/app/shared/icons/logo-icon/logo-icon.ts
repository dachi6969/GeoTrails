import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../theme/colors';

@Component({
  selector: 'logo-icon',
  imports: [],
  templateUrl: './logo-icon.html',
  styleUrl: './logo-icon.css',
})
export class LogoIcon {

  color = input<ColorVariant>('dark');
  size = input<number>(24);

  onClick = output();

  currentColor = computed(() => {
    return colors[this.color()];
  });

  handleClick() {
    this.onClick.emit();
  }
}
