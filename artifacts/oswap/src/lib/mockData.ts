export const MOCK_USER = {
  name: "Alex Becker",
  email: "alex@oswap.com",
  avatar: "AB"
};

export const MOCK_BALANCES = {
  totalUsd: 14250.00,
  crypto: {
    usdValue: 9200.00,
    assets: [
      { symbol: "USDC", amount: 4500.00, value: 4500.00 },
      { symbol: "ETH", amount: 1.5, value: 4700.00 }
    ]
  },
  fiat: {
    usdValue: 5050.00,
    currency: "USD"
  }
};

export const MOCK_TRANSACTIONS = [
  { id: "tx1", merchant: "AWS", date: "Oct 24", amount: -124.50, currency: "USD", status: "completed" },
  { id: "tx2", merchant: "Vercel", date: "Oct 22", amount: -20.00, currency: "USD", status: "completed" },
  { id: "tx3", merchant: "Deposit", date: "Oct 20", amount: 5000.00, currency: "USDC", status: "completed" },
  { id: "tx4", merchant: "Linear", date: "Oct 18", amount: -48.00, currency: "USD", status: "completed" },
  { id: "tx5", merchant: "Stripe", date: "Oct 15", amount: -29.00, currency: "USD", status: "completed" },
  { id: "tx6", merchant: "Github", date: "Oct 10", amount: -7.00, currency: "USD", status: "completed" },
];
