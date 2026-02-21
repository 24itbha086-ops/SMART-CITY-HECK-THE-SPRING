import { mockNotifications, simulateDelay } from "../data/mockData";

// In-memory store for notifications
let notificationsStore = [...mockNotifications];

export const notificationService = {
  /**
   * List all notifications for a user
   */
  // eslint-disable-next-line no-unused-vars
  listNotifications: async (userId = null) => {
    await simulateDelay(200);
    // In production, filter by userId
    return [...notificationsStore].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  },

  /**
   * Get unread notification count
   */
  getUnreadCount: async () => {
    await simulateDelay(100);
    return notificationsStore.filter((n) => !n.read).length;
  },

  /**
   * Mark notification as read
   */
  markAsRead: async (notificationId) => {
    await simulateDelay(100);
    const index = notificationsStore.findIndex((n) => n.id === notificationId);
    if (index !== -1) {
      notificationsStore[index] = { ...notificationsStore[index], read: true };
    }
    return notificationsStore[index];
  },

  /**
   * Mark all notifications as read
   */
  markAllAsRead: async () => {
    await simulateDelay(200);
    notificationsStore = notificationsStore.map((n) => ({ ...n, read: true }));
    return { success: true };
  },

  /**
   * Create a new notification
   */
  createNotification: async (notification) => {
    await simulateDelay(100);
    const newNotification = {
      id: `notif_${Date.now()}`,
      ...notification,
      read: false,
      createdAt: new Date().toISOString(),
    };
    notificationsStore.unshift(newNotification);
    return newNotification;
  },

  /**
   * Delete a notification
   */
  deleteNotification: async (notificationId) => {
    await simulateDelay(100);
    notificationsStore = notificationsStore.filter((n) => n.id !== notificationId);
    return { success: true };
  },
};
