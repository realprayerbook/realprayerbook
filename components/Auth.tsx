
import React, { useState } from 'react';
import { supabase } from '../utils/supabase';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    console.log('Auth Component Mounted. view set to auth.');
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        onLogin();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password
        });
        if (error) throw error;
        alert('Registration successful! If email confirmation is enabled, please check your inbox.');
        // Check if session was created immediately (some setups disable confirm)
        const { data } = await supabase.auth.getSession();
        if (data.session) onLogin();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);
    if (error) setError(error.message);
    else alert('Password reset link sent to ' + email);
  };

  return (
    <div className="min-h-screen bg-brand-obsidian flex items-center justify-center p-6 bg-[url('/assets/noise.png')] opacity-100">
      <div className="max-w-md w-full glass-card p-10 rounded-[2.5rem] border border-white/20 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
             <span className="material-symbols-outlined text-9xl text-brand-gold">spa</span>
        </div>

        <h2 className="text-4xl font-regal text-brand-gold text-center mb-2 italic font-black">
          {isLogin ? 'Member Login' : 'Join the Tribe'}
        </h2>
        <p className="text-center text-white/60 mb-8 text-sm">Access the divine archives and live transmissions.</p>
        
        {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-xl mb-6 text-sm text-center border border-red-500/30">{error}</div>}

        <form onSubmit={handleAuth} className="space-y-6 relative z-10">
          <div>
             <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-2 font-bold">Email Address</label>
             <input 
               type="email" 
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20"
               placeholder="seeker@example.com"
               required
             />
          </div>
          <div>
             <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-2 font-bold">Password</label>
             <input 
               type="password" 
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20"
               placeholder="••••••••"
               required
             />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-gold text-brand-purple py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg hover:shadow-brand-gold/20"
          >
            {loading ? 'Processing...' : (isLogin ? 'Enter Portal' : 'Create Account')}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4 relative z-10">
           {window.location.search.includes('signup=true') && (
             <button onClick={() => setIsLogin(!isLogin)} className="text-white/60 text-xs hover:text-brand-gold transition-colors tracking-wide">
               {isLogin ? "New here? Create an account" : "Already a member? Sign In"}
             </button>
           )}
           
           {isLogin && (
             <button onClick={handleResetPassword} className="block w-full text-white/30 text-[10px] hover:text-white uppercase tracking-widest">
               Forgot Password?
             </button>
           )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
