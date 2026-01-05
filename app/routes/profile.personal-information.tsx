import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card/Card";
import { TextField } from "@/components/ui/input/TextField";
import { Button } from "@/components/ui/button/Button";
import { Tag } from "@/components/ui/tag/Tag";
import { PageSection } from "@/components/layout/PageSection";

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

  function handleNameSave() {
    setIsEditingName(false);
  }

  return (
    <PageLayout
      title="Personal information"
      subtitle="Manage your personal details, roles and responsibilities"
    >
      <PageSection>
      <div className="profile-page">
        {/* ===== SECTION: PERSONAL INFORMATION ===== */}
        <div className="profile-section">
          <div className="profile-section__label">
            Personal information
          </div>

          <Card>
            {/* Full name */}
            <div className="profile-card-row">
              <div className="profile-card-label">
                Full name
              </div>

              <div className="profile-card-fields layout-stack">
                <TextField
                  label="First name"
                  value={firstName}
                  disabled={!isEditingName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last name"
                  value={lastName}
                  disabled={!isEditingName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="profile-card-action">
                <Button
                  variant="secondary"
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

            {/* Email */}
            <div className="profile-card-row">
              <div className="profile-card-label">
                Email
              </div>

              <div className="profile-card-fields">
                <TextField
                  label="Email address"
                  value="oyvind.arvik@example.com"
                  disabled
                />
              </div>

              <div className="profile-card-action">
                <Button variant="secondary" size="sm">
                  Update
                </Button>
              </div>
            </div>

            {/* Phone */}
            <div className="profile-card-row">
              <div className="profile-card-label">
                Phone number (optional)
              </div>

              <div className="profile-card-fields">
                <TextField
                  label="Phone number"
                  value="+47 123 45 678"
                  disabled
                />
              </div>

              <div className="profile-card-action">
                <Button variant="secondary" size="sm">
                  Add
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* ===== SECTION: ROLES & RESPONSIBILITIES ===== */}
        <div className="profile-section">
          <div className="profile-section__label">
            Roles & responsibilities
          </div>

          <Card>
            <div className="profile-card-row">
              <div className="profile-card-label">Groups</div>
              <div className="profile-card-fields">
                <Tag label="Warehouse workers" />
                <Tag label="Administrator" />
                <Tag label="Team leads" />
              </div>
              <div />
            </div>

            <div className="profile-card-row">
              <div className="profile-card-label">Responsibilities</div>
              <div className="profile-card-fields">
                <Tag label="eLogic / Operator" />
                <Tag label="eManager / Super user" />
                <Tag label="eOperator / Super user" />
                <Tag label="eOperator / Administrator" />
                <Tag label="eManager / Administrator" />
                <Tag label="eLogic / Super user" />
              </div>
              <div />
            </div>
          </Card>
        </div>
      </div>
      </PageSection>
    </PageLayout>
  );
}
