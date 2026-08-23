import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MemoryItem } from '../memory/memory';

@Component({
  selector: 'app-memory-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory-detail.html',
  styleUrl: './memory-detail.scss'
})
export class MemoryDetail {
  readonly item = input.required<MemoryItem>();
  readonly closed = output<void>();
}
