
import React, { useEffect, useState } from 'react';
import { getPosts } from '../utils/db';

interface Post {
    id: string;
    title: string;
    content: string;
    video_url?: string;
    created_at: string;
}

const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    // Regular YouTube URL (watch?v=...)
    let videoId = '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        videoId = match[2];
    } else {
        // Fallback or non-youtube
        return url;
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
};

const CommunityFeed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await getPosts();
            if (data) setPosts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-white text-center py-20 animate-pulse">Loading wisdom code...</div>;

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 space-y-12 animate-in fade-in duration-700">
            <div className="text-center mb-16">
                <span className="text-brand-gold text-xs font-black tracking-[0.6em] uppercase mb-4 block">Exclusive Content</span>
                <h2 className="text-5xl font-regal text-white font-black italic">Live Transmissions</h2>
            </div>
            
            {posts.length === 0 && (
                <div className="text-center bg-white/5 p-12 rounded-[3rem] border border-white/10">
                    <span className="material-symbols-outlined text-4xl text-white/20 mb-4">satellite_alt</span>
                    <p className="text-white/50 italic">No transmissions available yet. Stay tuned.</p>
                </div>
            )}

            {posts.map(post => (
                <div key={post.id} className="glass-card p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl mb-12 transform hover:scale-[1.01] transition-all duration-500">
                    <h3 className="text-3xl text-white font-regal font-black italic mb-6">{post.title}</h3>
                    
                    {post.video_url && (
                        <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-8 shadow-2xl border border-white/10">
                            <iframe 
                                src={getYoutubeEmbedUrl(post.video_url)} 
                                className="w-full h-full" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    
                    <div className="text-white/80 leading-loose text-lg font-light whitespace-pre-wrap">{post.content}</div>
                    
                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-xs text-brand-gold/60 uppercase tracking-widest font-bold">
                        <span>Dr Louise VDV</span>
                        <span>{new Date(post.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommunityFeed;
