import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Icon } from "@/components/ui/icon/Icon";
import { Button } from "@/components/ui/button/Button";

export const loader: LoaderFunction = async () => null;

/* =========================
   TYPES
   ========================= */

type Step = {
  id: number;
  title: string;
  mode: "manual" | "automated";
  duration: string;
  role: string;
  active: boolean;
};

type Workflow = {
  id: number;
  name: string;
  description: string;
  totalTime: string;
  steps: Step[];
};

/* =========================
   COMPONENT
   ========================= */

export default function ConfigurationInbound() {

  const [workflows] = useState<Workflow[]>([
    {
      id: 1,
      name: "Standard Receiving",
      description: "Default workflow for regular inbound shipments",
      totalTime: "41 min",
      steps: [
        { id: 1, title: "Check-in at Dock", mode: "manual", duration: "5 min", role: "Operator", active: true },
        { id: 2, title: "Scan Pallet Labels", mode: "manual", duration: "10 min", role: "Operator", active: true },
        { id: 3, title: "Quality Inspection", mode: "manual", duration: "15 min", role: "Supervisor", active: true },
        { id: 4, title: "System Validation", mode: "automated", duration: "2 min", role: "System", active: true },
        { id: 5, title: "Assign Putaway Compartment", mode: "automated", duration: "1 min", role: "System", active: true },
        { id: 6, title: "Putaway to Bin", mode: "manual", duration: "8 min", role: "Operator", active: true },
      ],
    },

    {
      id: 2,
      name: "Express Receiving",
      description: "Fast-track workflow for urgent inbound shipments",
      totalTime: "13 min",
      steps: [
        { id: 1, title: "Priority Check-in", mode: "manual", duration: "3 min", role: "Supervisor", active: true },
        { id: 2, title: "Quick Scan", mode: "manual", duration: "5 min", role: "Operator", active: true },
        { id: 3, title: "Direct Putaway", mode: "automated", duration: "5 min", role: "System", active: true },
      ],
    },
  ]);

  return (
    <PageLayout
      title="Inbound workflows"
      subtitle="Configure inbound processing steps"
    >
      <PageSection>

        {workflows.map((workflow) => (

          <Card key={workflow.id}>

            {/* HEADER */}

            <div className="workflow-header">

              <div>
                <div className="workflow-title">
                  {workflow.name}
                </div>

                <div className="workflow-description">
                  {workflow.description}
                </div>
              </div>

              <div className="workflow-header-right">

                <div className="workflow-time">
                  <Icon name="clock" size="sm" />
                  <strong>{workflow.totalTime}</strong>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  leadingIcon="edit"
                >
                  Edit
                </Button>

              </div>

            </div>

            {/* STEPS */}

            <div className="workflow-steps">

              {workflow.steps.map((step, index) => (

                <div
                  key={step.id}
                  className="workflow-row"
                >

                  {/* LEFT TIMELINE */}

                  <div className="workflow-left">

                    <div className="workflow-number">
                      {index + 1}
                    </div>

                    {index < workflow.steps.length - 1 && (
                      <div className="workflow-line" />
                    )}

                  </div>

                  {/* STEP CARD */}

                  <div className="workflow-step">

                    <div className="workflow-step-main">

                      <div className="workflow-step-title">

                        {step.title}

                        <span
                          className={`workflow-badge workflow-badge--${step.mode}`}
                        >
                          {step.mode}
                        </span>

                      </div>

                      <div className="workflow-meta">

                        <span>
                          <Icon name="clock" size="xs" /> {step.duration}
                        </span>

                        <span>
                          <Icon name="user" size="xs" /> {step.role}
                        </span>

                      </div>

                    </div>

                    {step.active && (
                      <div className="workflow-status">
                        Active
                      </div>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </Card>

        ))}

      </PageSection>
    </PageLayout>
  );
}