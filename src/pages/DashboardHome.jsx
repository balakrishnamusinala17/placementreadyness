import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

const radarData = [
  { skill: "DSA", value: 75 },
  { skill: "System Design", value: 60 },
  { skill: "Communication", value: 80 },
  { skill: "Resume", value: 85 },
  { skill: "Aptitude", value: 70 },
];

export function DashboardHome() {
  const readinessScore = 72;
  const readinessMax = 100;
  const readinessPercent = readinessScore / readinessMax;

  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="page">
      <h2 className="page-title">Dashboard</h2>

      <div className="dashboard-grid">
        <Card>
          <CardHeader>
            <CardTitle>Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="readiness-circle-wrapper">
              <svg
                className="readiness-circle"
                viewBox="0 0 160 160"
                aria-hidden="true"
              >
                <circle
                  className="readiness-circle-track"
                  cx="80"
                  cy="80"
                  r={radius}
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  className="readiness-circle-progress"
                  cx="80"
                  cy="80"
                  r={radius}
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - readinessPercent)}
                />
              </svg>
              <div className="readiness-circle-center">
                <div className="readiness-score">{readinessScore}</div>
                <div className="readiness-label">Readiness Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radarData} outerRadius={80}>
                  <PolarGrid stroke="rgba(148, 163, 184, 0.5)" />
                  <PolarAngleAxis
                    dataKey="skill"
                    tick={{ fill: "#e5e7eb", fontSize: 12 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="hsl(245, 58%, 51%)"
                    fill="hsl(245, 58%, 51%)"
                    fillOpacity={0.4}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Continue Practice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="card-subtitle">Last topic</p>
            <p className="card-heading">Dynamic Programming</p>

            <div className="progress-row">
              <span className="progress-label">3 / 10 completed</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(3 / 10) * 100}%` }}
              />
            </div>

            <button type="button" className="btn btn-primary card-cta">
              Continue
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="card-heading">Problems Solved: 12 / 20 this week</p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(12 / 20) * 100}%` }}
              />
            </div>

            <div className="week-days">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day, index) => {
                  const hadActivity = index < 5; // activity on weekdays
                  return (
                    <div
                      key={day}
                      className={`week-day ${hadActivity ? "week-day--active" : ""}`}
                    >
                      <span>{day[0]}</span>
                    </div>
                  );
                },
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="assessments-list">
              <li className="assessments-item">
                <div className="assessments-title">DSA Mock Test</div>
                <div className="assessments-meta">Tomorrow, 10:00 AM</div>
              </li>
              <li className="assessments-item">
                <div className="assessments-title">System Design Review</div>
                <div className="assessments-meta">Wed, 2:00 PM</div>
              </li>
              <li className="assessments-item">
                <div className="assessments-title">HR Interview Prep</div>
                <div className="assessments-meta">Friday, 11:00 AM</div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

