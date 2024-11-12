class WebSocketButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 8px 16px;
          background-color: #4CAF50;
          border: none;
          border-radius: 4px;
          color: white;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
        }
      </style>
    `;
  }

  connectedCallback() {
    const button = document.createElement("button");
    button.innerText = "Open WebSocket";
    button.addEventListener("click", this.handleClick.bind(this));
    this.shadowRoot.appendChild(button);
  }

  async handleClick() {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      socket.send("Hello Server");
    };

    socket.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };
  }
}

customElements.define("websocket-button", WebSocketButton);
