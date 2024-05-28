import axios from "axios";
import crypto from "node:crypto";
import type {
	AppInfoResponse,
	CreateInvoiceOptions,
	CreateInvoiceResponse,
	CurrenciesResponse,
} from "./types";

export class XRocketSDK {
	private http;

	constructor(private apiToken: string) {
		this.http = axios.create({
			baseURL: "https://pay.ton-rocket.com/",
			headers: {
				"Rocket-Pay-Key": apiToken,
			},
		});
	}

	async appInfo(): Promise<AppInfoResponse> {
		return this.http.get("/app/info").then((r) => r.data);
	}

	async createInvoice(
		options: CreateInvoiceOptions,
	): Promise<CreateInvoiceResponse> {
		return this.http.post("/tg-invoices", options).then((r) => r.data);
	}

	async getCurrencies(): Promise<CurrenciesResponse> {
		return this.http.get("/currencies/available").then((r) => r.data);
	}

	/**
	 * Check webhook validity
	 *
	 * @param {string} body string representation of request body
	 * @param {Record<string, string>} headers Record<string, string> of request headers
	 * @returns {boolean} true if webhook is valid
	 */
	verifyWebhookSignature(
		body: string,
		headers: Record<string, string>,
	): boolean {
		const secretKey = crypto
			.createHash("sha256")
			.update(this.apiToken)
			.digest();
		const hmac = crypto.createHmac("sha256", secretKey);
		const digest = hmac.update(body).digest("hex");
		return digest === headers["rocket-pay-signature"];
	}
}
