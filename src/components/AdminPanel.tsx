import { useState, useEffect } from 'react';
import { collection, doc, getDoc, setDoc, onSnapshot, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db, signInWithGoogle, logout } from '../lib/firebase';
import { useAdmin } from '../hooks/useAdmin';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus, Trash2, LogOut, Settings, Image as ImageIcon, Video } from 'lucide-react';

export default function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { user, isAdmin, loading: authLoading } = useAdmin();
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [hlsPrimary, setHlsPrimary] = useState('');
  const [hlsBackup, setHlsBackup] = useState('');
  const [saving, setSaving] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [newAd, setNewAd] = useState({ imageUrl: '', link: '', position: 'header' });

  useEffect(() => {
    if (!isAdmin) return;

    // Fetch setting
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'broadcast');
      const docSnap = await getDoc(docRef);
      const config = (window as any).__GOALSTREAM_CONFIG__;
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVideoUrl(data.broadcastUrl || '');
        setVideoTitle(data.broadcastTitle || '');
        setHlsPrimary(data.hlsPrimary || config?.hls_primary || '');
        setHlsBackup(data.hlsBackup || config?.hls_backup || '');
      } else {
        setHlsPrimary(config?.hls_primary || '');
        setHlsBackup(config?.hls_backup || '');
      }
    };
    fetchSettings();

    // Listen to ads
    const unsub = onSnapshot(collection(db, 'ads'), (snap) => {
      setAds(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, [isAdmin]);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      await setDoc(doc(db, 'settings', 'broadcast'), {
        broadcastUrl: videoUrl,
        broadcastTitle: videoTitle,
        hlsPrimary,
        hlsBackup,
        updatedAt: serverTimestamp()
      });
      alert('Settings saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAd = async () => {
    if (!newAd.imageUrl) return;
    try {
      const id = Date.now().toString();
      await setDoc(doc(db, 'ads', id), {
        ...newAd,
        isActive: true,
        createdAt: serverTimestamp()
      });
      setNewAd({ imageUrl: '', link: '', position: 'header' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAd = async (id: string) => {
    if (confirm('Delete this ad?')) {
      await deleteDoc(doc(db, 'ads', id));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 rounded-3xl border border-neutral-800 shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
           <div className="flex items-center gap-3">
              <Settings className="text-brand-green" />
              <h2 className="text-xl font-black uppercase tracking-tighter">Admin Control Center</h2>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-neutral-800 rounded-full transition-colors">
              <X />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-12">
          {!user ? (
            <div className="text-center py-20">
               <h3 className="text-2xl font-black mb-6">LOGIN REQUIRED</h3>
               <button 
                 onClick={signInWithGoogle}
                 className="px-8 py-4 bg-white text-black font-black uppercase rounded-full hover:bg-brand-green transition-colors"
               >
                 Sign in with Google
               </button>
            </div>
          ) : !isAdmin ? (
            <div className="text-center py-20">
               <h3 className="text-2xl font-black text-red-600 mb-2">ACCESS DENIED</h3>
               <p className="text-neutral-500 font-bold uppercase tracking-widest text-[10px] mb-6">You are not authorized to view this page</p>
               <button onClick={logout} className="text-white hover:text-red-500 font-black uppercase flex items-center gap-2 mx-auto">
                 <LogOut size={16} /> Logout
               </button>
            </div>
          ) : (
            <>
              {/* Broadcast Settings */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                   <Video size={18} className="text-brand-green" />
                   <h3 className="font-black uppercase tracking-widest text-xs text-neutral-400">Broadcast Configuration</h3>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Video Link (YouTube/FB)</label>
                      <input 
                        type="text" 
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="Paste any YouTube or Facebook video link"
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Video Title</label>
                      <input 
                        type="text" 
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                        placeholder="Live Tournament Stream"
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">HLS Direct Link (Primary)</label>
                      <input 
                        type="text" 
                        value={hlsPrimary}
                        onChange={(e) => setHlsPrimary(e.target.value)}
                        placeholder="https://.../playlist.m3u8"
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-neutral-500">HLS Direct Link (Backup)</label>
                      <input 
                        type="text" 
                        value={hlsBackup}
                        onChange={(e) => setHlsBackup(e.target.value)}
                        placeholder="https://.../playlist.m3u8"
                        className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 text-sm focus:border-brand-green outline-none transition-colors"
                      />
                   </div>
                </div>
                <button 
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-green text-black font-black uppercase rounded-xl hover:bg-white transition-all disabled:opacity-50"
                >
                  <Save size={18} /> {saving ? 'Saving...' : 'Update Broadcast'}
                </button>
              </section>

              <hr className="border-neutral-800" />

              {/* Ad Management */}
              <section className="space-y-6">
                 <div className="flex items-center gap-2 mb-4">
                   <ImageIcon size={18} className="text-brand-green" />
                   <h3 className="font-black uppercase tracking-widest text-xs text-neutral-400">Manage Banners</h3>
                </div>

                <div className="bento-card p-6 bg-black/30 space-y-4">
                   <div className="grid gap-4 md:grid-cols-3">
                      <input 
                        placeholder="Banner Image URL"
                        value={newAd.imageUrl}
                        onChange={e => setNewAd({...newAd, imageUrl: e.target.value})}
                        className="bg-black border border-neutral-800 rounded-xl px-4 py-2 text-sm"
                      />
                      <input 
                        placeholder="Redirect Link"
                        value={newAd.link}
                        onChange={e => setNewAd({...newAd, link: e.target.value})}
                        className="bg-black border border-neutral-800 rounded-xl px-4 py-2 text-sm"
                      />
                      <select 
                        value={newAd.position}
                        onChange={e => setNewAd({...newAd, position: e.target.value})}
                        className="bg-black border border-neutral-800 rounded-xl px-4 py-2 text-sm"
                      >
                         <option value="header">Header</option>
                         <option value="sidebar">Sidebar</option>
                         <option value="footer">Footer</option>
                      </select>
                   </div>
                   <button 
                     onClick={handleAddAd}
                     className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase rounded-xl hover:bg-brand-green transition-all"
                   >
                     <Plus size={18} /> Create Banner
                   </button>
                </div>

                <div className="grid gap-4">
                   {ads.map(ad => (
                     <div key={ad.id} className="flex items-center justify-between p-4 bg-neutral-900 border border-neutral-800 rounded-2xl">
                        <div className="flex items-center gap-4">
                           <img src={ad.imageUrl} alt="" className="w-16 h-10 object-cover rounded-lg bg-black" />
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-brand-green">{ad.position}</p>
                              <p className="text-xs font-bold text-neutral-400 truncate max-w-[200px]">{ad.link}</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteAd(ad.id)}
                          className="p-3 text-neutral-500 hover:text-red-500 transition-colors"
                        >
                           <Trash2 size={18} />
                        </button>
                     </div>
                   ))}
                </div>
              </section>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
