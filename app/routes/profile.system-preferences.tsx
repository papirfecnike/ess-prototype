import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Select } from "@/components/ui/select/Select";
import { Toggle } from "@/components/ui/toggle/Toggle";

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

  return (
    <PageLayout
      title="System preferences"
      subtitle="Configure regional settings and notification preferences"
    >
      <PageSection>
        <div className="profile-page">
          {/* ===== SECTION: REGION SETTINGS ===== */}
          <div className="profile-section">
            <div className="profile-section__label">
              Region settings
            </div>

            <Card>
              <div className="profile-card-row profile-card-row--two-col">
                <div className="profile-card-label">
                  Preferred language
                </div>

                <div className="profile-card-fields">
                  <Select
                    label="Language"
                    value={language}
                    onChange={setLanguage}
                    options={languageOptions}
                  />
                </div>
              </div>

              <div className="profile-card-row profile-card-row--two-col">
                <div className="profile-card-label">
                  Timezone
                </div>

                <div className="profile-card-fields">
                  <Select
                    label="Timezone"
                    value={timezone}
                    onChange={setTimezone}
                    options={timezoneOptions}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* ===== SECTION: NOTIFICATIONS ===== */}
          <div className="profile-section">
            <div className="profile-section__label">
              Notifications
            </div>

            <Card>
              <div className="profile-card-row profile-card-row--one-col">
                <div className="profile-card-fields">
                  <Toggle
                    title="Email notifications"
                    description="Receive notifications via email"
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                </div>
              </div>

              <div className="profile-card-row profile-card-row--one-col">
                <div className="profile-card-fields">
                  <Toggle
                    title="Push notifications"
                    description="Receive push notifications on your device"
                    checked={pushNotifications}
                    onChange={setPushNotifications}
                  />
                </div>
              </div>

              <div className="profile-card-row profile-card-row--one-col">
                <div className="profile-card-fields">
                  <Toggle
                    title="Critical alerts"
                    description="Always notify me about critical system alerts"
                    checked={criticalAlerts}
                    onChange={setCriticalAlerts}
                  />
                </div>
              </div>

              <div className="profile-card-row profile-card-row--one-col">
                <div className="profile-card-fields">
                  <Toggle
                    title="Workflow updates"
                    description="Notify me when workflows change or complete"
                    checked={workflowUpdates}
                    onChange={setWorkflowUpdates}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
