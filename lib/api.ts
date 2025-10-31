// lib/api.ts

// ===== Trader =====
export interface Trader {
  userId: string;
  status: boolean;
  name: string;
  accountType: string;
  email: string;
  phone: string;
  credit: string;
  balance: string;
  equity: string;
  margin: string;
  freeMargin: string;
}

// ===== User Verification =====
export interface UserVerificationData {
  userId: string;
  name: string;
  accountType: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  accountSetting: string;
  verification: string;
}

// ===== Pending Deposit =====
export interface PendingDepositData {
  user: string;
  type: string;
  amount: string;
  approved: string;
}

// ===== Pending Withdrawal =====
export interface PendingWithdrawalData {
  user: string;
  type: string;
}

// ===== Margin Call =====
export interface ActivePerson {
  user: string;
  marginLevel: string;
  status: boolean;
}

export interface MarginCall {
  user: string;
  margin: string;
  marginLevel: string;
}

// ===== Admin =====
export interface Admin {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

// ===== Login Response =====
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user_name?: string;
}

const BASE_URL = "/data"; // ganti ke API live

// ===== Login =====
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch("http://91.108.122.156/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Login failed");
  }

  return res.json();
};

// ===== Logout =====
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_name");
  window.location.href = "/login"; // redirect ke login
};

// ===== Cek status login =====
export const isLoggedIn = (): boolean => !!localStorage.getItem("access_token");

// ===== Fetch All Admins =====
export const fetchAllAdmins = async (): Promise<Admin[]> => {
  const res = await fetch(`${BASE_URL}/alladmins.json`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.admins || [];
};

// ===== Fetch All Traders =====
export const fetchAllTraders = async (): Promise<Trader[]> => {
  const res = await fetch(`${BASE_URL}/alltraders.json`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  const data = await res.json();
  return data.traders.map((t: any) => ({
    ...t,
    status: t.status === true || t.status === "true",
  }));
};

// ===== Fetch All Users Verification =====
export const fetchAllUsersVerification = async (): Promise<UserVerificationData[]> => {
  const res = await fetch(`${BASE_URL}/allusersverification.json`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

// ===== Fetch Pending Deposits =====
export const fetchPendingDeposits = async (): Promise<PendingDepositData[]> => {
  const res = await fetch(`${BASE_URL}/pendingdeposits.json`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

// ===== Fetch Pending Withdrawals =====
export const fetchPendingWithdrawals = async (): Promise<PendingWithdrawalData[]> => {
  const res = await fetch(`${BASE_URL}/pendingwithdrawals.json`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};

// ===== Fetch Margin Calls =====
export const fetchMarginCalls = async (): Promise<{ activePeople: ActivePerson[]; marginCalls: MarginCall[] }> => {
  const res = await fetch(`${BASE_URL}/margincalls.json`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
};
