class GovernanceControl extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;} button{background:#8b0000;color:#fff;border:none;padding:10px;cursor:pointer;font-weight:bold;width:100%;}</style>
    <h2>§9 Governance</h2><button id="fz">EMERGENCY SYSTEM FREEZE</button><div id="st"></div>`;
  }
  connectedCallback() {
    this.shadowRoot.getElementById('fz').onclick = async () => {
      if(confirm("Confirm Emergency Freeze?")) {
        await fetch("/api/v1/governance/freeze",{method:"POST"});
        this.shadowRoot.getElementById('st').textContent = "SYSTEM FROZEN";
      }
    };
  }
}
customElements.define('governance-control', GovernanceControl);
