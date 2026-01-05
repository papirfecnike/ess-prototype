// app/routes/profile.security.tsx

import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { Card } from "@/components/ui/card/Card";
import { Button } from "@/components/ui/button/Button";
import { Toggle } from "@/components/ui/toggle/Toggle";
import { TextField } from "@/components/ui/input/TextField";

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

  function handleAction() {
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
        <div className="profile-page">
          {/* =========================
             PASSWORD
             ========================= */}
          <div className="profile-section">
            <div className="profile-section__label">Password</div>

            <Card>
              <div className="profile-card-row profile-card-row--password">
                {/* TEXT */}
                <div className="profile-card-fields layout-stack">
                  <div>
                    <div className="profile-card-title">
                      You have never changed your password
                    </div>
                    <div className="profile-card-subtitle">
                      It’s recommended to update it regularly.
                    </div>
                  </div>
                </div>

                {/* FIELDS */}
                <div className="profile-card-fields layout-stack">
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

                {/* ACTION */}
                <div className="profile-card-action">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleAction}
                  >
                    {editing ? "Save" : "Change"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* =========================
             AUTHENTICATION
             ========================= */}
          <div className="profile-section">
            <div className="profile-section__label">Authentication</div>

            <Card>
              {/* MFA */}
              <div className="profile-card-row profile-card-row--one-col">
                <div className="profile-card-fields">
                  <Toggle
                    title="Multi-factor authentication"
                    description="After entering your password, verify your identity with an authentication method."
                    checked={mfaEnabled}
                    onChange={setMfaEnabled}
                  />
                </div>
                <div className="profile-card-action" />
              </div>

              {/* Account recovery */}
              <div className="profile-card-row profile-card-row--content-action">
                <div className="profile-card-fields layout-stack">
                  <div>
                    <div className="profile-card-title">
                      Account recovery
                    </div>
                    <div className="profile-card-subtitle">
                      Set up recovery options to regain access if you lose your credentials.
                    </div>
                  </div>
                </div>

                <div className="profile-card-action">
                  <Button variant="secondary" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              {/* Active sessions */}
              <div className="profile-card-row profile-card-row--content-action">
                <div className="profile-card-fields layout-stack">
                  <div>
                    <div className="profile-card-title">
                      Active sessions
                    </div>
                    <div className="profile-card-subtitle">
                      View devices and locations where your account is currently signed in.
                    </div>
                  </div>
                </div>

                <div className="profile-card-action">
                  <Button variant="secondary" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageSection>
    </PageLayout>
  );
}
