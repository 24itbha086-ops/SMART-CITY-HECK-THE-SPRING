import { useContext } from "react";
import { IssueContext } from "../context/IssueContext";

const useIssues = () => {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error("useIssues must be used within IssueProvider");
  }

  return context;
};

export default useIssues;
