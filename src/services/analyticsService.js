import { mockAnalytics, mockIssues, simulateDelay } from "../data/mockData";

export const analyticsService = {
  /**
   * Get overview dashboard stats
   */
  getOverview: async () => {
    await simulateDelay(300);
    return {
      ...mockAnalytics,
      lastUpdated: new Date().toISOString(),
    };
  },

  /**
   * Get stats by category
   */
  getCategoryStats: async () => {
    await simulateDelay(200);
    return mockAnalytics.topCategories;
  },

  /**
   * Get monthly trends
   */
  getMonthlyTrends: async () => {
    await simulateDelay(200);
    return mockAnalytics.monthlyTrends;
  },

  /**
   * Get department performance metrics
   */
  getDepartmentPerformance: async () => {
    await simulateDelay(200);
    return mockAnalytics.departmentPerformance;
  },

  /**
   * Get real-time issue counts by status
   */
  getStatusCounts: async () => {
    await simulateDelay(100);
    const counts = mockIssues.reduce((acc, issue) => {
      acc[issue.status] = (acc[issue.status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  },

  /**
   * Get user contribution stats
   */
  getUserContributions: async (userId) => {
    await simulateDelay(200);
    const userIssues = mockIssues.filter((i) => i.reportedBy === userId);
    return {
      totalReports: userIssues.length,
      resolved: userIssues.filter((i) => i.status === "resolved").length,
      impactScore: userIssues.length * 50 + userIssues.filter((i) => i.status === "resolved").length * 100,
    };
  },

  /**
   * Get city-wide resolution metrics
   */
  getResolutionMetrics: async () => {
    await simulateDelay(200);
    return {
      avgResolutionTime: mockAnalytics.avgResolutionTime,
      totalResolved: mockAnalytics.resolvedIssues,
      totalPending: mockAnalytics.totalIssues - mockAnalytics.resolvedIssues,
      resolutionRate: Math.round((mockAnalytics.resolvedIssues / mockAnalytics.totalIssues) * 100),
    };
  },
};
