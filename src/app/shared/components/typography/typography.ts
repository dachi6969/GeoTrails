import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { colors ,ColorVariant } from '../../theme/colors';

type sizeVariants = 
'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body1' | 'body2'
 
@Component({
  selector: 'ui-typography',
  imports: [CommonModule],
  templateUrl: './typography.html',
  styleUrl: './typography.css',
})
export class Typography {
  variant = input<sizeVariants>('body1');
  color = input<ColorVariant>('dark');

  currentColor = computed(() => {
    return colors[this.color()];
  });

}
