import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { Card } from "@/components/ui/card/Card";
import { TextField } from "@/components/ui/input/TextField";
import { Icon } from "@/components/ui/icon/Icon";

import { searchIndex } from "./searchIndex";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function GlobalSearch({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return searchIndex.filter((item) => {
      if (item.label.toLowerCase().includes(q)) return true;
      if (item.description?.toLowerCase().includes(q)) return true;
      if (item.keywords?.some((k) => k.includes(q))) return true;
      return false;
    });
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="spotlight-backdrop" onClick={onClose}>
      <div
        className="spotlight-container"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="spotlight-card">
          {/* HEADER */}
          <div className="spotlight-header">
            <strong>Search across ESS</strong>

            <button
            type="button"
            className="spotlight-icon-btn"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="closeStroke" size="sm" />
          </button>
          </div>

          {/* INPUT */}
          <div className="spotlight-actions">
              <TextField
                autoFocus
                label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

          {/* RESULTS – CSAK HA VAN TALÁLAT */}
          {results.length > 0 && (
            <ul className="spotlight-results">
              {results.map((item) => (
                <li
                  key={item.route}
                  className="spotlight-result"
                  onClick={() => {
                    navigate(item.route);
                    onClose();
                  }}
                >
                  <strong>{item.label}</strong>
                  {item.description && <span>{item.description}</span>}
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
