import { createContext, useCallback, useMemo, useState } from "react";
import { issueService } from "../services/issueService";

export const IssueContext = createContext(null);

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const fetchIssues = useCallback(async (filterOptions = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await issueService.listIssues(filterOptions);
      setIssues(data);
      setFilters(filterOptions);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIssueById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await issueService.getIssueById(id);
      setSelectedIssue(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createIssue = useCallback(async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const newIssue = await issueService.createIssue(payload);
      setIssues((prev) => [newIssue, ...prev]);
      return newIssue;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateIssueStatus = useCallback(async (id, status, message = "") => {
    setLoading(true);
    setError(null);
    try {
      const updatedIssue = await issueService.updateIssueStatus(id, status, message);
      setIssues((prev) =>
        prev.map((issue) => (issue.id === id ? updatedIssue : issue))
      );
      if (selectedIssue?.id === id) {
        setSelectedIssue(updatedIssue);
      }
      return updatedIssue;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedIssue]);

  const assignIssue = useCallback(async (id, departmentId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedIssue = await issueService.assignIssue(id, departmentId);
      setIssues((prev) =>
        prev.map((issue) => (issue.id === id ? updatedIssue : issue))
      );
      return updatedIssue;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteIssue = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await issueService.deleteIssue(id);
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
      if (selectedIssue?.id === id) {
        setSelectedIssue(null);
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [selectedIssue]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSelectedIssue = useCallback(() => {
    setSelectedIssue(null);
  }, []);

  // Computed values
  const issueStats = useMemo(() => {
    return {
      total: issues.length,
      submitted: issues.filter((i) => i.status === "submitted").length,
      inProgress: issues.filter((i) => i.status === "in_progress").length,
      resolved: issues.filter((i) => i.status === "resolved").length,
    };
  }, [issues]);

  const value = useMemo(
    () => ({
      issues,
      selectedIssue,
      loading,
      error,
      filters,
      issueStats,
      fetchIssues,
      fetchIssueById,
      createIssue,
      updateIssueStatus,
      assignIssue,
      deleteIssue,
      clearError,
      clearSelectedIssue,
      setFilters,
    }),
    [
      issues,
      selectedIssue,
      loading,
      error,
      filters,
      issueStats,
      fetchIssues,
      fetchIssueById,
      createIssue,
      updateIssueStatus,
      assignIssue,
      deleteIssue,
      clearError,
      clearSelectedIssue,
    ]
  );

  return <IssueContext.Provider value={value}>{children}</IssueContext.Provider>;
};
