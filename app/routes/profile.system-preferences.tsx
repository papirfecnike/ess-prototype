import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Select } from "@/components/ui/select/Select";
import { Toggle } from "@/components/ui/toggle/Toggle";
import { Notification } from "@/components/ui/notification/Notification";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ProfileSystemPreferences() {
  /* =========================
     STATE
     ========================= */

  const [language, setLanguage] = useState<string | null>("en");
  const [timezone, setTimezone] = useState<string | null>("Europe/Oslo");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [workflowUpdates, setWorkflowUpdates] = useState(true);

  const [showNotification, setShowNotification] = useState(false);

  /* =========================
     HELPERS
     ========================= */

  function notifyChange() {
    setShowNotification(true);
  }

  function update<T>(setter: (v: T) => void, value: T) {
    setter(value);
    notifyChange();
  }

  /* =========================
     OPTIONS
     ========================= */

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "no", label: "Norwegian" },
    { value: "sv", label: "Swedish" },
    { value: "da", label: "Danish" },
  ];

  const timezoneOptions = [
    { value: "Europe/Oslo", label: "Europe / Oslo (UTC+1)" },
    { value: "Europe/Stockholm", label: "Europe / Stockholm (UTC+1)" },
    { value: "Europe/Copenhagen", label: "Europe / Copenhagen (UTC+1)" },
    { value: "UTC", label: "UTC" },
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

            {/* ================= REGIONAL SETTINGS ================= */}

            <Card>
              <div className="settings-card-title">
                Regional settings
              </div>

              <div className="settings-card-row--full">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Preferred language
                  </div>
                </div>

                <div className="settings-card-control">
                  <Select
                    variant="single"
                    label="Language"
                    value={language}
                    onChange={(v) => update(setLanguage, v)}
                    options={languageOptions}
                  />
                </div>
              </div>

              <div className="settings-card-row--full">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Timezone
                  </div>
                </div>

                <div className="settings-card-control">
                  <Select
                    variant="single"
                    label="Timezone"
                    value={timezone}
                    onChange={(v) => update(setTimezone, v)}
                    options={timezoneOptions}
                  />
                </div>
              </div>
            </Card>

            {/* ================= NOTIFICATIONS ================= */}

            <Card>
              <div className="settings-card-title">
                Notifications
              </div>

              <div className="settings-card-toggle--row">
                <Toggle
                  title="Email notifications"
                  description="Receive important information through mail"
                  checked={emailNotifications}
                  onCheckedChange={(v) => update(setEmailNotifications, v)}
                />
              </div>

              <div className="settings-card-toggle--row">
                <Toggle
                  title="Push notifications"
                  description="Receive push notifications on your device"
                  checked={pushNotifications}
                  onCheckedChange={(v) => update(setPushNotifications, v)}
                />
              </div>

              <div className="settings-card-toggle--row">
                <Toggle
                  title="Critical alerts"
                  description="Always get notification about critical system alerts"
                  checked={criticalAlerts}
                  onCheckedChange={(v) => update(setCriticalAlerts, v)}
                />
              </div>

              <div className="settings-card-toggle">
                <Toggle
                  title="Workflow updates"
                  description="Get notified when workflow changes"
                  checked={workflowUpdates}
                  onCheckedChange={(v) => update(setWorkflowUpdates, v)}
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
          title="Preferences updated"
          message="Your changes have been saved."
          onClose={() => setShowNotification(false)}
        />
      )}
    </PageLayout>
  );
}
