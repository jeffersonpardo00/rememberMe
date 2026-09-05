export const MEMORY_TONES = ['sun', 'mint', 'sky', 'rose'] as const;

export type MemoryTone = typeof MEMORY_TONES[number];

export interface MemoryResponse {
  readonly id: string;
  readonly date: Date | string;
  readonly author: string;
  readonly title: string;
  readonly text: string;
  readonly image?: string;
}

export interface MemoryItem extends MemoryResponse {
  readonly imageAlt?: string;
  readonly tone: MemoryTone;
}