export interface MemoryResponse {
  readonly id: string;
  readonly date: string;
  readonly author: string;
  readonly title: string;
  readonly text: string;
  readonly image?: string;
}

export interface MemoryItem extends MemoryResponse {
  readonly imageAlt?: string;
  readonly tone: 'sun' | 'clay' | 'mint' | 'sky' | 'rose';
}