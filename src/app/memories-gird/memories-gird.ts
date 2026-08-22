import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Memory, MemoryItem } from '../memory/memory';
import { NewMemoryPayload } from '../new-memory/new-memory';

@Component({
  selector: 'app-memories-gird',
  imports: [Memory],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './memories-gird.html',
  styleUrl: './memories-gird.scss'
})
export class MemoriesGird {
  readonly selectedFilter = signal<'all' | 'with-image' | 'notes'>('all');

  readonly memories = signal<readonly MemoryItem[]>([
    { id: 1, date: '12 Mayo 2025', author: 'Maya', title: 'El camino largo a casa', text: 'Perdimos el último tren y encontramos una panadería que abrió solo para nosotros.', image: 'https://picsum.photos/seed/remember-01/720/520', imageAlt: 'Luz cálida en una calle tranquila al anochecer', tone: 'clay' },
    { id: 2, date: '03 Abril 2025', author: 'Leo', title: 'Una pequeña victoria', text: 'La primera hoja verde apareció en el alféizar.', tone: 'mint' },
    { id: 3, date: '27 Marzo 2025', author: 'Maya', title: 'Luz de domingo', text: 'Café, ventanas abiertas y ningún otro lugar donde estar.', image: 'https://picsum.photos/seed/remember-02/720/900', imageAlt: 'Una habitación iluminada por el sol con plantas', tone: 'sun' },
    { id: 4, date: '14 Febrero 2025', author: 'Noah', title: 'Postal desde Oporto', text: 'Azulejos azules, aire salado y la promesa de volver.', image: 'https://picsum.photos/seed/remember-03/720/480', imageAlt: 'Edificios coloridos junto al agua', tone: 'sky' },
    { id: 5, date: '08 Enero 2025', author: 'Maya', title: 'Guarda esto cerca', text: 'Algunos días son corrientes hasta que los miras hacia atrás.', tone: 'rose' },
    { id: 6, date: '31 Diciembre 2024', author: 'Leo', title: 'La lista de medianoche', text: 'Tres deseos, dos bailes y un año muy bueno.', image: 'https://picsum.photos/seed/remember-04/720/760', imageAlt: 'Luces brillando al atardecer', tone: 'clay' },
    { id: 7, date: '19 Noviembre 2024', author: 'Noah', title: 'Flores silvestres', text: 'Dijiste que las mejores cosas suelen crecer un poco a su aire.', image: 'https://picsum.photos/seed/remember-05/720/560', imageAlt: 'Flores silvestres en un campo', tone: 'mint' },
    { id: 8, date: '02 Octubre 2024', author: 'Maya', title: 'Nota para mi yo del futuro', text: 'Recuerda lo valiente que fuiste antes de saberlo.', tone: 'sun' },
    { id: 9, date: '18 Agosto 2024', author: 'Leo', title: 'Tormenta de verano', text: 'Miramos la tormenta desde el balcón y contamos los segundos.', image: 'https://picsum.photos/seed/remember-06/720/820', imageAlt: 'Cielo nublado sobre un paisaje', tone: 'sky' },
    { id: 10, date: '06 Junio 2024', author: 'Noah', title: 'Una buena mesa', text: 'El tipo de tarde que hace que todos quieran quedarse.', tone: 'rose' },
    { id: 11, date: '22 Abril 2024', author: 'Maya', title: 'Primer borrador', text: 'Un pequeño comienzo sigue siendo un comienzo.', image: 'https://picsum.photos/seed/remember-07/720/510', imageAlt: 'Un cuaderno sobre una mesa de madera', tone: 'sun' },
    { id: 12, date: '11 Ene 2024', author: 'Leo', title: 'Aquí seguimos', text: 'Un recordatorio tranquilo de que la historia continúa.', tone: 'mint' }
  ]);

  readonly visibleMemories = computed(() => {
    const filter = this.selectedFilter();
    const memories = this.memories();
    if (filter === 'with-image') return memories.filter((memory) => memory.image);
    if (filter === 'notes') return memories.filter((memory) => !memory.image);
    return memories;
  });

  setFilter(filter: 'all' | 'with-image' | 'notes'): void {
    this.selectedFilter.set(filter);
  }

  addMemory(payload: NewMemoryPayload): void {
    const today = new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date());
    const memory: MemoryItem = {
      id: Date.now(),
      date: today,
      author: payload.author || 'Anónimo',
      title: payload.title || 'Un momento para recordar',
      text: payload.text,
      image: payload.imagePreview,
      imageAlt: payload.title || 'Imagen de un recuerdo',
      tone: 'sun'
    };
    this.memories.update((memories) => [memory, ...memories]);
  }

}
