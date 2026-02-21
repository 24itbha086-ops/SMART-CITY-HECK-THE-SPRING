import { mockDepartments, simulateDelay } from "../data/mockData";

export const departmentService = {
  /**
   * List all departments
   */
  listDepartments: async () => {
    await simulateDelay(200);
    return [...mockDepartments];
  },

  /**
   * Get department by ID
   */
  getDepartmentById: async (id) => {
    await simulateDelay(100);
    const dept = mockDepartments.find((d) => d.id === id);
    if (!dept) {
      throw new Error(`Department with ID ${id} not found`);
    }
    return dept;
  },

  /**
   * Get department statistics
   */
  getDepartmentStats: async (departmentId) => {
    await simulateDelay(200);
    const dept = mockDepartments.find((d) => d.id === departmentId);
    if (!dept) {
      throw new Error(`Department with ID ${departmentId} not found`);
    }
    return {
      ...dept,
      resolutionRate: Math.round((dept.resolvedCount / dept.issueCount) * 100),
      pendingCount: dept.issueCount - dept.resolvedCount,
    };
  },

  /**
   * Get all department names (for dropdowns)
   */
  getDepartmentNames: async () => {
    await simulateDelay(100);
    return mockDepartments.map((d) => ({ id: d.id, name: d.name }));
  },
};
