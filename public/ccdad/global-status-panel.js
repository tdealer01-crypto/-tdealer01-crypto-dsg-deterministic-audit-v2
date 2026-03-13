class GlobalStatusPanel extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;border-bottom:1px solid #2e344d;} h2{font-size:16px;margin:0 0 8px;color:#9cdcfe;} .ok{color:#4caf50;} .bad{color:#f44336;}</style>
    <h2>§4 Global System Status (Invariant)</h2><div id="status-view">Loading...</div>`;
  }
  connectedCallback() { this.load(); }
  async load() {
    try {
      const res = await fetch("/api/v1/audit/status");
      const d = await res.json();
      this.shadowRoot.getElementById('status-view').innerHTML = `Epoch: ${d.epoch} | Status: <b class="${d.global_status==="CONSISTENT"?"ok":"bad"}">${d.global_status}</b> | Seq: ${d.latest_sequence}`;
    } catch(e) { this.shadowRoot.getElementById('status-view').innerHTML = "Status Offline"; }
  }
}
customElements.define('global-status-panel', GlobalStatusPanel);
