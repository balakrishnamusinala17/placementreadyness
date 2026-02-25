import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import {
  extractSkills,
  buildChecklist,
  buildPlan,
  buildQuestions,
  computeReadinessScore,
  loadHistory,
  saveHistory,
  getLastAnalysisId,
  setLastAnalysisId,
  findEntryById,
} from "../lib/analysis.js";

export function AssessmentsPage() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jdText, setJdText] = useState("");

  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = loadHistory();
    setHistory(stored);

    const lastId = getLastAnalysisId();
    if (lastId) {
      const entry = findEntryById(stored, lastId);
      if (entry) {
        setCompany(entry.company || "");
        setRole(entry.role || "");
        setJdText(entry.jdText || "");
        setAnalysis(entry);
      }
    }
  }, []);

  const extractedForView = useMemo(
    () => analysis?.extractedSkills || null,
    [analysis],
  );

  const handleAnalyze = () => {
    const trimmedJd = jdText.trim();
    if (!trimmedJd) {
      return;
    }

    const extracted = extractSkills(trimmedJd);
    const checklist = buildChecklist(extracted);
    const plan = buildPlan(extracted);
    const questions = buildQuestions(extracted);
    const readinessScore = computeReadinessScore({
      jdText: trimmedJd,
      company,
      role,
      extracted,
    });

    const entry = {
      id: `${Date.now()}`,
      createdAt: new Date().toISOString(),
      company: company.trim(),
      role: role.trim(),
      jdText: trimmedJd,
      extractedSkills: extracted,
      plan,
      checklist,
      questions,
      readinessScore,
    };

    const nextHistory = [entry, ...history].slice(0, 50);
    setHistory(nextHistory);
    saveHistory(nextHistory);
    setLastAnalysisId(entry.id);
    setAnalysis(entry);
  };

  return (
    <section className="page">
      <h2 className="page-title">JD Analysis & Readiness</h2>

      <div className="analysis-layout">
        <Card className="analysis-input-card">
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label" htmlFor="company">
                  Company (optional)
                </label>
                <input
                  id="company"
                  className="form-input"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Acme Corp"
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="role">
                  Role (optional)
                </label>
                <input
                  id="role"
                  className="form-input"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. SDE 1"
                />
              </div>
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="jd">
                Paste job description
              </label>
              <textarea
                id="jd"
                className="form-textarea"
                rows={10}
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the full text of the JD here. No external calls are made; everything stays in your browser."
              />
            </div>

            <button
              type="button"
              className="btn btn-primary analysis-button"
              onClick={handleAnalyze}
            >
              Analyze
            </button>
          </CardContent>
        </Card>

        {analysis && (
          <div className="analysis-results">
            <Card>
              <CardHeader>
                <CardTitle>Readiness Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="readiness-score-row">
                  <div className="readiness-score-main">
                    <span className="readiness-score-value">
                      {analysis.readinessScore}
                    </span>
                    <span className="readiness-score-max">/100</span>
                  </div>
                  <p className="readiness-score-caption">
                    Based on JD richness, detected skill categories, and
                    provided company / role context.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Skills Extracted</CardTitle>
              </CardHeader>
              <CardContent>
                {extractedForView && extractedForView.hasAny && (
                  <div className="skills-grid">
                    {extractedForView.categories.map((cat) =>
                      cat.skills.length ? (
                        <div key={cat.id} className="skills-group">
                          <div className="skills-group-label">
                            {cat.label}
                          </div>
                          <div className="skills-tags">
                            {cat.skills.map((skill) => (
                              <span key={skill} className="skill-tag">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ) : null,
                    )}
                  </div>
                )}
                {extractedForView && !extractedForView.hasAny && (
                  <p className="page-body">
                    No specific stack detected. Treat this as a{" "}
                    <strong>{extractedForView.fallback}</strong> and focus on
                    fundamentals across the rounds below.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Round-wise Preparation Checklist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounds-grid">
                  {analysis.checklist.map((round) => (
                    <div key={round.round} className="round-card">
                      <div className="round-title">{round.round}</div>
                      <ul className="round-list">
                        {round.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7-Day Placement Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="plan-grid">
                  {analysis.plan.map((day) => (
                    <div key={day.day} className="plan-day">
                      <div className="plan-day-header">
                        <span className="plan-day-label">{day.day}</span>
                        <span className="plan-day-focus">{day.focus}</span>
                      </div>
                      <ul className="plan-day-list">
                        {day.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Likely Interview Questions (10)</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="questions-list">
                  {analysis.questions.map((q, idx) => (
                    <li key={`${idx}-${q}`}>{q}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}

