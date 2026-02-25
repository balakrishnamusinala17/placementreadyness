import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { loadHistory, setLastAnalysisId } from "../lib/analysis.js";

export function ResourcesPage() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleOpen = (entryId) => {
    setLastAnalysisId(entryId);
    navigate("/dashboard/assessments");
  };

  return (
    <section className="page">
      <h2 className="page-title">Analysis History</h2>
      {history.length === 0 ? (
        <p className="page-body">
          No analyses saved yet. Run an analysis from the JD Analysis tab to
          see it appear here.
        </p>
      ) : (
        <div className="history-list">
          {history.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>
                  {entry.company || "Untitled company"} &mdash;{" "}
                  {entry.role || "Role not specified"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="history-meta-row">
                  <span className="history-date">
                    {new Date(entry.createdAt).toLocaleString()}
                  </span>
                  <span className="history-score">
                    Readiness: {entry.readinessScore}/100
                  </span>
                </div>
                <p className="history-snippet">
                  {entry.jdText.slice(0, 160)}
                  {entry.jdText.length > 160 ? "…" : ""}
                </p>
                <button
                  type="button"
                  className="btn btn-primary history-button"
                  onClick={() => handleOpen(entry.id)}
                >
                  View analysis
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}

