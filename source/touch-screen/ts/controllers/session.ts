import ws from "./ws";
import includes from "lodash/includes";
import remove from "lodash/remove";

const DELAY = 60 * 1000; // 2 min

const setTimer: () => void = (): void => {
	Session.setTimer();
};

export class Session {
	private static liked: string[] = [];
	private static timer: any;

	public static init(): void {
		const body = document.querySelector("body");
		if (body === null) return;

		body.onclick = setTimer;
		body.addEventListener("touchstart", setTimer, false);
		body.addEventListener("pointerdown", setTimer);
	}

	public static setTimer(): void {
		clearTimeout(Session.timer);
		Session.timer = setTimeout(() => {
			Session.sessionClose();
		}, DELAY);
	}

	public static startSession(): void {
		ws.send({ title: "clientEvent", data: { step: 1 } });
		Session.liked = [];
		Session.setTimer();
	}

	public static sessionClose(): void {
		ws.send({ title: "clientEvent", data: { step: 0, email: "" } });
		Session.liked = [];
	}

	public static like(id: string): void {
		Session.liked.push(id);
		ws.send({ title: "clientLike", data: { id } });
	}

	public static unLike(id: string): void {
		remove(Session.liked, (elem: string): boolean => elem === id);
		ws.send({ title: "clientUnLike", data: { id } });
	}

	public static isLiked(id: string): boolean {
		return includes(Session.liked, id);
	}
}

Session.init();
