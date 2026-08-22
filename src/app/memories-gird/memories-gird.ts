import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Memory, MemoryItem } from '../memory/memory';

@Component({
  selector: 'app-memories-gird',
  imports: [Memory],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memories-gird.html',
  styleUrl: './memories-gird.scss'
})
export class MemoriesGird {
  readonly selectedFilter = signal<'all' | 'with-image' | 'notes'>('all');

  readonly memories: readonly MemoryItem[] = [
    { id: 1, date: '12 May 2025', title: 'The long way home', text: 'We missed the last train and found a bakery that stayed open just for us.', image: 'https://picsum.photos/seed/remember-01/720/520', imageAlt: 'Warm light on a quiet street at dusk', tone: 'clay' },
    { id: 2, date: '03 Apr 2025', title: 'A tiny victory', text: 'The first green leaf appeared on the windowsill.', tone: 'mint' },
    { id: 3, date: '27 Mar 2025', title: 'Sunday light', text: 'Coffee, open windows, and nowhere else to be.', image: 'https://picsum.photos/seed/remember-02/720/900', imageAlt: 'A sunlit room with plants', tone: 'sun' },
    { id: 4, date: '14 Feb 2025', title: 'Postcard from Porto', text: 'Blue tiles, salty air, and a promise to come back.', image: 'https://picsum.photos/seed/remember-03/720/480', imageAlt: 'Colorful buildings near water', tone: 'sky' },
    { id: 5, date: '08 Jan 2025', title: 'Keep this close', text: 'Some days are ordinary until you look back at them.', tone: 'rose' },
    { id: 6, date: '31 Dec 2024', title: 'The midnight list', text: 'Three wishes, two dances, one very good year.', image: 'https://picsum.photos/seed/remember-04/720/760', imageAlt: 'Lights glowing in the evening', tone: 'clay' },
    { id: 7, date: '19 Nov 2024', title: 'Wildflowers', text: 'You said the best things are usually growing a little untamed.', image: 'https://picsum.photos/seed/remember-05/720/560', imageAlt: 'Wildflowers in a field', tone: 'mint' },
    { id: 8, date: '02 Oct 2024', title: 'Note to future me', text: 'Remember how brave you were before you knew it.', tone: 'sun' },
    { id: 9, date: '18 Aug 2024', title: 'Summer thunder', text: 'We watched the storm from the balcony and counted the seconds.', image: 'https://picsum.photos/seed/remember-06/720/820', imageAlt: 'Cloudy sky over a landscape', tone: 'sky' },
    { id: 10, date: '06 Jun 2024', title: 'A good table', text: 'The kind of evening that makes everyone linger.', tone: 'rose' },
    { id: 11, date: '22 Apr 2024', title: 'First draft', text: 'A small beginning still counts as a beginning.', image: 'https://picsum.photos/seed/remember-07/720/510', imageAlt: 'A notebook on a wooden table', tone: 'sun' },
    { id: 12, date: '11 Jan 2024', title: 'Still here', text: 'A quiet reminder that the story keeps unfolding.', tone: 'mint' }
  ];

  readonly visibleMemories = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'with-image') return this.memories.filter((memory) => memory.image);
    if (filter === 'notes') return this.memories.filter((memory) => !memory.image);
    return this.memories;
  });

  setFilter(filter: 'all' | 'with-image' | 'notes'): void {
    this.selectedFilter.set(filter);
  }
}
