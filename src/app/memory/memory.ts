import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export interface MemoryItem {
  readonly id: number;
  readonly date: string;
  readonly title: string;
  readonly text: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly tone: 'sun' | 'clay' | 'mint' | 'sky' | 'rose';
}

@Component({
  selector: 'app-memory',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memory.html',
  styleUrl: './memory.scss'
})
export class Memory {
  readonly item = input.required<MemoryItem>();
}
