// app/routes/profile.security.tsx

import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Toggle } from "@/components/ui/toggle/Toggle";
import { TextField } from "@/components/ui/input/TextField";
import { Notification } from "@/components/ui/notification/Notification";

export const loader: LoaderFunction = async () => null;

/* =========================
   PASSWORD VALIDATION
   ========================= */

function isValidPasswordChar(char: string) {
  return /^[a-zA-Z0-9!@#$%^&*()_+=\-]$/.test(char);
}

export default function ProfileSecurity() {
  /* =========================
     STATE
     ========================= */

  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [editing, setEditing] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("********");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentError, setCurrentError] = useState<string | null>(null);
  const [newError, setNewError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  const [showNotification, setShowNotification] = useState(false);

  /* =========================
     HANDLERS
     ========================= */

  function handlePasswordChange(
    setter: (v: string) => void,
    errorSetter: (v: string | null) => void,
    value: string
  ) {
    const lastChar = value.slice(-1);

    if (lastChar && !isValidPasswordChar(lastChar)) {
      errorSetter("Invalid character used in password.");
      return;
    }

    errorSetter(null);
    setter(value);
  }

  function handlePasswordAction() {
    if (!editing) {
      setEditing(true);
      return;
    }

    /* mock save */
    setEditing(false);

    setNewPassword("");
    setConfirmPassword("");

    setCurrentError(null);
    setNewError(null);
    setConfirmError(null);

    setShowNotification(true);
  }

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Security"
      subtitle="Manage your password, authentication and active sessions"
    >
      <PageSection>
        <div className="settings-page">
          <div className="settings-section">

            {/* ================= PASSWORD ================= */}

            <Card>
              <div className="settings-card-title">
                Password
              </div>

              <div className="settings-card-stack">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    You have not changed your password yet
                  </div>
                  <div className="settings-card-description">
                    It is recommended to update it regularly
                  </div>
                </div>

                <div className="settings-card-stack-content">
                  <TextField
                    label="Current password"
                    type="password"
                    value={currentPassword}
                    disabled={!editing}
                    error={currentError ?? undefined}
                    onChange={(e) =>
                      handlePasswordChange(
                        setCurrentPassword,
                        setCurrentError,
                        e.target.value
                      )
                    }
                  />

                <br/>
                  {editing && (
                    <>
                      <TextField
                        label="New password"
                        type="password"
                        value={newPassword}
                        error={newError ?? undefined}
                        onChange={(e) =>
                          handlePasswordChange(
                            setNewPassword,
                            setNewError,
                            e.target.value
                          )
                        }
                      />

                <br/>
                      <TextField
                        label="Confirm new password"
                        type="password"
                        value={confirmPassword}
                        error={confirmError ?? undefined}
                        onChange={(e) =>
                          handlePasswordChange(
                            setConfirmPassword,
                            setConfirmError,
                            e.target.value
                          )
                        }
                      />
                    </>
                  )}
                </div>

                <div className="settings-card-action settings-card-action--right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePasswordAction}
                  >
                    {editing ? "Save" : "Update"}
                  </Button>
                </div>
              </div>
            </Card>

            {/* ================= MFA ================= */}

            <Card>
              <div className="settings-card-title">
                Authentication
              </div>
              
              {/* Account recovery */}
              <div className="settings-card-row">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Account recovery
                  </div>
                  <div className="settings-card-description">
                    Set up recovery options to regain access if you lose your credentials
                  </div>
                </div>

                <div className="settings-card-action settings-card-action--right">
                  <Button variant="ghost" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              {/* Active sessions */}
              <div className="settings-card-row">
                <div className="settings-card-text">
                  <div className="settings-card-label">
                    Active sessions
                  </div>
                  <div className="settings-card-description">
                    View devices and locations where your account is currently signed in.
                  </div>
                </div>

                <div className="settings-card-action settings-card-action--right">
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>


              {/* MFA */}
              <div className="settings-card-toggle">
                <Toggle
                  title="Multi-factor authentication"
                  description="After entering your password, verify your identity with an authentication method"
                  checked={mfaEnabled}
                  onCheckedChange={(v) => {
                    setMfaEnabled(v);
                    setShowNotification(true);
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
          title="Security settings updated"
          message="Your changes have been saved."
          onClose={() => setShowNotification(false)}
        />
      )}

    </PageLayout>
  );
}
