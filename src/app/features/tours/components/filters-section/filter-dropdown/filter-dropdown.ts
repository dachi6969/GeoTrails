import { Component, HostListener, input, output, signal } from '@angular/core';

@Component({
  selector: 'filter-dropdown',
  imports: [],
  templateUrl: './filter-dropdown.html',
  styleUrl: './filter-dropdown.css',
})
export class FilterDropdown {
  options = input<string[]>();
  placeholder = input('default');
  maxWidth = input<boolean>(false);

  valueChange = output<any>();

  open = signal(false);
  selected = signal<string | null>(null);
  

  toggle() {
    if ( !this.options()?.length ) return;
    this.open.update(prev => !prev); 
  }

  select(option: string) {
    this.selected.set(option);
    this.valueChange.emit({
      option: option,
      dropDownName: this.placeholder()
    });
    this.open.set(false)
  }

  @HostListener('document:click')
  close() {
    this.open.set(false)
  }
}
