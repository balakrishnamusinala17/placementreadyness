const SKILL_CATEGORIES = [
  {
    id: "core",
    label: "Core CS",
    skills: ["DSA", "OOP", "DBMS", "OS", "Networks"],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      "Java",
      "Python",
      "JavaScript",
      "TypeScript",
      "C",
      "C++",
      "C#",
      "Go",
    ],
  },
  {
    id: "web",
    label: "Web",
    skills: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
  },
  {
    id: "data",
    label: "Data",
    skills: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    skills: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
  },
  {
    id: "testing",
    label: "Testing",
    skills: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"],
  },
];

const HISTORY_KEY = "placement_readiness_history_v1";
const LAST_ID_KEY = "placement_readiness_last_id_v1";

export function extractSkills(jdText) {
  const text = jdText.toLowerCase();
  const categories = SKILL_CATEGORIES.map((cat) => {
    const matches = cat.skills.filter((s) => text.includes(s.toLowerCase()));
    return {
      id: cat.id,
      label: cat.label,
      skills: matches,
    };
  });

  const hasAny = categories.some((c) => c.skills.length > 0);

  return {
    categories,
    hasAny,
    fallback: hasAny ? null : "General fresher stack",
  };
}

function baseChecklist() {
  return [
    {
      round: "Round 1: Aptitude / Basics",
      items: [
        "Brush up quantitative aptitude (ratios, percentages, probability).",
        "Revise basic programming constructs (loops, arrays, functions).",
        "Prepare a 60-second self-introduction tailored to the role.",
        "Review company overview and recent products.",
        "Practice at least two full-length mock aptitude tests.",
      ],
    },
    {
      round: "Round 2: DSA + Core CS",
      items: [],
    },
    {
      round: "Round 3: Tech interview (projects + stack)",
      items: [],
    },
    {
      round: "Round 4: Managerial / HR",
      items: [
        "Prepare examples for teamwork, conflict resolution, and ownership.",
        "List 3 stories that show learning from failure.",
        "Clarify your role and impact in each project on your resume.",
        "Prepare 3–5 thoughtful questions to ask the interviewer.",
        "Align salary expectations and location preferences.",
      ],
    },
  ];
}

export function buildChecklist(extracted) {
  const rounds = baseChecklist();
  const coreCat = extracted.categories.find((c) => c.id === "core");
  const hasDSA = coreCat?.skills.includes("DSA");
  const hasCore = coreCat && coreCat.skills.length > 0;

  const languagesCat = extracted.categories.find((c) => c.id === "languages");
  const hasJava = languagesCat?.skills.includes("Java");
  const hasPython = languagesCat?.skills.includes("Python");

  const webCat = extracted.categories.find((c) => c.id === "web");
  const hasReact = webCat?.skills.includes("React");
  const hasNode = webCat?.skills.includes("Node.js");

  const dataCat = extracted.categories.find((c) => c.id === "data");
  const hasSQL = dataCat?.skills.includes("SQL");

  const cloudCat = extracted.categories.find((c) => c.id === "cloud");
  const hasCloud = cloudCat && cloudCat.skills.length > 0;

  const testingCat = extracted.categories.find((c) => c.id === "testing");
  const hasTesting = testingCat && testingCat.skills.length > 0;

  const round2 = rounds[1];
  const round3 = rounds[2];

  round2.items.push(
    "Revisit time and space complexity for your 5 most common patterns.",
  );

  if (hasDSA) {
    round2.items.push(
      "Practice arrays, strings, and hashing problems under timed conditions.",
      "Solve at least 5 graph / tree problems relevant to the JD.",
    );
  }

  if (hasCore) {
    round2.items.push(
      "Revise DBMS topics: normalization, transactions, indexing, and joins.",
      "Review OS basics: processes vs threads, scheduling, and deadlocks.",
      "Refresh computer networks: OSI model, TCP vs UDP, HTTP/HTTPS basics.",
    );
  }

  if (round2.items.length < 5) {
    round2.items.push(
      "Summarize key formulas and definitions for quick last-minute revision.",
    );
  }

  if (hasReact || hasNode) {
    round3.items.push(
      "Prepare to walk through one end-to-end project built with your web stack.",
    );
  }

  if (hasReact) {
    round3.items.push(
      "Revise React fundamentals: hooks, state management, and component design.",
      "Be ready to discuss performance topics like memoization and lazy loading.",
    );
  }

  if (hasNode) {
    round3.items.push(
      "Review how your backend handles routing, validation, and error handling.",
    );
  }

  if (hasSQL) {
    round3.items.push(
      "Prepare to sketch database schemas and explain key queries you wrote.",
    );
  }

  if (hasCloud) {
    round3.items.push(
      "Map your projects to cloud services used (compute, storage, networking).",
    );
  }

  if (hasTesting) {
    round3.items.push(
      "Review how you wrote and executed tests (unit, integration, or E2E).",
    );
  }

  if (round3.items.length < 5) {
    round3.items.push(
      "Pick one project and practice a clear, structured 5-minute walkthrough.",
    );
  }

  return rounds;
}

export function buildPlan(extracted) {
  const webCat = extracted.categories.find((c) => c.id === "web");
  const hasReact = webCat?.skills.includes("React");
  const hasNode = webCat?.skills.includes("Node.js");

  const dataCat = extracted.categories.find((c) => c.id === "data");
  const hasSQL = dataCat?.skills.includes("SQL");

  const cloudCat = extracted.categories.find((c) => c.id === "cloud");
  const hasCloud = cloudCat && cloudCat.skills.length > 0;

  const days = [
    {
      day: "Day 1",
      focus: "Basics + Core CS",
      items: [
        "Refresh language fundamentals and syntax.",
        "Revise data structures overview and key complexity concepts.",
      ],
    },
    {
      day: "Day 2",
      focus: "Core CS continued",
      items: [
        "Deep dive into DBMS, OS, and networking topics based on the JD.",
        "Create a one-page summary of formulas and definitions.",
      ],
    },
    {
      day: "Day 3",
      focus: "DSA + Coding Practice",
      items: [
        "Solve 3–5 easy and 3–5 medium problems from common patterns.",
        "Time-box each problem and reflect on patterns used.",
      ],
    },
    {
      day: "Day 4",
      focus: "DSA + System Thinking",
      items: [
        "Attempt at least 2 mock test sessions under interview timing.",
        "Review solutions and write down 3 learnings per session.",
      ],
    },
    {
      day: "Day 5",
      focus: "Project + Resume Alignment",
      items: [
        "Align resume bullets with the stack and role mentioned in the JD.",
        "Prepare structured stories for 2–3 key projects.",
      ],
    },
    {
      day: "Day 6",
      focus: "Mock Interviews",
      items: [
        "Run at least one mock interview focused on the target role.",
        "Capture feedback and refine your answers.",
      ],
    },
    {
      day: "Day 7",
      focus: "Revision + Weak Areas",
      items: [
        "Revisit questions you struggled with and write improved solutions.",
        "Do a calm, focused revision of summaries and notes only.",
      ],
    },
  ];

  if (hasReact || hasNode) {
    days[3].items.push(
      "Review one full feature flow in your web stack (frontend to backend).",
    );
  }

  if (hasReact) {
    days[2].items.push(
      "Revise React hooks and state management patterns used in your projects.",
    );
  }

  if (hasSQL) {
    days[1].items.push(
      "Practice writing queries with joins, grouping, and indexing scenarios.",
    );
  }

  if (hasCloud) {
    days[4].items.push(
      "Summarize how your projects use cloud or DevOps tooling mentioned in the JD.",
    );
  }

  return days;
}

export function buildQuestions(extracted) {
  const textQuestions = [];

  const hasSkill = (id, name) => {
    const cat = extracted.categories.find((c) => c.id === id);
    return cat?.skills.includes(name) ?? false;
  };

  if (hasSkill("data", "SQL")) {
    textQuestions.push(
      "Explain indexing in SQL and when it improves query performance.",
      "How would you design a schema for tracking student test attempts?",
    );
  }

  if (hasSkill("web", "React")) {
    textQuestions.push(
      "Compare local state, context, and external state libraries in React.",
      "How do you prevent unnecessary re-renders in a React component tree?",
    );
  }

  if (hasSkill("web", "Node.js")) {
    textQuestions.push(
      "How would you design error handling middleware in a Node.js/Express API?",
    );
  }

  if (hasSkill("core", "DSA")) {
    textQuestions.push(
      "How would you search efficiently in a nearly sorted array?",
      "Describe a problem where using a heap is more suitable than sorting.",
    );
  }

  if (hasSkill("core", "OOP")) {
    textQuestions.push(
      "Explain SOLID principles with an example from your projects.",
    );
  }

  if (hasSkill("cloud", "AWS")) {
    textQuestions.push(
      "How would you host a simple web application on AWS with basic scalability?",
    );
  }

  if (hasSkill("testing", "Selenium") || hasSkill("testing", "Cypress")) {
    textQuestions.push(
      "What is the difference between unit, integration, and end-to-end tests?",
    );
  }

  if (textQuestions.length < 10) {
    textQuestions.push(
      "Walk me through a recent bug you debugged end-to-end.",
      "How do you ensure the quality of code you write under time pressure?",
      "Describe a time you simplified a complex piece of logic.",
      "How do you prepare for a system design interview at a high level?",
    );
  }

  return textQuestions.slice(0, 10);
}

export function computeReadinessScore({
  jdText,
  company,
  role,
  extracted,
}) {
  let score = 35;

  const categoriesPresent = extracted.categories.filter(
    (c) => c.skills.length > 0,
  ).length;

  score += Math.min(categoriesPresent * 5, 30);

  if (company.trim()) score += 10;
  if (role.trim()) score += 10;
  if (jdText && jdText.length > 800) score += 10;

  return Math.min(score, 100);
}

export function loadHistory() {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveHistory(history) {
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

export function setLastAnalysisId(id) {
  try {
    window.localStorage.setItem(LAST_ID_KEY, id);
  } catch {
    // ignore
  }
}

export function getLastAnalysisId() {
  try {
    return window.localStorage.getItem(LAST_ID_KEY);
  } catch {
    return null;
  }
}

export function findEntryById(history, id) {
  return history.find((entry) => entry.id === id) || null;
}

