class GateDecisionView extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;background:#151823;} h2{font-size:16px;color:#9cdcfe;margin:0 0 8px;} .ALLOW{color:#4caf50;} .BLOCK{color:#f44336;}</style>
    <h2>§6.4 Gate Decision (Σ)</h2><div id="list">Waiting...</div>`;
  }
  connectedCallback() { this.load(); }
  async load() {
    try {
      const res = await fetch("/api/v1/audit/gate/recent");
      const d = await res.json();
      this.shadowRoot.getElementById('list').innerHTML = d.map(x=>`<div>Seq ${x.seq}: <b class="${x.decision}">${x.decision}</b></div>`).join('');
    } catch(e) {}
  }
}
customElements.define('gate-decision-view', GateDecisionView);
