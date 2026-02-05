
import { supabase } from './supabase';

export interface ShippingRequest {
  user_name: string;
  user_phone: string;
  user_address: string;
  friend_name?: string;
  friend_email?: string;
  amount: number;
}

export const saveShippingDetails = async (data: ShippingRequest) => {
  const { error } = await supabase
    .from('shipping_requests')
    .insert([data]);
  
  if (error) {
    console.error('Error saving shipping details:', error);
    throw error;
  }
};

export const createPost = async (title: string, content: string, videoUrl?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
        .from('posts')
        .insert([{
            title,
            content,
            video_url: videoUrl,
            author_id: user.id
        }]);

    if (error) throw error;
};

export const getPosts = async () => {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
};

export const getShippingRequests = async () => {
    const { data, error } = await supabase
        .from('shipping_requests')
        .select('*')
        .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
}

export const saveSystemConfig = async (key: string, value: string) => {
    const { error } = await supabase
        .from('app_config')
        .upsert([{ key, value, updated_at: new Date() }]);

    if (error) {
        console.error('Error saving config:', error);
        throw error;
    }
};

export const getSystemConfig = async (key: string) => {
    const { data, error } = await supabase
        .from('app_config')
        .select('value')
        .eq('key', key)
        .single();
    
    if (error) {
        // It's okay if not found, just return null
        if (error.code === 'PGRST116') return null;
        console.error('Error fetching config:', error);
        return null;
    }
    return data?.value;
};
