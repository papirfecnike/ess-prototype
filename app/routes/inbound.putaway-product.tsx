import { useState } from "react";

import { PageLayout } from "../components/layout/PageLayout";
import { PageSection } from "../components/layout/PageSection";

import { Card } from "../components/ui/card/Card";
import { Button } from "../components/ui/button/Button";
import { ScanInput } from "../components/ui/scan-input/ScanInput";
import { InputStepper } from "../components/ui/input-stepper/InputStepper";

import "../styles/product-page.css";

export default function InboundPutawayProductPage() {
  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState(12);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <PageLayout>
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
                <InputStepper
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                />
              </Card>

              <Card>
                <h3>Location</h3>
                <p>Aisle B · Shelf 04 · Bin 12</p>
              </Card>

              <Card>
                <h3>Scan product</h3>
                <ScanInput
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  onSubmit={() => {
                    console.log("Scanned:", scanValue);
                    setScanValue("");
                  }}
                />
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
    </PageLayout>
  );
}
