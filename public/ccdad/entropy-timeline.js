class EntropyTimeline extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;border-bottom:1px solid #2e344d;} h2{font-size:16px;color:#9cdcfe;} table{width:100%;border-collapse:collapse;} td,th{border:1px solid #2e344d;padding:4px;text-align:left;}</style>
    <h2>§6.3 Entropy Timeline (He = Hp + Dn + Oa)</h2><table><thead><tr><th>Seq</th><th>Entropy</th><th>Gate</th></tr></thead><tbody id="tb"></tbody></table>`;
  }
  connectedCallback() { this.load(); }
  async load() {
    try {
      const res = await fetch("/api/v1/audit/entropy");
      const data = await res.json();
      this.shadowRoot.getElementById('tb').innerHTML = data.map(r=>`<tr><td>${r.seq}</td><td>${r.entropy}</td><td>${r.gate}</td></tr>`).join('');
    } catch(e) {}
  }
}
customElements.define('entropy-timeline', EntropyTimeline);
