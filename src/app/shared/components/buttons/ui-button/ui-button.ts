import { Component, computed, input, output } from '@angular/core';
import { colors, ColorVariant } from '../../../theme/colors';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './ui-button.html',
  styleUrl: './ui-button.css',
})
export class UiButton {
  
  color = input<ColorVariant>('primary');
  variant = input<'outlined' | 'filled'>('filled');
  size = input<'small' | 'medium' | 'big'>('medium');
  disabled = input<boolean>(false);

  onClick = output();

  currentColor = computed(() => {
    return colors[this.color()];
  });


  clickHandle() {
    this.onClick.emit();
  }
};
