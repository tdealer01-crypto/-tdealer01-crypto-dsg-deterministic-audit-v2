class PublicProofView extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;background:#0a0c10;} .h{color:#85c46c;font-size:12px;}</style>
    <h2>Public Proof (Immutable Chain)</h2><div id="out"></div>`;
  }
  connectedCallback() { this.load(); }
  async load() {
    try {
      const res = await fetch("/api/v1/public/proof/latest");
      const d = await res.json();
      this.shadowRoot.getElementById('out').innerHTML = `Root: <span class="h">${d.merkle_root}</span>`;
    } catch(e) {}
  }
}
customElements.define('public-proof-view', PublicProofView);
