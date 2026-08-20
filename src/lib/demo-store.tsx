import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  SEED_REPORTS,
  USER_REPORT,
  WARD_RISK_HISTORY,
  scoreToRisk,
  type DemoReport,
  type ReportCategory,
  type RiskLevel,
} from "@/data/demo";

const STORAGE_KEY = "waterwatch-demo-v1";

export interface DraftReport {
  category: ReportCategory;
  severity: "low" | "medium" | "high";
  description: string;
  duration: string;
  street: string;
  photo: boolean;
}

interface DemoState {
  submitted: boolean;
  verified: boolean;
  alertSeen: boolean;
  investigating: boolean;
  draft: DraftReport | null;
}

const initialState: DemoState = {
  submitted: false,
  verified: false,
  alertSeen: false,
  investigating: false,
  draft: null,
};

interface DemoContextValue extends DemoState {
  reports: DemoReport[];
  userReport: DemoReport | null;
  riskScore: number;
  riskLevel: RiskLevel;
  baseRiskScore: number;
  history: { day: string; score: number; reports: number }[];
  submitReport: (draft: DraftReport) => void;
  verifyReport: () => void;
  markAlertSeen: () => void;
  flagInvestigation: () => void;
  resetDemo: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

const BASE_SCORE = 55;
const RAISED_SCORE = 66;

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...initialState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback((next: DemoState) => {
    setState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<DemoContextValue>(() => {
    const userReport: DemoReport | null = state.submitted
      ? {
          ...USER_REPORT,
          category: state.draft?.category ?? USER_REPORT.category,
          description: state.draft?.description || USER_REPORT.description,
          severity: state.draft?.severity ?? USER_REPORT.severity,
          street: state.draft?.street || USER_REPORT.street,
          verifications: state.verified ? 3 : 0,
          status: state.verified ? "contributing" : "pending",
        }
      : null;

    const reports = userReport ? [userReport, ...SEED_REPORTS] : SEED_REPORTS;
    const riskScore = state.verified ? RAISED_SCORE : BASE_SCORE;
    const history = WARD_RISK_HISTORY.map((point, i) =>
      i === WARD_RISK_HISTORY.length - 1 ? { ...point, score: riskScore } : point,
    );

    return {
      ...state,
      reports,
      userReport,
      riskScore,
      riskLevel: scoreToRisk(riskScore),
      baseRiskScore: BASE_SCORE,
      history,
      submitReport: (draft) => persist({ ...state, submitted: true, draft }),
      verifyReport: () => persist({ ...state, verified: true }),
      markAlertSeen: () => persist({ ...state, alertSeen: true }),
      flagInvestigation: () => persist({ ...state, investigating: true }),
      resetDemo: () => persist(initialState),
    };
  }, [state, persist]);

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
