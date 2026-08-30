import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';
import { MemoryResponse } from '../../Models/memoryModel';

export interface MemorySupaResp {
    approved: boolean;
    author: string;
    created_at: string;
    id: string;
    image_file_path: string;
    message: string;
    title: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabasePublishableKey
    );
  }

  async getMemories() {

    const { data, error } = await this.supabase
      .from('memories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data.map(memory => this.mapToMemoryResponse(memory));
  }

  private mapToMemoryResponse(memorySupa: MemorySupaResp): MemoryResponse{
    return {
      id: memorySupa.id,
      date: memorySupa.created_at,
      author: memorySupa.author,
      title: memorySupa.title,
      text: memorySupa.message,
      image: memorySupa.image_file_path
    }
  }


  async createMemory(
    message: string,
    author?: string | undefined,
    title?: string| undefined,
    imageFile?: File | undefined,
  ) {

    const image_path_raw = await this.uploadPhoto(imageFile);
    let image_path = null;
    if(image_path_raw) image_path  = image_path_raw;
    
    const { data, error } = await this.supabase
      .from('memories')
      .insert({
        author: author,
        message: message,
        image_file_path: image_path,
        approved: false,
        title: title
      });

    if (error) {
      throw error;
    }

    return data;
  }

  async uploadPhoto(file: File | undefined): Promise<string | null> {

    if(file){
      const extension = file.name.split('.').pop();
      const fileName =
        `${crypto.randomUUID()}.${extension}`;

      const { data, error } = await this.supabase
        .storage
        .from('memory_photos')
        .upload(fileName, file);

      if (error) {
        throw error;
      }

      return data.fullPath;
    }

    return null;
    
  }

  getPhotoUrl(path: string): string {

  const { data } = this.supabase
    .storage
    .from('memory_photos')
    .getPublicUrl(path);

  return data.publicUrl;
}

}
