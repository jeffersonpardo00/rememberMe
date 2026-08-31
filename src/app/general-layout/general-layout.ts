import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, signal } from '@angular/core';
import { MemoriesGird } from '../memories-gird/memories-gird';
import { NewMemory, NewMemoryPayload } from '../new-memory/new-memory';
import { SupabaseService } from '../../services/SupaServices/supabase';
import { MEMORY_TONES, MemoryItem, MemoryResponse } from '../../Models/memoryModel';

@Component({
  selector: 'app-general-layout',
  imports: [MemoriesGird, NewMemory],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general-layout.html',
  styleUrl: './general-layout.scss'
})
export class GeneralLayout implements OnInit {
  readonly isNewMemoryOpen = signal(false);
  public memories: MemoryItem[] = [];

  private readonly supabaseService = inject(SupabaseService);
  private readonly cdr = inject(ChangeDetectorRef);

  async ngOnInit() {
    await this.refreshMemories();
  }

  private async refreshMemories(): Promise<void> {
    try {
      const resp = await this.supabaseService.getMemories();
      this.memories = resp.map(memory => this.toMemoryItem(memory));
      this.cdr.markForCheck();
    } catch (error) {
      console.error('Error loading memories', error);
    }
  }

  private toMemoryItem(memoryResp: MemoryResponse): MemoryItem {
    const randomTone = MEMORY_TONES[Math.floor(Math.random() * MEMORY_TONES.length)];

    return {
      ...memoryResp,
      date: new Date(memoryResp.date),
      imageAlt: memoryResp.title,
      tone: randomTone
    };
  }

  openNewMemory(): void {
    this.isNewMemoryOpen.set(true);
  }

  closeNewMemory(): void {
    this.isNewMemoryOpen.set(false);
  }

  async saveNewMemory(payload: NewMemoryPayload): Promise<void> {
    try {
      await this.supabaseService.createMemory(
        payload.text,
        payload.author,
        payload.title,
        payload.imageFile
      );
      await this.refreshMemories();
    } catch (error) {
      console.error('Error creating memory', error);
    } finally {
      this.closeNewMemory();
    }
  }
}
