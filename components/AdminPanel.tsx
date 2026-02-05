
import React, { useEffect, useState } from 'react';
import { createPost, getShippingRequests, saveSystemConfig, getSystemConfig } from '../utils/db';

const AdminPanel: React.FC = () => {
    const [view, setView] = useState<'create-post' | 'orders' | 'settings'>('create-post');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [orders, setOrders] = useState<any[]>([]);
    const [loadingInfo, setLoadingInfo] = useState(false);

    useEffect(() => {
        if (view === 'orders') {
            loadOrders();
        } else if (view === 'settings') {
            loadSettings();
        }
    }, [view]);

    const loadSettings = async () => {
        const key = await getSystemConfig('GEMINI_API_KEY');
        if (key) setApiKey(key);
    };

    const loadOrders = async () => {
        setLoadingInfo(true);
        try {
            const data = await getShippingRequests();
            if (data) setOrders(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingInfo(false);
        }
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createPost(title, content, videoUrl);
            alert('Transmission Successful!');
            setTitle('');
            setContent('');
            setVideoUrl('');
        } catch (err) {
            console.error(err);
            alert('Error creating post check console');
        }
    };

    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await saveSystemConfig('GEMINI_API_KEY', apiKey);
            alert('Settings Saved Successfully');
        } catch (err) {
            console.error(err);
            alert('Error saving settings');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">
            <h1 className="text-4xl font-regal text-brand-gold mb-12">Admin Command Center</h1>
            
            <div className="flex gap-6 mb-12">
                <button 
                  onClick={() => setView('create-post')} 
                  className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${view === 'create-post' ? 'bg-brand-gold text-brand-obsidian shadow-lg' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  Create Transmission
                </button>
                <button 
                  onClick={() => setView('orders')} 
                  className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${view === 'orders' ? 'bg-brand-gold text-brand-obsidian shadow-lg' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  Dispatch Queue
                </button>
                <button 
                  onClick={() => setView('settings')} 
                  className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${view === 'settings' ? 'bg-brand-gold text-brand-obsidian shadow-lg' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  Settings
                </button>
            </div>

            {view === 'settings' && (
                <form onSubmit={handleSaveSettings} className="glass-card p-12 rounded-[3rem] border border-white/10 space-y-8 max-w-3xl">
                    <h3 className="text-2xl text-white font-regal italic">System Configuration</h3>
                    
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-brand-gold font-bold">Gemini API Key</label>
                        <input 
                            type="password"
                            className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-brand-gold outline-none" 
                            placeholder="Enter API Key..." 
                            value={apiKey} 
                            onChange={e => setApiKey(e.target.value)} 
                        />
                        <p className="text-white/40 text-xs">Used for AI features. Stored securely.</p>
                    </div>
                    
                    <button className="w-full bg-brand-gold text-brand-obsidian py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
                        Save Configuration
                    </button>
                </form>
            )}

            {view === 'create-post' && (
                <form onSubmit={handlePost} className="glass-card p-12 rounded-[3rem] border border-white/10 space-y-8 max-w-3xl">
                    <h3 className="text-2xl text-white font-regal italic">New Transmission</h3>
                    
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-brand-gold font-bold">Title</label>
                        <input className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-brand-gold outline-none" placeholder="Enter title..." value={title} onChange={e => setTitle(e.target.value)} required />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-brand-gold font-bold">Content</label>
                        <textarea className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white h-48 focus:border-brand-gold outline-none" placeholder="Write your message..." value={content} onChange={e => setContent(e.target.value)} required />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-brand-gold font-bold">Video URL (Optional)</label>
                        <input className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white focus:border-brand-gold outline-none" placeholder="https://youtube.com/..." value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
                    </div>
                    
                    <button className="w-full bg-brand-gold text-brand-obsidian py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-xl">
                        Publish to Community
                    </button>
                </form>
            )}
            
            {view === 'orders' && (
                <div className="space-y-8">
                    <h3 className="text-2xl text-white font-regal italic">Pending Dispatches</h3>
                    {loadingInfo ? <p className="text-white/50">Loading...</p> : (
                        <div className="grid gap-6">
                            {orders.length === 0 && <p className="text-white/30">No orders found.</p>}
                            {orders.map(order => (
                                <div key={order.id} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 text-white flex flex-col md:flex-row gap-8 items-start md:items-center justify-between hover:bg-white/[0.07] transition-colors">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-2">
                                            <p className="font-bold text-xl text-brand-gold">{order.user_name}</p>
                                            <span className="bg-brand-purble/50 px-3 py-1 rounded-full text-[10px] uppercase border border-white/20">{order.status}</span>
                                        </div>
                                        <p className="text-sm opacity-60 font-mono mb-4">{order.user_phone}</p>
                                        
                                        <div className="grid md:grid-cols-2 gap-8 text-sm">
                                            <div>
                                                <p className="text-[10px] uppercase tracking-widest text-brand-gold/70 mb-1">Shipping To</p>
                                                <p className="opacity-80 leading-relaxed">{order.user_address}</p>
                                            </div>
                                            {order.friend_name && (
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-widest text-brand-gold/70 mb-1">Gift For: {order.friend_name}</p>
                                                    <p className="opacity-80 leading-relaxed break-words">{order.friend_email}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="text-right min-w-[120px]">
                                        <div className="text-3xl font-regal font-black mb-1">${order.amount}</div>
                                        <p className="text-[10px] opacity-40 uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
