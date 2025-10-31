// lib/api.ts
export interface Trader {
  userId: number;
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

export interface PendingDepositData {
  user: string;
  type: string;
  amount: string;
  approved: string;
}

export interface PendingWithdrawalData {
  user: string;
  type: string;
}

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

export interface Admin {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user_name?: string;
}

const BASE_URL = "http://91.108.122.156/api/v1";

// ===== Login =====
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Login failed");
  }

  const data: LoginResponse = await res.json();
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token);
  if (data.user_name) localStorage.setItem("user_name", data.user_name);
  return data;
};

// ===== Refresh Token (Queue) =====
let refreshingToken: Promise<void> | null = null;

export const refreshToken = async (): Promise<void> => {
  const refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) throw new Error("No refresh token found");

  if (!refreshingToken) {
    refreshingToken = (async () => {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ refresh_token }),
      });

      if (!res.ok) {
        logout();
        throw new Error("Failed to refresh token");
      }

      const data: LoginResponse = await res.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
    })().finally(() => {
      refreshingToken = null;
    });
  }

  return refreshingToken;
};

// ===== Logout =====
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_name");
  window.location.href = "/login";
};

// ===== Check login status =====
export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// ===== Fetch With Auth (Generic + Retry) =====
export const fetchWithAuth = async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
  let token = localStorage.getItem("access_token");
  if (!token) throw new Error("Not logged in");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    try {
      await refreshToken();
      token = localStorage.getItem("access_token");
      if (!token) throw new Error("No token after refresh");

      return fetchWithAuth<T>(url, options); // retry
    } catch {
      logout();
      throw new Error("Unauthorized. Please login again.");
    }
  }

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || `HTTP error! status: ${res.status}`);
  }

  return res.json();
};

// ===== Example Fetch Functions =====
export const fetchAllTraders = async (skip = 0, limit = 50): Promise<{ traders: Trader[]; total: number }> => {
  const data = await fetchWithAuth(`${BASE_URL}/admin/dashboard/traders?skip=${skip}&limit=${limit}`);
  const traders: Trader[] = (data.traders ?? []).map((t: any) => ({
    userId: t.user_id,
    status: t.status === true || t.status === "true",
    name: t.name,
    accountType: t.account_type,
    email: t.email,
    phone: t.phone,
    credit: t.credit?.toString() ?? "0",
    balance: t.balance?.toString() ?? "0",
    equity: t.equity?.toString() ?? "0",
    margin: t.margin?.toString() ?? "0",
    freeMargin: t.free_margin?.toString() ?? "0",
  }));
  return { traders, total: data.total ?? traders.length };
};

export const fetchUsersVerificationPage = async (skip = 0, limit = 8): Promise<{ users: UserVerificationData[]; total: number }> => {
  const data = await fetchWithAuth(`${BASE_URL}/admin/users?skip=${skip}&limit=${limit}`);
  const rawUsers = Array.isArray(data) ? data : [];

  const users: UserVerificationData[] = rawUsers.map((t: any) => ({
    userId: t.id?.toString() ?? '',
    name: `${t.first_name ?? ''} ${t.last_name ?? ''}`.trim(),
    accountType: t.is_admin ? 'Admin' : 'User',
    email: t.email ?? '',
    phone: t.phone ?? '-',
    dateOfBirth: t.date_of_birth ? t.date_of_birth.split('T')[0] : '-',
    accountSetting: t.username ?? '',
    verification: t.kyc_status
      ? t.kyc_status.charAt(0).toUpperCase() + t.kyc_status.slice(1)
      : 'Pending',
  }));

  return { users, total: rawUsers.length };
};

export const fetchPendingDeposits = async (): Promise<PendingDepositData[]> => {
  return fetchWithAuth(`${BASE_URL}/admin/dashboard/pending-deposits`);
};

export const fetchPendingWithdrawals = async (): Promise<PendingWithdrawalData[]> => {
  return fetchWithAuth(`${BASE_URL}/admin/dashboard/pending-withdrawals`);
};

export const fetchMarginCalls = async (): Promise<{ activePeople: ActivePerson[]; marginCalls: MarginCall[] }> => {
  return fetchWithAuth(`${BASE_URL}/admin/dashboard/margin-calls`);
};

export const fetchAllAdmins = async (): Promise<Admin[]> => {
  const res = await fetch('/data/alladmins.json'); 
  if (!res.ok) throw new Error("Failed to load admins JSON");
  const data = await res.json();
  return data.admins;
};
