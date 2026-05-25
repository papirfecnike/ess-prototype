import type { LoaderFunction } from "react-router";
import { useSearchParams } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button/Button";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { Icon } from "@/components/ui/icon/Icon";

import "@/styles/product-page.css";
import "@/styles/outbound-picking.css";

export const loader: LoaderFunction = async () => null;

const suspendedTasks = [
  {
    id: "12671261811",
    title: "12671261811",
    timestamp: "2026-05-11T09:22:02",
    group: "Retails",
    progress: "9/32",
    port: "Port 04",
    operator: "t.henrikssen",
  },
  {
    id: "12671261812",
    title: "34256170701",
    timestamp: "2026-05-11T09:22:47",
    group: "Singles",
    progress: "12/40",
    port: "Port 03",
    operator: "You",
  },
  {
    id: "12671261813",
    title: "89472349892",
    timestamp: "2026-05-11T09:22:36",
    group: "Multies",
    progress: "31/57",
    port: "Port 01",
    operator: "j.taylor",
  },
];

export default function OutboundPicking() {
  const [searchParams] = useSearchParams();
  const initialTask = searchParams.get("task");
  const taskHasSuspendedItems = suspendedTasks.some(task => {
    const normalizedGroup = task.group.toLowerCase();
    const normalizedTask = String(initialTask ?? "").toLowerCase();
    return normalizedGroup.startsWith(normalizedTask) || normalizedGroup.startsWith(`${normalizedTask}s`);
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(searchParams.get("suspended") === "true" && taskHasSuspendedItems);
  const [resumeTaskId, setResumeTaskId] = useState<string | null>(null);

  function startPicking() {
    window.location.assign("/outbound/picking-product");
  }

  return (
    <PageLayout
      title="Picking"
      subtitle="Retrieve items from storage compartments based on picking instructions"
    >
      <PageSection>
        <div className="picking-launch">
          <Button variant="context" onClick={startPicking}>
            Retail
          </Button>
          <Button variant="context" onClick={startPicking}>
            Singles
          </Button>
          <Button variant="context" onClick={startPicking}>
            Multies
          </Button>
        </div>
      </PageSection>

      <aside className={["product-drawer", "picking-product-drawer", isDrawerOpen ? "product-drawer--open" : ""].join(" ")}>
        <div className="product-drawer__rail">
          <div className="product-drawer__rail-main">
            <button
              type="button"
              className="product-drawer__icon picking-suspended__icon"
              aria-label="Suspended tasks"
              onClick={() => setIsDrawerOpen(open => !open)}
            >
              <Icon name="history" size="md" />
              {suspendedTasks.length > 0 && <span className="picking-suspended__indicator" />}
            </button>
          </div>

          <div className="product-drawer__panel-close">
            <button
              type="button"
              className={[
                "product-drawer__close",
                isDrawerOpen ? "is-open" : "is-closed",
              ].join(" ")}
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close drawer"
            >
              <Icon name={isDrawerOpen ? "chevronRightStroke" : "chevronLeftStroke"} size="sm" />
            </button>
          </div>
        </div>

        {isDrawerOpen && (
          <div className="product-drawer__panel">
            <div className="product-drawer__panel-content">
              <div className="drawer-section">
                <div className="drawer-section-item picking-suspended__drawer-title">
                  <div className="drawer-section-item-title">Suspended task groups</div>
                  <div className="picking-suspended__subtitle">Task groups assigned to another operator</div>
                </div>

                <div className="drawer-section-itemsgroup">
                  {suspendedTasks.map(task => (
                    <button
                      key={task.id}
                      type="button"
                      className="picking-suspended__task"
                      onClick={() => setResumeTaskId(task.id)}
                    >
                      <span className="picking-suspended__task-top">
                        <span className="picking-suspended__timestamp">
                          <Icon name="clock" size="sm" />
                          {task.timestamp}
                        </span>
                        <span className="picking-suspended__group">{task.group}</span>
                      </span>
                      <span className="picking-suspended__task-title">{task.title}</span>
                      <span className="picking-suspended__task-bottom">
                        <span className="picking-suspended__assignee">
                          <Icon name="user" size="sm" />
                          {task.operator}
                        </span>
                        <span className="picking-suspended__status">
                          <Icon name="checkCircle" size="sm" />
                          {task.progress}
                        </span>
                        <span className="picking-suspended__port">
                          <Icon name="locationOn" size="sm" />
                          {task.port}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      <Dialog
        isOpen={Boolean(resumeTaskId)}
        intent="error"
        title="Resume suspended task"
        footerLeft={
          <Button variant="ghost" onClick={() => setResumeTaskId(null)}>
            Cancel
          </Button>
        }
        footerRight={
          <Button variant="primary" intent="danger" onClick={startPicking}>
            Take over & resume
          </Button>
        }
      >
        <div className="picking-resume-dialog__content">
          <p className="picking-resume-dialog__lead">
            The selected task group is assigned to another operator.
          </p>
          <p>
            You can resume and work on "{resumeTaskId}" at your current port (Port 01).
          </p>
          </div>
      </Dialog>
    </PageLayout>
  );
}
