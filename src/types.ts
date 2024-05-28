export type AppInfoResponse =
	| {
			success: false;
			message: string;
	  }
	| {
			success: true;
			data: {
				name: string;
				feePercents: number;
				balances: AppBalance[];
			};
	  };

export type AppBalance = {
	currency: string;
	balance: number;
};

/**
 * @typedef {Object} CreateInvoiceOptions
 * @property {number} amount - Invoice amount. 9 decimal places, others cut off.
 * @example 1.23
 * @minimum 0
 * @maximum 1000000
 *
 * @property {number} minPayment - Min payment only for multi invoice if invoice amount is null.
 * @minimum 0
 * @maximum 1000000
 *
 * @property {number} [numPayments=1] - Num payments for invoice.
 * @example 1
 * @minimum 0
 * @maximum 1000000
 *
 * @property {string} [currency="TONCOIN"] - Currency of transfer, info /currencies/available.
 * @example TONCOIN
 *
 * @property {string} description - Description for invoice.
 * @example best thing in the world, 1 item
 * @maximum 1000
 *
 * @property {string} hiddenMessage - Hidden message after invoice is paid.
 * @example thank you
 * @maximum 2000
 *
 * @property {boolean} [commentsEnabled=false] - Allow comments.
 * @example false
 *
 * @property {string} callbackUrl - URL for Return button after invoice is paid.
 * @example https://t.me/ton_rocket
 * @maximum 500
 *
 * @property {string} payload - Any data. Invisible to user, will be returned in callback.
 * @example some custom payload I want to see in webhook or when I request invoice
 * @maximum 4000
 *
 * @property {number} [expiredIn=0] - Invoice expire time in seconds, max 1 day, 0 - none expired.
 * @example 10
 * @minimum 0
 * @maximum 86400
 */
export type CreateInvoiceOptions = {
	amount: number;
	minPayment?: number;
	numPayments?: number;
	currency?: string;
	description?: string;
	hiddenMessage?: string;
	commentsEnabled?: boolean;
	callbackUrl?: string;
	payload?: string;
	expiredIn?: number;
};

export type CreateInvoiceResponse =
	| {
			success: false;
			message: string;
			errors?: {
				property: string;
				error: string;
			}[];
	  }
	| {
			success: true;
			data: {
				id: number;
				amount: number;
				minPayment: number;
				totalActivations: number;
				activationsLeft: number;
				description: string;
				hiddenMessage: string;
				payload: string;
				callbackUrl: string;
				commentsEnabled: boolean;
				currency: string;
				created: string; // ISO 8601 date string
				paid?: string; // ISO 8601 date string, optional
				status: "active" | "paid" | "expired";
				expiredIn: number;
				link: string;
			};
	  };

export type CurrenciesResponse = {
	success: true;
	data: {
		results: {
			currency: string;
			name: string;
			minTransfer: number;
			minCheque: number;
			minInvoice: number;
			minWithdraw: number;
			feeWithdraw: {
				currency: string;
				networks: {
					networkCode: "TON" | "BSC" | "ETH" | "BTC" | "TRX";
					feeWithdraw: {
						fee: number;
						currency: string;
					};
				}[];
			};
		}[];
	};
};

export type Webhook = {
	type:
		| "invoicePay"
		| "subscriptionPay"
		| "subscriptionEnd"
		| "exchangeOrderComplete";
	timestamp: string;
	data: {
		id: number;
		amount: number;
		minPayment: number;
		totalActivations: number;
		activationsLeft: number;
		description?: string;
		hiddenMessage?: string;
		payload?: string;
		callbackUrl?: string;
		commentsEnabled?: boolean;
		currency: string;
		created: string;
		paid?: string;
		status: "active" | "paid" | "expired";
		expiredIn?: number;
		link: string;
		payment: {
			userId: number;
			paymentNum: number;
			paymentAmount: number;
			comment: string;
			paid: string;
		};
	};
};
