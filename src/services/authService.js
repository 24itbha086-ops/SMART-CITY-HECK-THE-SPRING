import { mockUsers, simulateDelay } from "../data/mockData";

const AUTH_KEY = "js_auth_user";

export const authService = {
  /**
   * Authenticate user with email/password
   * Returns user object if successful, throws error if not
   */
  authenticate: async (email, password) => {
    await simulateDelay(500);

    const identifier = (email || "").trim().toLowerCase();
    const secret = (password || "").trim();

    // Mock authentication - in production this would hit an API
    // Supports email and common demo aliases like "admin" or local-part.
    const user = mockUsers.find((u) => {
      const normalizedEmail = u.email.toLowerCase();
      const localPart = normalizedEmail.split("@")[0];
      const roleAlias = u.role === "admin" ? "admin" : "citizen";
      return (
        normalizedEmail === identifier ||
        localPart === identifier ||
        roleAlias === identifier
      );
    });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // In production, validate password here.
    // For demo, any non-empty password works.
    if (!secret) {
      throw new Error("Invalid email or password");
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  /**
   * Register a new user
   */
  register: async (userData) => {
    await simulateDelay(500);
    
    // Check if email already exists
    const existing = mockUsers.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );
    if (existing) {
      throw new Error("Email already registered");
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: "citizen",
      avatar: null,
      impactPoints: 0,
      rank: "New Citizen",
      level: 1,
    };

    // In production, this would save to database via API
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    return newUser;
  },

  /**
   * Store user in local storage (for context persistence)
   */
  login: (user) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  /**
   * Clear user from local storage
   */
  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  /**
   * Get current user from local storage
   */
  getCurrentUser: () => {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  /**
   * Check if user has specific role
   */
  hasRole: (user, role) => {
    return user?.role === role;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(AUTH_KEY);
  },
};
