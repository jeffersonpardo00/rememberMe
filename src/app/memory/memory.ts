import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MemoryItem } from '../../Models/memoryModel';

@Component({
  selector: 'app-memory',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory.html',
  styleUrl: './memory.scss'
})
export class Memory {
  readonly item = input.required<MemoryItem>();
  readonly selected = output<MemoryItem>();

  openDetail(): void {
    this.selected.emit(this.item());
  }
}

