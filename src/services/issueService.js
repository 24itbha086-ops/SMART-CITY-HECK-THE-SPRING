import { mockIssues, simulateDelay, ISSUE_CATEGORIES } from "../data/mockData";

// In-memory store for development (simulates database)
let issuesStore = [...mockIssues];

export const issueService = {
  /**
   * List all issues with optional filters
   */
  listIssues: async (filters = {}) => {
    await simulateDelay(300);
    let results = [...issuesStore];

    if (filters.status) {
      results = results.filter((issue) => issue.status === filters.status);
    }
    if (filters.category) {
      results = results.filter((issue) => issue.category === filters.category);
    }
    if (filters.priority) {
      results = results.filter((issue) => issue.priority === filters.priority);
    }
    if (filters.reportedBy) {
      results = results.filter((issue) => issue.reportedBy === filters.reportedBy);
    }
    if (filters.assignedTo) {
      results = results.filter((issue) => issue.assignedTo === filters.assignedTo);
    }

    // Sort by reportedAt descending (newest first)
    results.sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt));

    return results;
  },

  /**
   * Get a single issue by ID
   */
  getIssueById: async (id) => {
    await simulateDelay(200);
    const issue = issuesStore.find((i) => i.id === id);
    if (!issue) {
      throw new Error(`Issue with ID ${id} not found`);
    }
    return issue;
  },

  /**
   * Create a new issue
   */
  createIssue: async (payload) => {
    await simulateDelay(500);
    const newIssue = {
      id: `issue_${Date.now()}`,
      ...payload,
      status: "submitted",
      reportedAt: new Date().toISOString(),
      updates: [],
    };
    issuesStore.unshift(newIssue);
    return newIssue;
  },

  /**
   * Update issue status
   */
  updateIssueStatus: async (id, status, updateMessage = "") => {
    await simulateDelay(300);
    const issueIndex = issuesStore.findIndex((i) => i.id === id);
    if (issueIndex === -1) {
      throw new Error(`Issue with ID ${id} not found`);
    }

    issuesStore[issueIndex] = {
      ...issuesStore[issueIndex],
      status,
      ...(status === "resolved" && { resolvedAt: new Date().toISOString() }),
    };

    if (updateMessage) {
      issuesStore[issueIndex].updates.push({
        id: `upd_${Date.now()}`,
        message: updateMessage,
        createdAt: new Date().toISOString(),
        author: "System",
      });
    }

    return issuesStore[issueIndex];
  },

  /**
   * Assign issue to a department
   */
  assignIssue: async (id, departmentId) => {
    await simulateDelay(300);
    const issueIndex = issuesStore.findIndex((i) => i.id === id);
    if (issueIndex === -1) {
      throw new Error(`Issue with ID ${id} not found`);
    }

    issuesStore[issueIndex] = {
      ...issuesStore[issueIndex],
      assignedTo: departmentId,
      status: issuesStore[issueIndex].status === "submitted" ? "acknowledged" : issuesStore[issueIndex].status,
    };

    return issuesStore[issueIndex];
  },

  /**
   * Add update/comment to an issue
   */
  addUpdate: async (id, message, author) => {
    await simulateDelay(200);
    const issueIndex = issuesStore.findIndex((i) => i.id === id);
    if (issueIndex === -1) {
      throw new Error(`Issue with ID ${id} not found`);
    }

    const update = {
      id: `upd_${Date.now()}`,
      message,
      author,
      createdAt: new Date().toISOString(),
    };

    issuesStore[issueIndex].updates.push(update);
    return update;
  },

  /**
   * Get user's issue statistics
   */
  getUserStats: async (userId) => {
    await simulateDelay(200);
    const userIssues = issuesStore.filter((i) => i.reportedBy === userId);
    return {
      totalReports: userIssues.length,
      resolved: userIssues.filter((i) => i.status === "resolved").length,
      active: userIssues.filter((i) => !["resolved", "closed"].includes(i.status)).length,
    };
  },

  /**
   * Get issue categories
   */
  getCategories: async () => {
    await simulateDelay(100);
    return ISSUE_CATEGORIES;
  },

  /**
   * Delete an issue (admin only)
   */
  deleteIssue: async (id) => {
    await simulateDelay(300);
    const issueIndex = issuesStore.findIndex((i) => i.id === id);
    if (issueIndex === -1) {
      throw new Error(`Issue with ID ${id} not found`);
    }
    issuesStore = issuesStore.filter((i) => i.id !== id);
    return { success: true };
  },
};
