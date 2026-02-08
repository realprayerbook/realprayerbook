
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
  const [isResetMode, setIsResetMode] = useState(window.location.hash.startsWith('#reset-password'));
  const isAdminSubdomain = typeof window !== 'undefined' && window.location.hostname.startsWith('admin.');
  const isAdminView = window.location.hash.startsWith('#admin') || isAdminSubdomain;
  const [useMagicLink, setUseMagicLink] = useState(isAdminView); // Default to true for Admins

  React.useEffect(() => {
    console.log('Auth Component Mounted. isAdminView:', isAdminView);
    if (isAdminView) setUseMagicLink(true);
  }, [isAdminView]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (useMagicLink) {
        const ADMIN_EMAILS = ['louisenlp@gmail.com', 'mike@dynamicmike.com'];
        if (isAdminView && !ADMIN_EMAILS.includes(email.toLowerCase().trim())) {
          throw new Error('Access Denied: This email is not on the authorized list.');
        }

        const { error } = await supabase.auth.signInWithOtp({
          email: email.toLowerCase().trim(),
          options: {
            // Ensure we redirect to the correct section based on the current view
            emailRedirectTo: window.location.origin + (isAdminView ? '/#admin' : '/#dashboard'),
          },
        });
        if (error) throw error;
        alert('Secure magic link sent! Please check your email inbox to log in.');
      } else if (isLogin) {
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
        alert('Registration successful! If email confirmation is enabled, please check your inbox to set your password.');
        const { data } = await supabase.auth.getSession();
        if (data.session) onLogin();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      alert('Password updated successfully! You are now logged in.');
      onLogin();
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
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/#reset-password'
    });
    setLoading(false);
    if (error) setError(error.message);
    else alert('Password reset link sent to ' + email + '. Clicking the link will return you here to set your new password.');
  };

  return (
    <div className={`min-h-screen ${isAdminView ? 'bg-black' : 'bg-brand-obsidian'} flex items-center justify-center p-6 bg-[url('/assets/noise.png')] opacity-100 transition-colors duration-1000`}>
      <div className={`max-w-md w-full glass-card p-10 rounded-[2.5rem] border ${isAdminView ? 'border-brand-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.1)]' : 'border-white/20 shadow-2xl'} relative overflow-hidden transition-all duration-1000`}>
        <div className="absolute top-0 right-0 p-10 opacity-20 pointer-events-none">
             <span className={`material-symbols-outlined text-9xl ${isAdminView ? 'text-white/20' : 'text-brand-gold'}`}>spa</span>
        </div>

        <div className="relative z-10">
          {isAdminView && (
            <div className="flex justify-center mb-6">
               <div className="px-4 py-1 rounded-full border border-brand-gold/30 bg-brand-gold/10 text-brand-gold text-[10px] font-black uppercase tracking-[0.4em]">
                 Restricted Access
               </div>
            </div>
          )}
          <h2 className={`text-4xl font-regal text-center mb-2 italic font-black ${isAdminView ? 'text-white' : 'text-brand-gold'}`}>
            {isResetMode ? 'Set Password' : (isAdminView ? 'Admin Command' : (isLogin ? 'Member Login' : 'Join the Tribe'))}
          </h2>
          <p className="text-center text-white/50 mb-10 text-sm leading-relaxed">
            {isResetMode 
              ? "Establish your new connection password."
              : (isAdminView 
                  ? "Accessing the main override. Sign in with a secure one-time link."
                  : (isLogin 
                      ? "Log in with the email address you used for your Stripe purchase." 
                      : "Set your password to access the divine archives."))}
          </p>
        </div>
        
        {error && <div className="bg-red-500/20 text-red-200 p-4 rounded-xl mb-6 text-sm text-center border border-red-500/30">{error}</div>}

        <form onSubmit={isResetMode ? handleUpdatePassword : handleAuth} className="space-y-6 relative z-10">
          {!isResetMode && (
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
          )}
          
          {(isResetMode || !useMagicLink) && (
            <div>
               <label className="block text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-2 font-bold">
                 {isResetMode ? "New Password" : "Password"}
               </label>
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-brand-gold outline-none transition-all placeholder:text-white/20"
                 placeholder="••••••••"
                 required
               />
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-gold text-brand-purple py-4 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg hover:shadow-brand-gold/20"
          >
            {loading ? 'Processing...' : (isResetMode ? 'Update Password' : (useMagicLink ? 'Send Secure Link' : (isLogin ? 'Enter Portal' : 'Create Account')))}
          </button>
          
          {!isResetMode && (
            <button 
              type="button"
              onClick={() => setUseMagicLink(!useMagicLink)}
              className="w-full text-white/40 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors py-2"
            >
              {useMagicLink ? "Back to Password Login" : "Or Login with Secure Email Link"}
            </button>
          )}

          {isResetMode && (
            <button 
              type="button"
              onClick={() => { setIsResetMode(false); window.location.hash = '#auth'; }}
              className="w-full text-white/40 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors py-2"
            >
              Back to Login
            </button>
          )}
        </form>

        <div className="mt-8 text-center space-y-4 relative z-10">
           {(window.location.href.includes('invite=true') || window.location.href.includes('signup=true')) && !isAdminView && (
             <button onClick={() => setIsLogin(!isLogin)} className="text-white/60 text-xs hover:text-brand-gold transition-colors tracking-wide">
               {isLogin ? "New here? Create an account" : "Already a member? Sign In"}
             </button>
           )}
           
           {isLogin && !useMagicLink && (
             <button onClick={handleResetPassword} className="block w-full text-white/30 text-[10px] hover:text-white uppercase tracking-widest">
               Forgot Password?
             </button>
           )}
           
           <div className="pt-6 border-t border-white/10">
              <p className="text-white/20 text-[10px] uppercase tracking-widest leading-relaxed">
                Paid but can't find your email? <br />
                <a href="/#donate" className="text-brand-gold/50 hover:text-brand-gold transition-colors">Contact Support</a> or check your Stripe receipt.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
