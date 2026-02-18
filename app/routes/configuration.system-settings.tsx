import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { TextField } from "@/components/ui/input/TextField";
import { Select } from "@/components/ui/select/Select";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Toggle } from "@/components/ui/toggle/Toggle";
import { Notification } from "@/components/ui/notification/Notification";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ConfigurationSystemSettings() {
  /* =========================
     STATE
     ========================= */

  const [collisionAvoidance, setCollisionAvoidance] = useState(true);
  const [maxActiveRobots, setMaxActiveRobots] = useState("50");
  const [robotSpeed, setRobotSpeed] = useState<string | null>("medium");

  const [autoAssign, setAutoAssign] = useState(true);
  const [maxOrderQueue, setMaxOrderQueue] = useState("500");
  const [waveSize, setWaveSize] = useState("50");

  const [severityLevel, setSeverityLevel] = useState<string | null>("medium");
  const [emailAlerts, setEmailAlerts] = useState(true);

  const [logRetention, setLogRetention] = useState("90");
  const [enableCaching, setEnableCaching] = useState(true);

  const [showNotification, setShowNotification] = useState(false);

  /* =========================
     HELPERS
     ========================= */

  function triggerNotification() {
    setShowNotification(true);
  }

  /* =========================
     OPTIONS
     ========================= */

  const robotSpeedOptions = [
    { value: "slow", label: "Slow" },
    { value: "medium", label: "Medium" },
    { value: "fast", label: "Fast" },
  ];

  const severityLevels = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "critical", label: "Critical" },
  ];

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="System preferences"
      subtitle="Configure regional settings and notification preferences"
    >
      <PageSection>
        <div className="settings-page">
          <div className="settings-section">

{/* ================= ROBOT CONFIG ================= */}

            <Card>
              <div className="settings-card-title">
                Robot configuration
              </div>

              <div className="settings-card-row-twocol">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Max. active robots
                  </div>
                  <div className="settings-card-description">
                    Maximum number of robots that can be active simultaneously
                  </div>
                </div>

                <div className="settings-card-control">
                  <TextField
                    label="Max. active robots"
                    value={maxActiveRobots}
                    onChange={(e) => {
                      setMaxActiveRobots(e.target.value);
                      triggerNotification();
                    }}
                  />
                </div>
              </div>

              <div className="settings-card-row-twocol">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Robot speed
                  </div>
                  <div className="settings-card-description">
                    Default speed setting for robots
                  </div>
                </div>

                <div className="settings-card-control">
                  <Select
                    variant="single"
                    label="Speed"
                    value={robotSpeed}
                    onChange={(v) => {
                      setRobotSpeed(v);
                      triggerNotification();
                    }}
                    options={robotSpeedOptions}
                  />
                </div>
              </div>

              <div className="settings-card-toggle">
                <Toggle
                  title="Enable collision avoidance"
                  description="Activate advanced collision detection and avoidance"
                  checked={collisionAvoidance}
                  onCheckedChange={(v) => {
                    setCollisionAvoidance(v);
                    triggerNotification();
                  }}
                />
              </div>
            </Card>

{/* ================= ORDER PROCESSING ================= */}

            <Card>
              <div className="settings-card-title">
                Order processing
              </div>

              <div className="settings-card-row-twocol">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Max. order queue size
                  </div>
                  <div className="settings-card-description">
                    Maximum number of orders in processing queue
                  </div>
                </div>

                <div className="settings-card-control">
                  <TextField
                    label="Max. order queue"
                    value={maxOrderQueue}
                    onChange={(e) => {
                      setMaxOrderQueue(e.target.value);
                      triggerNotification();
                    }}
                  />
                </div>
              </div>

              <div className="settings-card-row-twocol">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Wave size
                  </div>
                  <div className="settings-card-description">
                    Number of orders per picking wave
                  </div>
                </div>

                <div className="settings-card-control">
                  <TextField
                    label="Wave size"
                    value={waveSize}
                    onChange={(e) => {
                      setWaveSize(e.target.value);
                      triggerNotification();
                    }}
                  />
                </div>
              </div>

              <div className="settings-card-toggle">
                <Toggle
                  title="Auto-assign orders"
                  description="Automatically assign orders to available operators"
                  checked={autoAssign}
                  onCheckedChange={(v) => {
                    setAutoAssign(v);
                    triggerNotification();
                  }}
                />
              </div>
            </Card>

{/* ================= NOTIFICATIONS ================= */}

            <Card>
              <div className="settings-card-title">
                Notifications
              </div>

              <div className="settings-card-row-twocol">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Alert threshold
                  </div>
                  <div className="settings-card-description">
                    Min. severity level for alerts
                  </div>
                </div>

                <div className="settings-card-control">
                  <Select
                    variant="single"
                    label="Severity"
                    value={severityLevel}
                    onChange={(v) => {
                      setSeverityLevel(v);
                      triggerNotification();
                    }}
                    options={severityLevels}
                  />
                </div>
              </div>

              <div className="settings-card-toggle">
                <Toggle
                  title="Email alerts"
                  description="Send email notifications for critical events"
                  checked={emailAlerts}
                  onCheckedChange={(v) => {
                    setEmailAlerts(v);
                    triggerNotification();
                  }}
                />
              </div>
            </Card>

{/* ================= PERFORMANCE ================= */}

            <Card>
              <div className="settings-card-title">
                Performance
              </div>

              <div className="settings-card-row-twocol">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Log retention days
                  </div>
                  <div className="settings-card-description">
                    Number of days to retain system logs
                  </div>
                </div>

                <div className="settings-card-control">
                  <TextField
                    label="Log retention"
                    value={logRetention}
                    onChange={(e) => {
                      setLogRetention(e.target.value);
                      triggerNotification();
                    }}
                  />
                </div>
              </div>

              <div className="settings-card-toggle">
                <Toggle
                  title="Enable caching"
                  description="Enable system-wide caching for improved performance"
                  checked={enableCaching}
                  onCheckedChange={(v) => {
                    setEnableCaching(v);
                    triggerNotification();
                  }}
                />
              </div>
            </Card>

          </div>
        </div>
      </PageSection>

      {/* ================= NOTIFICATION ================= */}

      {showNotification && (
        <Notification
          intent="success"
          title="Settings updated"
          message="Your system settings have been saved."
          onClose={() => setShowNotification(false)}
        />
      )}
    </PageLayout>
  );
}
