class CommandIngestPanel extends HTMLElement {
  constructor() {
    super(); this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>:host{display:block;padding:16px;background:#1c2033;} h2{font-size:16px;color:#9cdcfe;margin:0 0 8px;} textarea{width:100%;height:60px;background:#0f1117;color:#4caf50;border:1px solid #2e344d;font-family:monospace;} button{margin-top:8px;background:#4caf50;border:none;padding:5px 10px;cursor:pointer;font-weight:bold;}</style>
    <h2>§6.1 Command Ingest</h2><textarea id="in" placeholder='{"cmd":"ACTION"}'></textarea><br><button id="btn">SEND TO ORCHESTRATOR</button><div id="msg"></div>`;
  }
  connectedCallback() {
    this.shadowRoot.getElementById('btn').onclick = async () => {
      this.shadowRoot.getElementById('msg').textContent = "Sending...";
      try {
        await fetch("/api/v1/audit/event", { method:"POST", body: this.shadowRoot.getElementById('in').value });
        this.shadowRoot.getElementById('msg').textContent = "Sent Successfully";
      } catch(e) { this.shadowRoot.getElementById('msg').textContent = "Error"; }
    };
  }
}
customElements.define('command-ingest-panel', CommandIngestPanel);
