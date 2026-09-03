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

  formatDate(date: Date | string): string {
    const safeDate = new Date(date);

    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(safeDate);
  }

  previewText(text: string): string {
    return text.length > 280 ? `${text.slice(0, 280).trimEnd()}...` : text;
  }

  openDetail(): void {
    this.selected.emit(this.item());
  }
}

