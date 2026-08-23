import { ChangeDetectionStrategy, Component, OnInit, signal, viewChild } from '@angular/core';
import { MemoriesGird } from '../memories-gird/memories-gird';
import { NewMemory, NewMemoryPayload } from '../new-memory/new-memory';
import { SupabaseService } from '../../services/services/supabase';
import { MemoryItem } from '../memory/memory';

@Component({
  selector: 'app-general-layout',
  imports: [MemoriesGird, NewMemory],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './general-layout.html',
  styleUrl: './general-layout.scss'
})
export class GeneralLayout implements OnInit {
  private readonly memoriesGrid = viewChild(MemoriesGird);
  readonly isNewMemoryOpen = signal(false);
  public memories: any[] = [
  ];

  constructor(
    private supabaseService: SupabaseService
  ){}

  async ngOnInit() {
    this.memories = await this.supabaseService.getMemories();
  }

  openNewMemory(): void {
    this.isNewMemoryOpen.set(true);
  }

  closeNewMemory(): void {
    this.isNewMemoryOpen.set(false);
  }

  saveNewMemory(payload: NewMemoryPayload): void {
   /* this.memoriesGrid()?.addMemory(payload);
    this.closeNewMemory();*/
  }
}
