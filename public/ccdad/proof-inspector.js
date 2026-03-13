class ProofInspector extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;border-right:1px solid #2e344d;} pre{background:#000;padding:8px;font-size:11px;overflow:auto;height:100px;}</style>
    <h2>§6.5 Proof Inspector (Z3)</h2><input id="seq" type="number" value="1"><button id="go">Load</button><pre id="out"></pre>`;
  }
  connectedCallback() {
    this.shadowRoot.getElementById('go').onclick = async () => {
      const s = this.shadowRoot.getElementById('seq').value;
      const res = await fetch("/api/v1/audit/proof/"+s);
      const d = await res.json();
      this.shadowRoot.getElementById('out').textContent = JSON.stringify(d,null,2);
    };
  }
}
customElements.define('proof-inspector', ProofInspector);
