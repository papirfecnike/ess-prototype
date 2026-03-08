import { useState, type KeyboardEvent } from "react";
import type { ReactNode } from "react";
import "./tab.css";

/* =========================
   TYPES
   ========================= */

export type TabItem = {
  id: string;
  label: ReactNode;
  disabled?: boolean;
};

type Props = {
  tabs: TabItem[];
  activeTab?: string;
  defaultTab?: string;
  onChange?: (id: string) => void;
};

/* =========================
   COMPONENT
   ========================= */

export function TabBar({
  tabs,
  activeTab,
  defaultTab,
  onChange,
}: Props) {
  const isControlled = activeTab !== undefined;

  const [internalActive, setInternalActive] = useState(
    defaultTab ?? tabs[0]?.id
  );

  const current = isControlled ? activeTab : internalActive;

  function selectTab(id: string) {
    if (!isControlled) {
      setInternalActive(id);
    }
    onChange?.(id);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = tabs.findIndex(t => t.id === current);

    if (e.key === "ArrowRight") {
      const next = tabs[currentIndex + 1];
      if (next && !next.disabled) selectTab(next.id);
    }

    if (e.key === "ArrowLeft") {
      const prev = tabs[currentIndex - 1];
      if (prev && !prev.disabled) selectTab(prev.id);
    }
  }

  return (
    <div
      className="tabbar"
      role="tablist"
      onKeyDown={handleKeyDown}
    >
      {tabs.map(tab => {
        const isActive = tab.id === current;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-disabled={tab.disabled}
            className={[
              "tabbar__tab",
              isActive ? "is-active" : "",
              tab.disabled ? "is-disabled" : "",
            ].join(" ")}
            onClick={() =>
              !tab.disabled && selectTab(tab.id)
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}