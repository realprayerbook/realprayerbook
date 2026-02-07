
import { supabase } from './supabase';

export interface ShippingRequest {
  user_name: string;
  user_phone: string;
  user_address: string;
  friend_name?: string;
  friend_email?: string;
  amount: number;
}

export interface JournalEntry {
    id?: string;
    user_id: string;
    content: string;
    frequency: number;
    prompt?: string;
    tags?: string[];
    created_at?: string;
}

export const saveJournalEntry = async (entry: Partial<JournalEntry>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('journal_entries')
        .upsert([{
            ...entry,
            user_id: user.id,
            created_at: new Date().toISOString()
        }])
        .select()
        .single();

    if (error) {
        console.error('Error saving journal entry:', error);
        throw error;
    }
    return data;
};

export const getJournalEntries = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching journal entries:', error);
        throw error;
    }
    return data;
};

export const getTodayJournalEntry = async (date?: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const targetDate = date || new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', `${targetDate}T00:00:00Z`)
        .lte('created_at', `${targetDate}T23:59:59Z`)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) {
        console.error('Error fetching journal entry for date:', error);
        return null;
    }
    return data;
};

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

export const getDailyMessage = async (dayOfYear: number) => {
    const { data, error } = await supabase
        .from('daily_messages')
        .select('*')
        .eq('day_of_year', dayOfYear)
        .maybeSingle();

    if (error) {
        console.error('Error fetching daily message:', error);
        return null;
    }
    return data;
};

export const recordVisit = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const today = new Date().toISOString().split('T')[0];
    
    const { error } = await supabase
        .from('user_visits')
        .upsert([{ 
            user_id: user.id, 
            visit_date: today 
        }], { onConflict: 'user_id,visit_date' });

    if (error && error.code !== '23505') { // Ignore duplicate key if it somehow happens outside upsert logic
        console.error('Error recording visit:', error);
    }
};

export const getWeeklyVisits = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // Get visits from the last 7 days including today
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const startDate = sevenDaysAgo.toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('user_visits')
        .select('visit_date')
        .eq('user_id', user.id)
        .gte('visit_date', startDate);

    if (error) {
        console.error('Error fetching weekly visits:', error);
        return [];
    }
    return data.map(v => v.visit_date);
};
