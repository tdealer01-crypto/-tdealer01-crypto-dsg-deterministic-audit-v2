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
  RefreshCw
} from 'lucide-react';

const Nav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/50 backdrop-blur-md border-b border-white/5">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center">
        <Shield className="text-black w-5 h-5" />
      </div>
      <span className="font-bold tracking-tighter text-xl">DSG</span>
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

const Hero = () => (
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
          Deterministic Security Guarantees
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-none">
          The Future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Deterministic Audit
          </span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          A research-grade framework for reproducible security verification. 
          Move beyond human-only audits to cryptographic, deterministic proofs of system integrity.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-emerald-400 transition-all flex items-center gap-2 group">
            Get Started <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">
            Read the Spec
          </button>
        </div>
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
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-black">
      <Nav />
      <main>
        <Hero />
        
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
