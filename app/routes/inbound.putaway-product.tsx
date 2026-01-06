import { useState, useEffect } from "react";

import { PageSection } from "../components/layout/PageSection";

import { Card } from "../components/ui/card/Card";
import { Button } from "../components/ui/button/Button";
import { TextField } from "../components/ui/input/TextField";
import { Toggle } from "../components/ui/toggle/Toggle";
import { InputStepper } from "../components/ui/input-stepper/InputStepper";
import { icons } from "../components/ui/icon/icons";

import "../styles/product-page.css";

export default function InboundPutawayProductPage() {
  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState(12);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [markForInspection, setMarkForInspection] = useState(false);

  return (
    <PageSection>
      <div className="product-page">
        {/* =========================
            CONTENT
            ========================= */}
        <div className="product-page__content">
          {/* LEFT COLUMN */}
          <div className="product-page__column product-page__column--primary">
            <Card>
              <h3>Quantity</h3>
              <div>
                <InputStepper
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                />
              </div>
            </Card>

            <Card>
              <h3>Location</h3>

              <div>
                <div className="location-card">
                  <div className="location-card__visual" />

                  <div className="location-card__content">
                    <div className="location-card__text">
                      <span className="location-card__label">
                        Location ID
                      </span>
                      <span className="location-card__value">
                        AS-112025-01-01
                      </span>
                    </div>

                    <div className="location-card__toggle">
                      <Toggle
                        checked={markForInspection}
                        onChange={setMarkForInspection}
                        title="Mark for inspection"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3>Scan product</h3>
              <div>
                <TextField
                  label="Product verification"
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  autoFocus
                  leadingIcon={
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      aria-hidden
                    >
                      {icons.qrScanner}
                    </svg>
                  }
                />
              </div>
            </Card>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="product-page__column">
            <Card>
              <h3>Product details</h3>
              <ul>
                <li>SKU: 123456</li>
                <li>EAN: 987654321</li>
                <li>Weight: 2.3 kg</li>
              </ul>
            </Card>

            <Card>
              <h3>Handling instructions</h3>
              <p>Store upright. Avoid stacking.</p>
            </Card>
          </div>

          {/* RIGHT COLUMN (still present for now) */}
          <div className="product-page__column">
            <Card>
              <h3>Next product</h3>
              <p>SKU: 654321</p>
              <p>Location: Aisle C · Shelf 02</p>
            </Card>
          </div>
        </div>

        {/* =========================
            DRAWER
            ========================= */}
        <aside
          className={`product-drawer ${
            isDrawerOpen ? "product-drawer--open" : ""
          }`}
        >
          <button
            type="button"
            className="product-drawer__toggle"
            onClick={() => setIsDrawerOpen((v) => !v)}
            aria-label="Toggle drawer"
          >
            {isDrawerOpen ? "›" : "‹"}
          </button>

          <div className="product-drawer__body" />
        </aside>

        {/* =========================
            FOOTER
            ========================= */}
        <footer className="product-page__footer">
          <Button variant="ghost">Back</Button>

          <div className="product-page__progress">
            <div className="product-page__progress-bar">
              <div
                className="product-page__progress-bar-fill"
                style={{ width: "40%" }}
              />
            </div>
          </div>

          <Button variant="primary">Confirm</Button>
        </footer>
      </div>
    </PageSection>
  );
}
