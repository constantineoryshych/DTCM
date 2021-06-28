import { connect } from "socket.io-client";
import * as url from "url";

import { AWebSocketClient, IMessage } from "~/@/network.d";

// Нужен рефактор для этой функции
const getHost = (): string =>
	typeof window !== "undefined"
		? url.parse(window.location.href, true).host || "localhost:8080"
		: process.env.NODE_ENV === "development"
			? "192.168.10.2:3000"
			: "localhost:8080";

class WebSocketClient implements AWebSocketClient {
	protected socket: SocketIOClient.Socket;
	private host: string = getHost();

	constructor() {
		this.connectServer();
	}

	public send(message: IMessage): void {
		if (this.socket === null) return;
		this.socket.emit(message.title, message.data);
	}

	private connectServer(): void {
		this.socket = connect(this.host);
	}
}

export default WebSocketClient;
