import { Express, Request, Response } from "express";
import { Socket } from "socket.io";
import { Server } from "spdy";
import { Server as httpsServer} from "https";
import { AKioskStateClass } from './kiosk';

export interface IMessage {
	title: string;
	data: object | string;
}

export abstract class AWebSocketClient {
	public send(message: IMessage): void;
}

export abstract class AServerController {
	public init(): Promise<void>;
	public stop(): Promise<void>;
}

export abstract class AHttpServer {
	public readonly app: Express;
	public readonly server: Server;

	public init(): Promise<void>;
	public stop(): Promise<void>;
}

export abstract class AWsServer {
	public init(http: httpsServer): Promise<void>;
	public stop(): Promise<void>;
}

export abstract class AHttpMiddlewares {
	public static cors(req: Request, res: Response, next: () => void): void;
	public static shouldCompress(req: Request, res: Response): any | false;
	public static entry(type: string, req: Request, res: Response): void;
	public static favicon(req: Request, res: Response): void;
}

export interface IHandlerOptions {
	socket: Socket;
	address: string;
	kiosk: AKioskStateClass;
}