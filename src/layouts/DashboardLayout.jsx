import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Code2,
  ClipboardList,
  BookOpen,
  User,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/practice", label: "Practice", icon: Code2 },
  { to: "/dashboard/assessments", label: "Assessments", icon: ClipboardList },
  { to: "/dashboard/resources", label: "Resources", icon: BookOpen },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

export function DashboardLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">Placement Readiness</div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  ["sidebar-link", isActive && "sidebar-link--active"]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <Icon className="sidebar-link-icon" aria-hidden="true" />
                <span className="sidebar-link-label">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="shell-main">
        <header className="shell-header">
          <div className="shell-header-title">
            <h1>Placement Prep</h1>
            <p>Structured preparation space for your next opportunity.</p>
          </div>
          <div className="shell-header-user">
            <div className="avatar-placeholder" aria-hidden="true">
              PR
            </div>
          </div>
        </header>

        <main className="shell-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

