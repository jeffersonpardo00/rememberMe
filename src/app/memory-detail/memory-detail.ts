import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MemoryItem } from '../../Models/memoryModel';

@Component({
  selector: 'app-memory-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-detail.html',
  styleUrl: './memory-detail.scss'
})
export class MemoryDetail {
  readonly item = input.required<MemoryItem>();
  readonly closed = output<void>();

  formatDate(date: Date | string): string {
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  }
}
