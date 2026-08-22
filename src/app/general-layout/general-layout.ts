import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { MemoriesGird } from '../memories-gird/memories-gird';
import { NewMemory, NewMemoryPayload } from '../new-memory/new-memory';

@Component({
  selector: 'app-general-layout',
  imports: [MemoriesGird, NewMemory],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general-layout.html',
  styleUrl: './general-layout.scss'
})
export class GeneralLayout {
  private readonly memoriesGrid = viewChild(MemoriesGird);
  readonly isNewMemoryOpen = signal(false);

  openNewMemory(): void {
    this.isNewMemoryOpen.set(true);
  }

  closeNewMemory(): void {
    this.isNewMemoryOpen.set(false);
  }

  saveNewMemory(payload: NewMemoryPayload): void {
    this.memoriesGrid()?.addMemory(payload);
    this.closeNewMemory();
  }
}
