// Centralized mock data for development
// This simulates API responses until backend is ready

export const ISSUE_CATEGORIES = [
  { id: "pothole", label: "Pothole", icon: "construction" },
  { id: "streetlight", label: "Streetlight", icon: "lightbulb" },
  { id: "graffiti", label: "Graffiti", icon: "brush" },
  { id: "park", label: "Park Care", icon: "park" },
  { id: "water", label: "Water Leak", icon: "water_drop" },
  { id: "trash", label: "Trash/Debris", icon: "delete" },
  { id: "road", label: "Road Damage", icon: "trending_down" },
  { id: "noise", label: "Noise Complaint", icon: "volume_up" },
];

export const PRIORITY_LEVELS = [
  { id: "low", label: "Low", color: "gray" },
  { id: "medium", label: "Medium", color: "yellow" },
  { id: "high", label: "High", color: "red" },
];

export const ISSUE_STATUSES = {
  SUBMITTED: { id: "submitted", label: "Submitted", color: "gray" },
  ACKNOWLEDGED: { id: "acknowledged", label: "Acknowledged", color: "blue" },
  IN_PROGRESS: { id: "in_progress", label: "In Progress", color: "yellow" },
  RESOLVED: { id: "resolved", label: "Resolved", color: "green" },
  CLOSED: { id: "closed", label: "Closed", color: "slate" },
};

export const mockUsers = [
  {
    id: "user_1",
    name: "Alex Johnson",
    email: "alex@citizen.gov",
    role: "citizen",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDIXGhQPt3eCXznlXKZt8Qa_gXNVsIdBiQeBtpGirzy-9eTcw0fDzvsnpPVFwQGOIl38j5zNsqkf5xCZkWU1pH0-OjMHRUAlbKtpSTn6lWtBfaW0Sj69ZwAdY2Kfm7g_QHYDmW7qx8F6DoPGFhWUEqFDOQR9cVkuVvgtXOomLkFjCX61u-8cO9apGihWx3g5QDXt38Kdr0olVuagOS2S99nPwNwiJ0XDzRsxDfxEGo4MtfTvnMg6OYPQfWZikWJTHqyOmBnFSDqu8Y1",
    impactPoints: 2840,
    rank: "Civic Hero",
    level: 12,
  },
  {
    id: "admin_1",
    name: "Sarah Admin",
    email: "admin@cityhall.gov",
    role: "admin",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqhpdVnS1reuKyZCW_ViJ6epooR_VY-IkCoKgUHeE2YDCV9Lqo8PpV61Uq-FBLfLSIPxoWov1X1P9_6vFMvrpWLBEKHjFFl4ZdSEOQI6K2ec-DUKtLd2G5gk7dsrYAKuSEhBsgXsT4fXKN2YImWJ7Klt3WBj8XItpa_oFn8cF_6qYRerov25YDbVCtyK5XkU7kKcMm3xWAVz7VFx-YXuFxeqkwAcubOHbO4AJ0bXms6_q6msFyxfPzScxxODPhwKHbqAPlJPu8Hhfl",
    department: "Public Works",
  },
];

export const mockDepartments = [
  { id: "dept_1", name: "Sanitation", issueCount: 45, resolvedCount: 38 },
  { id: "dept_2", name: "Public Works", issueCount: 78, resolvedCount: 65 },
  { id: "dept_3", name: "Electricity", issueCount: 32, resolvedCount: 28 },
  { id: "dept_4", name: "Water and Drainage", issueCount: 56, resolvedCount: 45 },
  { id: "dept_5", name: "Parks & Recreation", issueCount: 23, resolvedCount: 20 },
];

export const mockIssues = [
  {
    id: "issue_1",
    title: "Pothole on 5th Ave",
    description: "Large pothole causing traffic hazard near the intersection",
    category: "pothole",
    priority: "high",
    status: "in_progress",
    location: { lat: 40.7128, lng: -74.006, address: "5th Ave & Main St" },
    reportedBy: "user_1",
    reportedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    assignedTo: "dept_2",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuAp2f5Mk2XZzavrMFu_LhH2js_J_xM3EYgWJVlIr0iteyfHoV3MpFNyQ9uLlNz3hkAPJPvW4kz0e_8aHTrqF6zhbkHPmAIdCgYdX1bTGrBBZicVvE2cvrAzA73pnnblDNHPUbiBSr4U6qtZyVDfxeoFnu8gwZne9aOYlm0aNC4CxeSumAeZJilu81DDgYkKxuAOzCHFJTi4nj7fL7SRy2xdsI7CF_Lue14RqfjUGgWFUQyPrEpBtbQEFx98gMsZq8rUjpHutIJn52x1"],
    updates: [
      {
        id: "upd_1",
        message: "The crew has arrived and repair work is scheduled to finish by 4 PM today.",
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        author: "Public Works Department",
      },
    ],
  },
  {
    id: "issue_2",
    title: "Graffiti in Central Park",
    description: "Vandalism on the north fountain area walls",
    category: "graffiti",
    priority: "medium",
    status: "resolved",
    location: { lat: 40.7829, lng: -73.9654, address: "Central Park North Fountain" },
    reportedBy: "user_1",
    reportedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: "dept_5",
    resolvedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    images: [],
    updates: [
      {
        id: "upd_2",
        message: "Cleaning crew successfully removed the markings from the north fountain area.",
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        author: "Parks & Recreation",
      },
    ],
  },
  {
    id: "issue_3",
    title: "Street Light Out",
    description: "Street light not working, creating safety concern at night",
    category: "streetlight",
    priority: "medium",
    status: "submitted",
    location: { lat: 40.7489, lng: -73.9680, address: "Oak & Pine Street" },
    reportedBy: "user_1",
    reportedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    assignedTo: null,
    images: [],
    updates: [],
  },
  {
    id: "issue_4",
    title: "Water Main Leak",
    description: "Water leaking from underground pipe",
    category: "water",
    priority: "high",
    status: "acknowledged",
    location: { lat: 40.7549, lng: -73.9840, address: "Broadway & 42nd St" },
    reportedBy: "user_1",
    reportedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    assignedTo: "dept_4",
    images: [],
    updates: [
      {
        id: "upd_3",
        message: "Issue acknowledged. Team dispatched to assess the situation.",
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        author: "Water and Drainage",
      },
    ],
  },
];

export const mockNotifications = [
  {
    id: "notif_1",
    type: "status_update",
    title: "Issue Status Updated",
    message: "Your report 'Pothole on 5th Ave' is now In Progress",
    issueId: "issue_1",
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif_2",
    type: "resolved",
    title: "Issue Resolved",
    message: "Your report 'Graffiti in Central Park' has been resolved! +150 Impact Points",
    issueId: "issue_2",
    read: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif_3",
    type: "badge",
    title: "New Badge Earned!",
    message: "You earned the 'Green Citizen' badge for your environmental reports",
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockAnalytics = {
  totalIssues: 234,
  resolvedIssues: 196,
  avgResolutionTime: "2.3 days",
  activeUsers: 1247,
  topCategories: [
    { category: "Pothole", count: 78 },
    { category: "Streetlight", count: 45 },
    { category: "Water Leak", count: 38 },
    { category: "Graffiti", count: 32 },
    { category: "Park Care", count: 21 },
  ],
  monthlyTrends: [
    { month: "Jan", submitted: 45, resolved: 38 },
    { month: "Feb", submitted: 52, resolved: 48 },
    { month: "Mar", submitted: 61, resolved: 55 },
    { month: "Apr", submitted: 48, resolved: 52 },
    { month: "May", submitted: 55, resolved: 50 },
  ],
  departmentPerformance: [
    { department: "Public Works", avgResolutionDays: 1.8, satisfaction: 4.2 },
    { department: "Sanitation", avgResolutionDays: 2.1, satisfaction: 4.0 },
    { department: "Electricity", avgResolutionDays: 1.5, satisfaction: 4.5 },
    { department: "Water and Drainage", avgResolutionDays: 2.5, satisfaction: 3.8 },
  ],
};

// Simulate API delay
export const simulateDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
