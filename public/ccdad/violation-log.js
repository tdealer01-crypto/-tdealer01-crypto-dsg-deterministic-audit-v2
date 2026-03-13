class ViolationLog extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;border-right:1px solid #2e344d;} pre{color:#ffc107;background:#000;padding:10px;height:100px;overflow:auto;}</style>
    <h2>§10 Violations Log</h2><pre id="out">No violations.</pre>`;
  }
  connectedCallback() { this.load(); }
  async load() {
    try {
      const res = await fetch("/api/v1/audit/violations");
      const d = await res.json();
      this.shadowRoot.getElementById('out').textContent = d.length ? JSON.stringify(d,null,2) : "System Clean";
    } catch(e) {}
  }
}
customElements.define('violation-log', ViolationLog);
