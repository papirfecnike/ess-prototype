import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card/Card";
import { TextField } from "@/components/ui/input/TextField";
import { Button } from "@/components/ui/button/Button";
import { Tag } from "@/components/ui/tag/Tag";
import { PageSection } from "@/components/layout/PageSection";
import { Notification } from "@/components/ui/notification/Notification";

export const loader: LoaderFunction = async () => {
  return null;
};

export default function ProfilePersonalInformation() {
  /* =========================
     STATE
     ========================= */

  const [isEditingName, setIsEditingName] = useState(false);

  const [firstName, setFirstName] = useState("Øyvind");
  const [lastName, setLastName] = useState("Årvik");

  const [showNotification, setShowNotification] = useState(false);

  /* =========================
     HELPERS
     ========================= */

  function notifyChange() {
    setShowNotification(true);
  }

  function handleNameSave() {
    setIsEditingName(false);
    notifyChange();
  }

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Personal information"
      subtitle="Manage your personal details, roles and responsibilities"
    >
      <PageSection>
        <div className="settings-page">
          <div className="settings-section">

            {/* ================= CONTACT DETAILS ================= */}

            <Card>
              <div className="settings-card-title">
                Contact details
              </div>

              {/* NAME */}
              <div className="settings-card-stack">

                <div className="settings-card-label">
                  Full name
                </div>

                <div className="settings-card-stack-content">
                  <TextField
                    label="First name"
                    value={firstName}
                    disabled={!isEditingName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      notifyChange();
                    }}
                  />
                  <TextField
                    label="Last name"
                    value={lastName}
                    disabled={!isEditingName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      notifyChange();
                    }}
                  />
                </div>

                <div className="settings-card-action">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={
                      isEditingName
                        ? handleNameSave
                        : () => setIsEditingName(true)
                    }
                  >
                    {isEditingName ? "Save" : "Update"}
                  </Button>
                </div>

              </div>

              {/* EMAIL */}
              <div className="settings-card-stack">
                <div className="settings-card-label">
                  Email address
                </div>

                <div className="settings-card-stack-content">
                  <TextField
                    label="Email address"
                    value="oyvind.arvik@example.com"
                    disabled
                  />
                </div>

                <div className="settings-card-action">
                  <Button variant="ghost" size="sm">
                    Update
                  </Button>
                </div>
              </div>

              {/* PHONE */}
              <div className="settings-card-stack">
                <div className="settings-card-label">
                  Phone number (optional)
                </div>

                <div className="settings-card-stack-content">
                  <TextField
                    label="Phone number"
                    value="+47 123 45 678"
                    disabled
                  />
                </div>

                <div className="settings-card-action">
                  <Button variant="ghost" size="sm">
                    Add
                  </Button>
                </div>
              </div>

            </Card>

            {/* ================= ROLES & RESPONSIBILITIES ================= */}

            <Card>
              <div className="settings-card-title">
                Roles and responsibilities
              </div>

              {/* GROUPS */}
              <div className="settings-card-groups">
                <div className="settings-card-label">
                  Groups
                </div>

                <div className="settings-groups-stack">
                  <Tag label="Warehouse workers" />
                  <Tag label="Administrator" />
                  <Tag label="Team leads" />
                </div>
              </div>

              {/* RESPONSIBILITIES */}
              <div className="settings-card-groups">
                <div className="settings-card-label">
                  Responsibilities
                </div>

                <div className="settings-groups-stack">
                  <Tag label="eLogic / Operator" />
                  <Tag label="eManager / Super user" />
                  <Tag label="eOperator / Super user" />
                  <Tag label="eOperator / Administrator" />
                  <Tag label="eManager / Administrator" />
                  <Tag label="eLogic / Super user" />
                </div>
              </div>

            </Card>

          </div>
        </div>
      </PageSection>

      {/* ================= NOTIFICATION ================= */}

      {showNotification && (
        <Notification
          intent="success"
          title="Profile updated"
          message="Your changes have been saved."
          onClose={() => setShowNotification(false)}
        />
      )}
    </PageLayout>
  );
}
