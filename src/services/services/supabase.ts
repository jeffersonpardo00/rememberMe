import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environment/environment';

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
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  }

  async createMemory(
    authorName: string,
    message: string,
    photoPath?: string
  ) {
    const { data, error } = await this.supabase
      .from('memories')
      .insert({
        author_name: authorName,
        message: message,
        photo_path: photoPath ?? null
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

}
