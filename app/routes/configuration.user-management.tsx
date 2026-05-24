import type { LoaderFunction } from "react-router";
import { useMemo, useRef, useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";
import { DataTableCore } from "@/components/data/DataTableCore";
import type { DataTableColumn, DataTableRow } from "@/components/data/DataTableCore";
import { Button } from "@/components/ui/button/Button";
import { Dialog } from "@/components/ui/dialog/Dialog";
import { DropdownMenu } from "@/components/ui/menu/DropdownMenu";
import { Icon } from "@/components/ui/icon/Icon";
import { Checkbox } from "@/components/ui/checkbox/Checkbox";
import { Notification } from "@/components/ui/notification/Notification";
import { TabBar } from "@/components/ui/tab/TabBar";
import { Tag } from "@/components/ui/tag/Tag";
import { TextField } from "@/components/ui/input/TextField";
import { Toggle } from "@/components/ui/toggle/Toggle";
import "@/styles/user-management.css";

export const loader: LoaderFunction = async () => null;

type UserRow = DataTableRow & {
  id: string;
  fullName: string;
  username: string;
  email: string;
  lastLogin: string;
  status: string;
  more: string;
};

type GroupRow = DataTableRow & {
  id: string;
  groupName: string;
  description: string;
  requireMfa: string;
  more: string;
};

const INITIAL_USERS: UserRow[] = [
  { id: "tthise", fullName: "Thomas Peter Thise", username: "tthise", email: "Thomas.Thise@warehouse.com", lastLogin: "Never", status: "Disabled", more: "" },
  { id: "khansen", fullName: "Knut Erik Hansen", username: "khansen", email: "Knut.Hansen@warehouse.com", lastLogin: "Never", status: "Disabled", more: "" },
  { id: "lfredriksson", fullName: "Lise-Maria Fredriksson", username: "lfredriksson", email: "Lise.Fredriksson@warehouse.com", lastLogin: "Never", status: "Disabled", more: "" },
  { id: "gloriasol", fullName: "Gloria Estrella Sol", username: "gloriasol", email: "Gloria.Sol@warehouse.com", lastLogin: "Never", status: "Disabled", more: "" },
  { id: "rudolphnase", fullName: "Rudolph Nase", username: "rudolphnase", email: "Rudolph.Nase@warehouse.com", lastLogin: "3 months ago", status: "Active", more: "" },
  { id: "tkovach2", fullName: "Thomas Kovach", username: "tkovach2", email: "Thomas.Kovach@warehouse.com", lastLogin: "Yesterday", status: "Active", more: "" },
  { id: "staylor", fullName: "Susan Taylor", username: "staylor", email: "Susan.Taylor@warehouse.com", lastLogin: "08-apr-2026", status: "Active", more: "" },
  { id: "smccallen", fullName: "Saoirse McCallen", username: "smccallen", email: "Saoirse.Mccallen@warehouse.com", lastLogin: "09-apr-2026", status: "Active", more: "" },
  { id: "ssemur", fullName: "Sybill Semur", username: "ssemur", email: "Sybill.Semur@warehouse.com", lastLogin: "09-apr-2026", status: "Active", more: "" },
  { id: "xrandolph", fullName: "Xavier Randolph", username: "xrandolph", email: "Xavier.Randolph@warehouse.com", lastLogin: "2 months ago", status: "Active", more: "" },
];

const INITIAL_GROUPS: GroupRow[] = [
  { id: "administrator", groupName: "Administrator", description: "Represents administrators for the system", requireMfa: "false", more: "" },
  { id: "group-co", groupName: "Group CO", description: "", requireMfa: "true", more: "" },
  { id: "team-leads", groupName: "Team leads", description: "Represents team leads working in the warehouse", requireMfa: "false", more: "" },
  { id: "warehouse-workers", groupName: "Warehouse workers", description: "", requireMfa: "false", more: "" },
];

const GROUP_OPTIONS = ["Administrator", "Group CO", "Team leads", "Warehouse worker"];
const ROLE_GROUPS = ["eManager", "eOperator", "eLogic"];
const ROLE_OPTIONS = ["Operator", "Superuser", "Administrator"];

const EMPTY_USER_DRAFT = {
  firstName: "",
  lastName: "",
  email: "",
  groups: [] as string[],
  roles: {
    eManager: [] as string[],
    eOperator: [] as string[],
    eLogic: [] as string[],
  },
  mfa: false,
  newPassword: "",
  confirmPassword: "",
};

type UserDraft = typeof EMPTY_USER_DRAFT;

function StatusTag({ status }: { status: string }) {
  return status === "Active"
    ? <Tag label="Active" variant="success" />
    : <Tag label="Disabled" variant="outlined" />;
}

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<UserRow[]>(INITIAL_USERS);
  const [groups, setGroups] = useState<GroupRow[]>(INITIAL_GROUPS);
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [userDialogMode, setUserDialogMode] = useState<"add" | "edit" | null>(null);
  const [userDialogTab, setUserDialogTab] = useState("personal");
  const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ intent: "success" | "danger"; title: string; message: string } | null>(null);
  const [groupDraft, setGroupDraft] = useState({ name: "", description: "", requireMfa: true });
  const [userDraft, setUserDraft] = useState<UserDraft>(EMPTY_USER_DRAFT);
  const [initialUserDraft, setInitialUserDraft] = useState<UserDraft>(EMPTY_USER_DRAFT);
  const menuAnchorRef = useRef<HTMLElement | null>(null);

  const activeMenuRow = activeTab === "users"
    ? users.find(row => row.id === openMenuRowId)
    : groups.find(row => row.id === openMenuRowId);

  const userColumns: DataTableColumn[] = [
    { key: "fullName", label: "Full name", width: 260 },
    { key: "username", label: "Username", width: 220 },
    { key: "email", label: "Email address", width: 320 },
    { key: "lastLogin", label: "Last logged in", width: 160, filterable: true, filterType: "date" },
    {
      key: "status",
      label: "Status",
      width: 130,
      filterable: true,
      filterType: "radio",
      filterOptions: [
        { value: "", label: "All statuses" },
        { value: "Disabled", label: "Disabled" },
        { value: "Active", label: "Active" },
      ],
      renderCell: value => <StatusTag status={String(value)} />,
    },
    {
      key: "more",
      label: "",
      align: "right",
      width: 48,
      filterable: false,
      renderCell: (_value, row) => renderMoreButton(String(row.id)),
    },
  ];

  const groupColumns: DataTableColumn[] = [
    { key: "groupName", label: "Group name", width: 260 },
    { key: "description", label: "Description", width: 420 },
    {
      key: "requireMfa",
      label: "Require MFA",
      width: 220,
      filterable: true,
      filterType: "radio",
      filterOptions: [
        { value: "true", label: "Enabled" },
        { value: "false", label: "Disabled" },
        { value: "", label: "All" },
      ],
      renderCell: value => String(value) === "true" ? <Tag label="Enabled" variant="success" /> : "",
    },
    {
      key: "more",
      label: "",
      align: "right",
      width: 48,
      filterable: false,
      renderCell: (_value, row) => renderMoreButton(String(row.id)),
    },
  ];

  const tableRows = useMemo(() => activeTab === "users" ? users : groups, [activeTab, users, groups]);

  const selectedUser = users.find(row => row.id === selectedUserId);
  const userDraftChanged = JSON.stringify(userDraft) !== JSON.stringify(initialUserDraft);
  const userDraftComplete = Boolean(userDraft.firstName.trim() && userDraft.lastName.trim() && userDraft.email.trim());
  const canConfirmUser = userDialogMode === "add"
    ? userDraftComplete
    : userDraftChanged && (userDraft.newPassword === userDraft.confirmPassword);

  function renderMoreButton(rowId: string) {
    const isOpen = openMenuRowId === rowId;
    return (
      <button
        type="button"
        className="btn--ghost"
        aria-label="More"
        ref={(el) => { if (isOpen) menuAnchorRef.current = el; }}
        onClick={(event) => {
          event.stopPropagation();
          setOpenMenuRowId(isOpen ? null : rowId);
        }}
      >
        <Icon name={isOpen ? "closeStroke" : "moreVert"} size="sm" />
      </button>
    );
  }

  function addGroup() {
    const name = groupDraft.name.trim();
    if (!name) return;
    setGroups(current => [
      ...current,
      {
        id: `${Date.now()}`,
        groupName: name,
        description: groupDraft.description.trim(),
        requireMfa: groupDraft.requireMfa ? "true" : "false",
        more: "",
      },
    ]);
    setShowGroupDialog(false);
    setGroupDraft({ name: "", description: "", requireMfa: true });
    setNotification({ intent: "success", title: "Group added", message: `${name} has been added.` });
  }

  function splitName(fullName: string) {
    const parts = fullName.split(" ");
    return {
      firstName: parts.slice(0, -1).join(" ") || parts[0] || "",
      lastName: parts.length > 1 ? parts[parts.length - 1] : "",
    };
  }

  function createDraftFromUser(user: UserRow): UserDraft {
    const name = splitName(user.fullName);
    return {
      firstName: name.firstName,
      lastName: name.lastName,
      email: user.email,
      groups: ["Administrator"],
      roles: {
        eManager: ["Operator"],
        eOperator: ["Superuser"],
        eLogic: ["Administrator"],
      },
      mfa: false,
      newPassword: "",
      confirmPassword: "",
    };
  }

  function openUserDialog(mode: "add" | "edit", user?: UserRow) {
    const nextDraft = mode === "edit" && user ? createDraftFromUser(user) : EMPTY_USER_DRAFT;
    setSelectedUserId(user?.id ?? null);
    setUserDraft(nextDraft);
    setInitialUserDraft(nextDraft);
    setUserDialogTab("personal");
    setUserDialogMode(mode);
  }

  function toggleDraftGroup(groupName: string) {
    setUserDraft(current => ({
      ...current,
      groups: current.groups.includes(groupName)
        ? current.groups.filter(group => group !== groupName)
        : [...current.groups, groupName],
    }));
  }

  function toggleDraftRole(roleGroup: keyof UserDraft["roles"], role: string) {
    setUserDraft(current => ({
      ...current,
      roles: {
        ...current.roles,
        [roleGroup]: current.roles[roleGroup].includes(role)
          ? current.roles[roleGroup].filter(value => value !== role)
          : [...current.roles[roleGroup], role],
      },
    }));
  }

  function saveUser() {
    const fullName = `${userDraft.firstName.trim()} ${userDraft.lastName.trim()}`.trim();
    const username = `${userDraft.firstName.trim().charAt(0)}${userDraft.lastName.trim()}`.toLowerCase();

    if (userDialogMode === "add") {
      setUsers(current => [
        ...current,
        {
          id: `${Date.now()}`,
          fullName,
          username,
          email: userDraft.email.trim(),
          lastLogin: "Never",
          status: "Disabled",
          more: "",
        },
      ]);
      setNotification({ intent: "success", title: "User added", message: `${fullName} has been added.` });
    } else if (selectedUserId) {
      setUsers(current => current.map(user =>
        user.id === selectedUserId
          ? { ...user, fullName, username, email: userDraft.email.trim() }
          : user
      ));
      setNotification({ intent: "success", title: "User updated", message: `${fullName} has been updated.` });
    }

    setUserDialogMode(null);
  }

  function handleMenuSelect(action: string) {
    if (activeTab === "users" && action === "update" && activeMenuRow) {
      openUserDialog("edit", activeMenuRow as UserRow);
      setOpenMenuRowId(null);
      return;
    }

    if (activeTab === "users" && action === "delete" && activeMenuRow) {
      setSelectedUserId(String(activeMenuRow.id));
      setShowDeleteUserDialog(true);
      setOpenMenuRowId(null);
      return;
    }

    if (activeTab === "groups" && action === "delete" && activeMenuRow) {
      setGroups(current => current.filter(row => row.id !== activeMenuRow.id));
      setNotification({ intent: "danger", title: "Group deleted", message: `${activeMenuRow.groupName} has been deleted.` });
      setOpenMenuRowId(null);
      return;
    }
  }

  function deleteUser() {
    const user = users.find(row => row.id === selectedUserId);
    if (!user) return;
    setUsers(current => current.filter(row => row.id !== selectedUserId));
    setShowDeleteUserDialog(false);
    setNotification({ intent: "danger", title: "User deleted", message: `${user.fullName} has been deleted.` });
  }

  return (
    <PageLayout title="User management" subtitle="Manage user access, roles, and permissions across the warehouse">
      <PageSection>
        <TabBar
          activeTab={activeTab}
          onChange={(id) => {
            setActiveTab(id);
            setOpenMenuRowId(null);
          }}
          tabs={[
            { id: "users", label: "Users" },
            { id: "groups", label: "Groups" },
          ]}
        />
      </PageSection>

      <PageSection>
        <DataTableCore
          rowIdKey="id"
          columns={activeTab === "users" ? userColumns : groupColumns}
          rows={tableRows}
          showCustomize={false}
          showActiveFilters={false}
          headerActions={
            <Button
              variant="secondary"
              size="sm"
              leadingIcon="add"
              onClick={() => activeTab === "groups" ? setShowGroupDialog(true) : openUserDialog("add")}
            >
              {activeTab === "users" ? "Add new user" : "Add new group"}
            </Button>
          }
        />

        <DropdownMenu
          open={openMenuRowId !== null}
          anchorRef={menuAnchorRef}
          items={activeTab === "users"
            ? [
                { id: "update", label: "Update", icon: "profile" },
                { id: "enable", label: "Enable", icon: "checkCircle" },
                { id: "delete", label: "Delete", icon: "delete", intent: "danger" },
              ]
            : [
                { id: "edit", label: "Edit", icon: "edit" },
                { id: "delete", label: "Delete", icon: "delete", intent: "danger" },
              ]
          }
          onClose={() => setOpenMenuRowId(null)}
          onSelect={handleMenuSelect}
        />
      </PageSection>

      <Dialog
        isOpen={showGroupDialog}
        intent="default"
        title="Add new group"
        footerLeft={<Button variant="ghost" onClick={() => setShowGroupDialog(false)}>Cancel</Button>}
        footerRight={<Button variant="primary" disabled={!groupDraft.name.trim()} onClick={addGroup}>Confirm</Button>}
      >
        <div className="user-management-dialog">
          <TextField label="Group name" value={groupDraft.name} onChange={(event) => setGroupDraft({ ...groupDraft, name: event.target.value })} />
          <TextField label="Description" value={groupDraft.description} onChange={(event) => setGroupDraft({ ...groupDraft, description: event.target.value })} />
          <Toggle title="Multi-factor authentication" checked={groupDraft.requireMfa} onCheckedChange={(checked) => setGroupDraft({ ...groupDraft, requireMfa: checked })} />
        </div>
      </Dialog>

      <Dialog
        isOpen={userDialogMode !== null}
        intent="default"
        title={userDialogMode === "add" ? "Add new user" : selectedUser?.fullName ?? "Edit user"}
        icon={userDialogMode === "add" ? "add" : "profile"}
        footerLeft={<Button variant="ghost" onClick={() => setUserDialogMode(null)}>Cancel</Button>}
        footerRight={<Button variant="primary" disabled={!canConfirmUser} onClick={saveUser}>Confirm</Button>}
      >
        <div className="user-edit-dialog">
          <TabBar
            activeTab={userDialogTab}
            onChange={setUserDialogTab}
            tabs={[
              { id: "personal", label: "Personal details" },
              { id: "groups", label: "Groups and roles" },
              { id: "security", label: "Security" },
            ]}
          />

          {userDialogTab === "personal" && (
            <div className="user-edit-dialog__grid">
              <strong>Full name</strong>
              <section className="user-edit-dialog__panel">
                <TextField label="First name" value={userDraft.firstName} onChange={(event) => setUserDraft({ ...userDraft, firstName: event.target.value })} />
                <TextField label="Last name" value={userDraft.lastName} onChange={(event) => setUserDraft({ ...userDraft, lastName: event.target.value })} />
              </section>

              <strong>Contact</strong>
              <section className="user-edit-dialog__panel">
                <TextField label="Email address" value={userDraft.email} onChange={(event) => setUserDraft({ ...userDraft, email: event.target.value })} />
              </section>
            </div>
          )}

          {userDialogTab === "groups" && (
            <div className="user-edit-dialog__stack">
              <strong>Groups</strong>
              <section className="user-edit-dialog__panel user-edit-dialog__checks">
                {GROUP_OPTIONS.map(groupName => (
                  <button key={groupName} type="button" onClick={() => toggleDraftGroup(groupName)}>
                    <Checkbox state={userDraft.groups.includes(groupName) ? "checked" : "unchecked"} />
                    {groupName}
                  </button>
                ))}
              </section>

              <strong>Roles</strong>
              <section className="user-edit-dialog__panel user-edit-dialog__roles">
                {ROLE_GROUPS.map(roleGroup => {
                  const roleKey = roleGroup as keyof UserDraft["roles"];
                  return (
                    <div key={roleGroup}>
                      <strong>{roleGroup}</strong>
                      {ROLE_OPTIONS.map(role => (
                        <button key={role} type="button" onClick={() => toggleDraftRole(roleKey, role)}>
                          <Checkbox state={userDraft.roles[roleKey].includes(role) ? "checked" : "unchecked"} />
                          {role}
                        </button>
                      ))}
                    </div>
                  );
                })}
              </section>
            </div>
          )}

          {userDialogTab === "security" && (
            <div className="user-edit-dialog__grid">
              <strong>Password</strong>
              <section className="user-edit-dialog__panel">
                <TextField label="New password" type="password" value={userDraft.newPassword} onChange={(event) => setUserDraft({ ...userDraft, newPassword: event.target.value })} />
                <TextField label="Confirm new password" type="password" value={userDraft.confirmPassword} onChange={(event) => setUserDraft({ ...userDraft, confirmPassword: event.target.value })} />
                <div className="user-edit-dialog__password-actions">
                  <Button variant="ghost" size="sm" onClick={() => setUserDraft({ ...userDraft, newPassword: "", confirmPassword: "" })}>Cancel</Button>
                  <Button variant="secondary" size="sm" disabled={!userDraft.newPassword || userDraft.newPassword !== userDraft.confirmPassword} onClick={() => setNotification({ intent: "success", title: "Password saved", message: "The password change has been mocked." })}>Save password</Button>
                </div>
              </section>

              <strong>Security</strong>
              <section className="user-edit-dialog__panel user-edit-dialog__security-row">
                <div>
                  <strong>Multi-factor authentication</strong>
                  <span>After entering your password, verify your identity with an authentication method.</span>
                </div>
                <Toggle
                  title=""
                  checked={userDraft.mfa}
                  onCheckedChange={(checked) => setUserDraft({ ...userDraft, mfa: checked })}
                />
              </section>
            </div>
          )}
        </div>
      </Dialog>

      <Dialog
        isOpen={showDeleteUserDialog}
        intent="error"
        title="Delete user"
        footerLeft={<Button variant="ghost" onClick={() => setShowDeleteUserDialog(false)}>Cancel</Button>}
        footerRight={<Button variant="primary" intent="danger" onClick={deleteUser}>Delete user</Button>}
      >
        <div className="user-management-dialog">
          <strong>You are about to delete this user. This action cannot be undone.</strong>
          <span>Are you sure you want to proceed?</span>
        </div>
      </Dialog>

      {notification && (
        <Notification intent={notification.intent} title={notification.title} message={notification.message} onClose={() => setNotification(null)} />
      )}
    </PageLayout>
  );
}
