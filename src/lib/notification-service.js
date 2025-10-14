// import type { Notification } from '@/app/types/survey'; // Remove type-only import for JS

const NOTIFICATIONS_KEY = "surveychain_notifications";

export function getNotifications(userId) {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  if (!stored) return [];

  const allNotifications = JSON.parse(stored);
  return allNotifications
    .filter((n) => n.userId.toLowerCase() === userId.toLowerCase())
    .sort((a, b) => b.timestamp - a.timestamp);
}

export function addNotification(notification) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  const notifications = stored ? JSON.parse(stored) : [];

  const newNotification = {
    ...notification,
    id: Date.now().toString(),
    timestamp: Date.now(),
    read: false,
  };

  notifications.push(newNotification);
  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

export function markNotificationAsRead(notificationId) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  if (!stored) return;

  const notifications = JSON.parse(stored);
  const updated = notifications.map((n) =>
    n.id === notificationId ? { ...n, read: true } : n
  );

  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
}

export function clearAllNotifications(userId) {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem(NOTIFICATIONS_KEY);
  if (!stored) return;

  const notifications = JSON.parse(stored);
  const filtered = notifications.filter(
    (n) => n.userId.toLowerCase() !== userId.toLowerCase()
  );

  localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(filtered));
}
