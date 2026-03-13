class DeterminismMatrix extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;border-bottom:1px solid #2e344d;} pre{background:#151823;padding:10px;color:#9cdcfe;}</style>
    <h2>§6.8 Cross-Region Determinism Matrix</h2><pre id="out">Matrix Data...</pre>`;
  }
  connectedCallback() { this.load(); }
  async load() {
    try {
      const res = await fetch("/api/v1/audit/determinism");
      const d = await res.json();
      this.shadowRoot.getElementById('out').textContent = JSON.stringify(d,null,2);
    } catch(e) {}
  }
}
customElements.define('determinism-matrix', DeterminismMatrix);
