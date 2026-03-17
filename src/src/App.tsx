import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, Trophy, Swords, Shield, Zap, Target, Axe, Crown, Info, ExternalLink, Activity, BarChart3, Clock } from 'lucide-react';
import { CATEGORIES, MOCK_PLAYERS } from './constants';
import { Player, Tier } from './types';

const TIER_COLORS: Record<Tier, string> = {
  'S+': 'text-red-500 border-red-500/50 bg-red-500/10',
  'S': 'text-yellow-500 border-yellow-500/50 bg-yellow-500/10',
  'A': 'text-purple-500 border-purple-500/50 bg-purple-500/10',
  'B': 'text-blue-500 border-blue-500/50 bg-blue-500/10',
  'C': 'text-green-500 border-green-500/50 bg-green-500/10',
  'D': 'text-gray-400 border-gray-400/50 bg-gray-400/10',
  'E': 'text-gray-600 border-gray-600/50 bg-gray-600/10',
};

const CATEGORY_ICONS: Record<string, any> = {
  overall: Trophy,
  ltm: Zap,
  vanilla: Shield,
  uhc: Target,
  pot: Swords,
  nethop: Crown,
  smp: Activity,
  sword: Swords,
  axe: Axe,
  mace: Swords,
};

function PlayerModal({ player, onClose }: { player: Player; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-[#141414] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-40 bg-gradient-to-br from-red-600/20 to-purple-600/20">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-12 left-8 flex items-end gap-6">
            <div className="relative">
              <img src={`https://mc-heads.net/body/${player.uuid}/128`} alt={player.name} className="w-32 h-32 object-contain drop-shadow-2xl" referrerPolicy="no-referrer" />
            </div>
            <div className="mb-4">
              <h2 className="text-4xl font-black tracking-tighter text-white">{player.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-black px-3 py-1 rounded-full border ${TIER_COLORS[player.tier]}`}>TIER {player.tier}</span>
                <span className="text-sm text-gray-400 font-bold">RANK #{player.rank}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8 pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-gray-500 mb-1"><BarChart3 className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Win Rate</span></div>
            <div className="text-2xl font-black text-white">{player.winRate}%</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-gray-500 mb-1"><Swords className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Total Matches</span></div>
            <div className="text-2xl font-black text-white">{player.matches}</div>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 text-gray-500 mb-1"><Clock className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest">Last Active</span></div>
            <div className="text-2xl font-black text-white">{player.lastActive}</div>
          </div>
        </div>
        <div className="px-8 pb-8">
          <div className="bg-white/5 rounded-2xl border border-white/5 p-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><Activity className="w-4 h-4" /> Recent Performance</h4>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center"><Trophy className="w-4 h-4 text-green-500" /></div>
                    <div><div className="text-sm font-bold">Victory vs. Opponent_{i}</div><div className="text-[10px] text-gray-500 font-medium">Ranked Match • 2h ago</div></div>
                  </div>
                  <div className="text-sm font-black text-green-500">+24 RP</div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2">
            View Full Statistics <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers = useMemo(() => {
    return MOCK_PLAYERS.filter(player => player.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-red-500/30">
      <AnimatePresence>{selectedPlayer && <PlayerModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}</AnimatePresence>
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2"><div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center"><Swords className="w-5 h-5 text-white" /></div><span className="font-bold text-xl tracking-tighter">MCTIERS</span></div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">{isSidebarOpen ? <X /> : <Menu />}</button>
      </header>
      <div className="flex">
        <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 border-r border-white/5 bg-[#0d0d0d] z-40 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-6 hidden lg:flex items-center gap-3 mb-4"><div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20"><Swords className="w-6 h-6 text-white" /></div><span className="font-black text-2xl tracking-tighter">MCTIERS</span></div>
          <nav className="px-3 space-y-1 overflow-y-auto h-[calc(100vh-100px)]">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">Game Modes</div>
            {CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] || Info;
              const isActive = activeCategory === cat.id;
              return (
                <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${isActive ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-red-500'}`} />
                  <span className="font-medium">{cat.name}</span>
                  {isActive && <motion.div layoutId="active-nav" className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 min-w-0 bg-[#0a0a0a]">
          <div className="p-6 lg:p-10 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl sticky top-0 lg:top-0 z-30">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2"><h1 className="text-4xl font-black tracking-tight flex items-center gap-3">{CATEGORIES.find(c => c.id === activeCategory)?.name}</h1><span className="text-sm font-normal text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/10">Rankings</span></div>
                <div className="flex items-center gap-4"><p className="text-gray-500 font-medium">The official {activeCategory} tier list for competitive Minecraft.</p></div>
              </div>
              <div className="relative group"><Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-red-500 transition-colors" /><input type="text" placeholder="Search players..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-80 bg-[#141414] border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-gray-600 font-medium" /></div>
            </div>
          </div>
          <div className="p-6 lg:p-10 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredPlayers.map((player, index) => (
                  <motion.div key={player.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2, delay: index * 0.05 }} onClick={() => setSelectedPlayer(player)} className="group relative bg-[#141414] border border-white/5 rounded-2xl p-5 hover:border-red-500/30 hover:bg-[#1a1a1a] transition-all cursor-pointer overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="relative">
                        <img src={`https://mc-heads.net/avatar/${player.uuid}/64`} alt={player.name} className="w-16 h-16 rounded-xl shadow-xl bg-[#0a0a0a] border border-white/10" referrerPolicy="no-referrer" />
                        <div className="absolute -top-2 -left-2 w-7 h-7 bg-[#0a0a0a] border border-white/10 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">#{player.rank}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold tracking-tight group-hover:text-red-500 transition-colors">{player.name}</h3>
                        <div className="flex items-center gap-2 mt-1"><span className={`text-[10px] font-black px-2 py-0.5 rounded border ${TIER_COLORS[player.tier]}`}>{player.tier}</span><span className="text-xs text-gray-500 font-medium">{player.winRate}% Win Rate</span></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
        }
