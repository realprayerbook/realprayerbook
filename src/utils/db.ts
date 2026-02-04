
import { supabase } from './supabase';

export interface ShippingRequest {
  user_name: string;
  user_phone: string;
  user_address: string;
  friend_name?: string;
  friend_address?: string;
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
