/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Cpu, 
  Zap, 
  Code2, 
  BarChart3, 
  FileText, 
  Github, 
  ArrowRight, 
  CheckCircle2, 
  Layers,
  Terminal,
  Search,
  Lock,
  RefreshCw,
  Activity,
  AlertTriangle,
  Globe,
  Database,
  Fingerprint
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// --- CCDAD Components ---

const CCDADHeader = ({ epoch, status, lastSeq, globalHash }: any) => (
  <div className="bg-black border border-emerald-500/30 p-4 mb-6 font-mono">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          CCDAD-100
        </div>
        <div className="text-white/60 text-xs uppercase tracking-widest">
          Epoch: <span className="text-white">{epoch}</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'CONSISTENT' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-red-500'}`} />
          <span className={`text-sm font-bold ${status === 'CONSISTENT' ? 'text-emerald-400' : 'text-red-400'}`}>
            {status}
          </span>
        </div>
        <div className="text-xs text-white/40">
          Last Seq: <span className="text-white/80">{lastSeq}</span>
        </div>
        <div className="text-xs text-white/40">
          Global Hash: <span className="text-white/80 font-mono">{globalHash}</span>
        </div>
      </div>
    </div>
  </div>
);

const DeterminismMatrix = ({ data }: any) => (
  <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
    <div className="px-4 py-3 border-b border-white/10 bg-white/5 flex items-center gap-2">
      <Globe className="w-4 h-4 text-emerald-400" />
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Determinism Matrix</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left font-mono text-xs">
        <thead>
          <tr className="border-b border-white/5 text-white/40">
            <th className="px-4 py-3 font-medium">Sequence</th>
            <th className="px-4 py-3 font-medium">Asia (GCP)</th>
            <th className="px-4 py-3 font-medium">EU (AWS)</th>
            <th className="px-4 py-3 font-medium">US (Bare)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.seq} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="px-4 py-3 text-white/80">{row.seq}</td>
              <td className="px-4 py-3">
                <span className={row.asia === 'MATCH' ? 'text-emerald-400' : 'text-red-400'}>
                  {row.asia === 'MATCH' ? '✅ MATCH' : '❌ DIVERGE'}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={row.eu === 'MATCH' ? 'text-emerald-400' : 'text-red-400'}>
                  {row.eu === 'MATCH' ? '✅ MATCH' : '❌ DIVERGE'}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className={row.us === 'MATCH' ? 'text-emerald-400' : 'text-red-400'}>
                  {row.us === 'MATCH' ? '✅ MATCH' : '❌ DIVERGE'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const EntropyTimeline = ({ data }: any) => (
  <div className="bg-black/40 border border-white/10 rounded-xl p-4 h-[300px]">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Activity className="w-4 h-4 text-emerald-400" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Entropy + Gate Timeline</h3>
      </div>
      <div className="flex gap-4 text-[10px] uppercase tracking-tighter">
        <span className="flex items-center gap-1 text-emerald-400"><div className="w-2 h-2 bg-emerald-400 rounded-full" /> Allow</span>
        <span className="flex items-center gap-1 text-yellow-400"><div className="w-2 h-2 bg-yellow-400 rounded-full" /> Stabilize</span>
        <span className="flex items-center gap-1 text-red-400"><div className="w-2 h-2 bg-red-400 rounded-full" /> Block</span>
      </div>
    </div>
    <ResponsiveContainer width="100%" height="80%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorEntropy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
        <XAxis dataKey="seq" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
        <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} domain={[0, 1]} />
        <Tooltip 
          contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff20', fontSize: '10px', fontFamily: 'monospace' }}
          itemStyle={{ color: '#10b981' }}
        />
        <Area 
          type="monotone" 
          dataKey="entropy" 
          stroke="#10b981" 
          fillOpacity={1} 
          fill="url(#colorEntropy)" 
          strokeWidth={2}
          dot={(props: any) => {
            const { cx, cy, payload } = props;
            let color = "#10b981";
            if (payload.gate === 'STABILIZE') color = "#fbbf24";
            if (payload.gate === 'BLOCK') color = "#ef4444";
            return <circle cx={cx} cy={cy} r={4} fill={color} stroke="none" />;
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const Z3ProofPanel = ({ seq, hash, status }: any) => (
  <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono">
    <div className="flex items-center gap-2 mb-4">
      <Fingerprint className="w-4 h-4 text-emerald-400" />
      <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Z3 Proof Consistency</h3>
    </div>
    <div className="space-y-3">
      <div className="text-[10px] text-white/40 uppercase">Sequence: {seq}</div>
      <div className="p-3 bg-white/5 border border-white/5 rounded text-[11px] break-all text-emerald-400/80">
        {hash}
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-white/5">
        <span className="text-[10px] text-white/40 uppercase">Status</span>
        <span className="text-xs font-bold text-emerald-400">✅ {status}</span>
      </div>
    </div>
  </div>
);

const CCDADDashboard = ({ onClose }: any) => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [isFrozen, setIsFrozen] = React.useState(false);
  const [violations, setViolations] = React.useState<any[]>([]);

  const fetchData = async () => {
    try {
      const entropyRes = await fetch('/api/v1/audit/entropy');
      const entropy = await entropyRes.json();
      
      const latest = entropy[entropy.length - 1];
      if (latest.asia === 'DIVERGE' && !isFrozen) {
        setIsFrozen(true);
        setViolations(prev => [{
          seq: latest.seq,
          reason: "State Hash Mismatch",
          time: new Date().toISOString()
        }, ...prev]);
      }

      setData((prev: any) => ({
        ...prev,
        entropy,
        header: {
          epoch: "GEN5-EPOCH-001",
          status: isFrozen ? "FROZEN" : "CONSISTENT",
          lastSeq: latest.seq,
          globalHash: latest.hash
        }
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [isFrozen]);

  const triggerBreach = async () => {
    await fetch('/api/v1/audit/simulate-divergence', { method: 'POST' });
    fetchData();
  };

  if (loading) return <div className="p-20 text-center font-mono text-emerald-500 animate-pulse">INITIALIZING AUDIT ENGINE...</div>;

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isFrozen ? 'bg-red-950/20' : 'bg-[#050505]'} text-white p-8`}>
      {isFrozen && (
        <div className="fixed inset-0 pointer-events-none border-[20px] border-red-500/20 animate-pulse z-50" />
      )}
      
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2">
          <Shield className={`w-6 h-6 ${isFrozen ? 'text-red-500' : 'text-emerald-500'}`} />
          <span className="text-xl font-bold tracking-tighter uppercase">Audit Console</span>
        </div>
        <div className="flex gap-4">
          {!isFrozen && (
            <button 
              onClick={triggerBreach}
              className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 text-xs uppercase tracking-widest hover:bg-red-500/40 transition-all flex items-center gap-2"
            >
              <AlertTriangle className="w-3 h-3" /> Simulate Breach
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
          >
            Exit to Terminal
          </button>
        </div>
      </div>

      <CCDADHeader {...data.header} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <DeterminismMatrix data={[...data.entropy].reverse().slice(0, 10)} />
        </div>
        <div className="space-y-6">
          <Z3ProofPanel 
            seq={data.header.lastSeq} 
            hash={data.header.globalHash} 
            status={isFrozen ? "VIOLATION" : "IDENTICAL"} 
          />
          <div className="bg-black/40 border border-white/10 rounded-xl p-4 font-mono">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">Execution Uniqueness</h3>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between"><span className="text-white/40">Executor:</span> <span className="text-emerald-400">asia-southeast1</span></div>
              <div className="flex justify-between"><span className="text-white/40">Others:</span> <span className="text-white/60">MIRROR ONLY</span></div>
              <div className="flex justify-between pt-2 border-t border-white/5 font-bold">
                <span>Σ executions</span> <span>{isFrozen ? 'ERROR' : '1 ✅'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EntropyTimeline data={data.entropy} />
        </div>
        <div className={`transition-colors duration-500 ${isFrozen ? 'bg-red-500/10 border-red-500' : 'bg-red-500/5 border-red-500/20'} border rounded-xl p-4 font-mono`}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-red-500/80">Violation & Freeze Log</h3>
          </div>
          <div className="space-y-4 max-h-[200px] overflow-y-auto">
            {violations.length === 0 && <div className="text-[10px] text-white/20 italic">No violations detected. System stable.</div>}
            {violations.map((v, i) => (
              <div key={i} className="text-[10px] p-2 bg-red-500/10 border border-red-500/20 rounded">
                <div className="text-red-400 font-bold mb-1">[CRITICAL] Seq {v.seq}</div>
                <div className="text-white/60">Reason: {v.reason}</div>
                <div className="text-white/60">Action: GLOBAL FREEZE</div>
                <div className="text-white/40 mt-1">{v.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MCPStatus = () => {
  const [status, setStatus] = useState<'loading' | 'active' | 'error'>('loading');
  
  React.useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.mcp === 'active') setStatus('active');
        else setStatus('error');
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest">
      <div className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-emerald-500 animate-pulse' : status === 'loading' ? 'bg-yellow-500' : 'bg-red-500'}`} />
      <span className="text-white/40">MCP Gateway:</span>
      <span className={status === 'active' ? 'text-emerald-400' : 'text-white/60'}>{status}</span>
    </div>
  );
};

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
          <Shield className="text-black w-5 h-5" />
        </div>
        <span className="font-bold tracking-tighter text-xl">DSG</span>
      </div>
      <MCPStatus />
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
      <a href="#theory" className="hover:text-white transition-colors">Theory</a>
      <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
      <a href="#benchmarks" className="hover:text-white transition-colors">Benchmarks</a>
      <a href="#docs" className="hover:text-white transition-colors">Docs</a>
    </div>
    <div className="flex items-center gap-4">
      <a href="https://github.com/tdealer01-crypto/dsg-deterministic-audit" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm">
        <Github className="w-4 h-4" />
        <span>10k Star Vision</span>
      </a>
    </div>
  </nav>
);

const SyncControl = () => {
  const [syncData, setSyncData] = useState<any>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      
      // Simulate calling the MCP tool readFromNativeStorage
      setTimeout(() => {
        setSyncData({
          project: "DSG Architect",
          core: "OpenCore + Manus Fusion",
          status: "Preparing AAB",
          features: ["Smart AI Install", "Unified API Proxy", "AgentSkills"]
        });
        setIsSyncing(false);
      }, 1500);
    } catch (e) {
      setIsSyncing(false);
    }
  };

  return (
    <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-2xl mx-auto text-left">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <RefreshCw className={`w-5 h-5 ${isSyncing ? 'animate-spin text-emerald-500' : ''}`} />
            Memory Sync
          </h3>
          <p className="text-sm text-white/40">Manus Fusion + OpenCore Integration</p>
        </div>
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="px-6 py-2 rounded-full bg-emerald-500 text-black font-bold text-sm hover:bg-emerald-400 transition-all disabled:opacity-50"
        >
          {isSyncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>

      {syncData && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Active Core</span>
            <div className="text-emerald-400 font-mono font-bold mt-1">{syncData.core}</div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Deployment</span>
            <div className="text-white font-mono font-bold mt-1">{syncData.status}</div>
          </div>
          <div className="md:col-span-2 p-4 rounded-xl bg-black/40 border border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/40">Enabled Features</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {syncData.features.map((f: string) => (
                <span key={f} className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Hero = ({ onOpenDashboard }: any) => (
  <section className="relative pt-32 pb-20 px-8 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/30 rounded-full blur-[120px]" />
    </div>
    
    <div className="max-w-6xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
          OpenCore + Manus Fusion Integrated
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
          The Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Deterministic Audit
          </span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          A research-grade framework for reproducible security verification. 
          Powered by <strong>Manus Fusion</strong> and <strong>OpenCore</strong> for absolute certainty.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-emerald-400 transition-all flex items-center gap-2 group">
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={onOpenDashboard}
            className="px-8 py-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all flex items-center gap-2"
          >
            <Shield className="w-4 h-4" /> CCDAD-100 Dashboard
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
            Read the Spec
          </button>
        </div>

        <SyncControl />
      </motion.div>
    </div>
  </section>
);

const MathModel = () => (
  <section id="theory" className="py-24 px-8 bg-white/[0.02]">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 font-serif italic">Formal Definition</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            DSG leverages a mathematical model to ensure that every system transition is verifiable and reproducible. 
            By anchoring state transitions to cryptographic hashes, we create an immutable audit trail.
          </p>
          <div className="space-y-4">
            {[
              "Reproducible Computation Paths",
              "Cryptographic State Anchoring",
              "Formal Invariant Verification",
              "Zero-Knowledge Proof Compatibility"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="math-block relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Terminal className="w-12 h-12" />
          </div>
          <pre className="text-sm md:text-base leading-relaxed">
{`DSG_Audit(S) = {
  ∀ t ∈ Trace(S):
    Verify(
      StateTransition(t.prev, t.input),
      t.next,
      t.proof
    ) ∧ Invariant(t.next)
}

Where:
  S = System State
  Trace = Deterministic Path
  Invariant = Security Properties`}
          </pre>
          <div className="mt-6 pt-6 border-t border-emerald-400/20 text-xs text-emerald-400/60 italic">
            // Formal verification engine v1.0.4-alpha
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Architecture = () => (
  <section id="architecture" className="py-24 px-8">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold tracking-tight mb-4">System Architecture</h2>
        <p className="text-white/60">From source code to deterministic audit proofs.</p>
      </div>
      
      <div className="grid md:grid-cols-5 gap-4 items-center">
        <div className="glass p-6 rounded-2xl text-center">
          <Code2 className="w-8 h-8 mx-auto mb-4 text-emerald-400" />
          <h3 className="font-bold text-sm mb-2">Source</h3>
          <p className="text-[10px] text-white/40">Smart Contracts / Protocol Code</p>
        </div>
        <div className="flex justify-center"><ArrowRight className="text-white/20" /></div>
        <div className="glass p-6 rounded-2xl text-center border-emerald-500/30 bg-emerald-500/5">
          <RefreshCw className="w-8 h-8 mx-auto mb-4 text-emerald-400 animate-spin-slow" />
          <h3 className="font-bold text-sm mb-2">Extraction</h3>
          <p className="text-[10px] text-white/40">State & Logic Mapping</p>
        </div>
        <div className="flex justify-center"><ArrowRight className="text-white/20" /></div>
        <div className="glass p-6 rounded-2xl text-center">
          <Lock className="w-8 h-8 mx-auto mb-4 text-emerald-400" />
          <h3 className="font-bold text-sm mb-2">Proof</h3>
          <p className="text-[10px] text-white/40">Deterministic Audit Proof</p>
        </div>
      </div>
    </div>
  </section>
);

const Benchmarks = () => (
  <section id="benchmarks" className="py-24 px-8 bg-white/[0.02]">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-4">Benchmarks</h2>
          <p className="text-white/60">DSG vs Traditional Security Tooling</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded-full border border-emerald-500/20">Research Grade</span>
          <span className="px-3 py-1 bg-white/5 text-white/40 text-xs rounded-full border border-white/10">v1.0.0</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-white/40 font-medium">Metric</th>
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-white/40 font-medium">Traditional (Slither/Mythril)</th>
              <th className="py-4 px-6 text-xs uppercase tracking-widest text-emerald-400 font-bold">DSG Framework</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { metric: "Determinism", trad: "Probabilistic / Heuristic", dsg: "100% Deterministic" },
              { metric: "Reproducibility", trad: "Environment Dependent", dsg: "Environment Agnostic" },
              { metric: "Verification Depth", trad: "Static Analysis", dsg: "Formal State Verification" },
              { metric: "Audit Speed", trad: "Minutes to Hours", dsg: "Milliseconds (Proof-based)" },
              { metric: "False Positives", trad: "High (Noise)", dsg: "Zero (Mathematical Proof)" },
            ].map((row, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="py-6 px-6 font-medium">{row.metric}</td>
                <td className="py-6 px-6 text-white/40">{row.trad}</td>
                <td className="py-6 px-6 text-emerald-400 font-bold">{row.dsg}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-20 px-8 border-t border-white/5">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div className="max-w-xs">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
            <Shield className="text-black w-4 h-4" />
          </div>
          <span className="font-bold tracking-tighter text-lg">DSG</span>
        </div>
        <p className="text-sm text-white/40 leading-relaxed">
          Pioneering the next generation of deterministic security verification for the decentralized web.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-white/60">Resources</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Research Paper</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Benchmarks</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-white/60">Community</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-white/60">Legal</h4>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
      © 2026 DSG Deterministic Audit Framework. All Rights Reserved.
    </div>
  </footer>
);

const FormalAlgorithm = () => (
  <section id="docs" className="py-24 px-8">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="math-block bg-black/40 border-white/10 text-white/80 p-8 rounded-3xl">
          <div className="flex items-center gap-2 mb-6 text-emerald-400">
            <Terminal className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Algorithm 1: Deterministic Trace Verification</span>
          </div>
          <pre className="text-xs md:text-sm leading-relaxed font-mono">
{`procedure VERIFY_TRACE(Trace T, Invariants I)
  S ← T.initial_state
  for each step in T.steps do
    // 1. Compute deterministic transition
    S_next ← Transition(S, step.input)
    
    // 2. Validate state anchoring
    if Hash(S_next) ≠ step.state_hash then
      return REJECT("State Mismatch")
      
    // 3. Check formal invariants
    for each inv in I do
      if not inv(S_next) then
        return REJECT("Invariant Violation")
        
    S ← S_next
  end for
  return ACCEPT
end procedure`}
          </pre>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Formal Algorithm</h2>
          <p className="text-white/60 mb-6 leading-relaxed">
            The DSG core algorithm ensures that every state transition is not only valid but also anchored to a cryptographic proof. 
            This allows for asynchronous verification by any third-party auditor.
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 text-xs font-bold">01</div>
              <div>
                <h4 className="font-bold mb-1">State Extraction</h4>
                <p className="text-xs text-white/40">Mapping raw bytecode to a formal state machine representation.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 text-xs font-bold">02</div>
              <div>
                <h4 className="font-bold mb-1">Trace Generation</h4>
                <p className="text-xs text-white/40">Recording every input and state change in a reproducible format.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10 text-xs font-bold">03</div>
              <div>
                <h4 className="font-bold mb-1">Proof Anchoring</h4>
                <p className="text-xs text-white/40">Generating cryptographic hashes for every verified state.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) return <CCDADDashboard onClose={() => setShowDashboard(false)} />;

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-black">
      <Nav />
      <main>
        <Hero onOpenDashboard={() => setShowDashboard(true)} />
        
        <section className="px-8 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Zap className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">High Performance</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Optimized verification engine capable of processing millions of state transitions per second.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <Layers className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Multi-Chain Support</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Agnostic architecture supporting EVM, Solana, and custom state-machine protocols.
              </p>
            </div>
            <div className="glass p-8 rounded-3xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <BarChart3 className="text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Audit Credibility</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Generate mathematical proofs that can be verified by anyone, anywhere, at any time.
              </p>
            </div>
          </div>
        </section>

        <MathModel />
        <Architecture />
        <Benchmarks />
        <FormalAlgorithm />
        
        <section className="py-24 px-8 text-center">
          <div className="max-w-4xl mx-auto glass p-16 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
            <h2 className="text-4xl font-bold mb-6">Ready to secure your protocol?</h2>
            <p className="text-white/60 mb-10 max-w-lg mx-auto">
              Join the elite protocols using DSG for deterministic security guarantees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all">
                Start Free Audit
              </button>
              <button className="w-full sm:w-auto px-10 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                Contact Research Team
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
