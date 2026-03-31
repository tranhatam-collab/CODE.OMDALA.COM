import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

type MetricPoint = {
  week: string;
  clarity: number;
  stability: number;
  value: number;
  legacy: number;
};

type ActionItem = {
  id: string;
  text: string;
  status: "pending" | "done";
};

type DashboardProps = {
  userName?: string;
  metrics: {
    clarity: number;
    stability: number;
    value: number;
    legacy: number;
  };
  trend: MetricPoint[];
  riskLevel: "normal" | "moderate_risk" | "high_risk";
  actions: ActionItem[];
  onStartCheckin?: () => void;
  onOpenFlows?: () => void;
};

const metricCards = [
  { key: "clarity", label: "Clarity" },
  { key: "stability", label: "Stability" },
  { key: "value", label: "Value" },
  { key: "legacy", label: "Legacy" }
] as const;

function riskLabel(level: DashboardProps["riskLevel"]): string {
  if (level === "high_risk") return "High risk";
  if (level === "moderate_risk") return "Moderate risk";
  return "Stable";
}

function riskMessage(level: DashboardProps["riskLevel"]): string {
  if (level === "high_risk") {
    return "Your pattern suggests overload. Reduce pressure first before adding new commitments.";
  }
  if (level === "moderate_risk") {
    return "You are still functioning, but drift is visible. Protect sleep and focus this week.";
  }
  return "Your current rhythm is relatively stable. Preserve what is working.";
}

export default function LifeDashboard({
  userName = "You",
  metrics,
  trend,
  riskLevel,
  actions,
  onStartCheckin,
  onOpenFlows
}: DashboardProps) {
  const average = useMemo(() => {
    return Math.round(
      (metrics.clarity + metrics.stability + metrics.value + metrics.legacy) / 4
    );
  }, [metrics]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm text-neutral-400">Life OS</p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {userName}&rsquo;s Life Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-400 md:text-base">
              Measure your current state, protect your rhythm, and act on one
              meaningful improvement each week.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onOpenFlows}
              className="rounded-xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 hover:border-neutral-500"
            >
              Open Flows
            </button>
            <button
              onClick={onStartCheckin}
              className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-200"
            >
              Start Weekly Check-in
            </button>
          </div>
        </header>

        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {metricCards.map((card) => {
            const value = metrics[card.key];
            return (
              <div
                key={card.key}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5 shadow-sm"
              >
                <div className="text-sm text-neutral-400">{card.label}</div>
                <div className="mt-3 text-3xl font-semibold">
                  {Math.round(value)}%
                </div>
                <div className="mt-2 text-xs text-neutral-500">
                  Current weekly signal
                </div>
              </div>
            );
          })}
        </section>

        <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">12-Week Trend</h2>
                <p className="text-sm text-neutral-400">
                  Longitudinal view of the 4 core dimensions
                </p>
              </div>
              <div className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300">
                Average: {average}%
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid stroke="#262626" strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke="#737373" fontSize={12} />
                  <YAxis stroke="#737373" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a0a0a",
                      border: "1px solid #262626",
                      borderRadius: 12,
                      color: "#fff"
                    }}
                  />
                  <Line type="monotone" dataKey="clarity" stroke="#ffffff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="stability" stroke="#a3a3a3" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="value" stroke="#737373" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="legacy" stroke="#525252" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
              <h2 className="text-lg font-semibold">Risk Signal</h2>
              <div className="mt-3 inline-flex rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-200">
                {riskLabel(riskLevel)}
              </div>
              <p className="mt-4 text-sm leading-6 text-neutral-300">
                {riskMessage(riskLevel)}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
              <h2 className="text-lg font-semibold">This Week Actions</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Keep it small. Execute one by one.
              </p>

              <div className="mt-4 space-y-3">
                {actions.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-neutral-700 p-4 text-sm text-neutral-500">
                    No active actions yet.
                  </div>
                ) : (
                  actions.map((action) => (
                    <div
                      key={action.id}
                      className="rounded-xl border border-neutral-800 bg-neutral-950 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm leading-6 text-neutral-200">
                          {action.text}
                        </p>
                        <span className="rounded-full border border-neutral-700 px-2 py-1 text-[10px] uppercase tracking-wide text-neutral-400">
                          {action.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-5">
          <h2 className="text-lg font-semibold">Interpretation</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300">
            This dashboard is not a motivational scorecard. It is a weekly
            operating signal. When clarity drops, define fewer priorities. When
            stability drops, protect sleep and nervous-system recovery first.
            When value drops, reduce busy work and return to measurable output.
            When legacy drops, reconnect with contribution and longer-term
            direction.
          </p>
        </section>
      </div>
    </div>
  );
}
