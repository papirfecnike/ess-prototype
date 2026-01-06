import { useState } from "react";

import { ProductPageLayout } from "../components/layout/ProductPageLayout";

import { Card } from "../components/ui/card/Card";
import { Button } from "../components/ui/button/Button";
import { TextField } from "../components/ui/input/TextField";
import { Toggle } from "../components/ui/toggle/Toggle";
import { InputStepper } from "../components/ui/input-stepper/InputStepper";
import { Tag } from "../components/ui/tag/Tag";
import { ProgressBar } from "../components/ui/progress-bar/ProgressBar";
import { icons } from "../components/ui/icon/icons";

/* product images */
import img01 from "@/assets/product/img01.png";
import img02 from "@/assets/product/img02.png";
import img03 from "@/assets/product/img03.png";

import "../styles/product-page.css";

type Props = {
  value: number; // 0–100
};

export function FooterProgress({ value }: Props) {
  return (
    <div className="footer-progress">
      <div className="footer-progress__bar">
        <div
          className="footer-progress__fill"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function OutboundPickingProductPage() {
  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState(12);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [markForInspection, setMarkForInspection] = useState(false);

  /* =========================
     PICKLIST STATE
     ========================= */

  const [activePickIndex, setActivePickIndex] = useState(0);

  const picklistItems = [
    {
      id: "1",
      name: "Hust and Claire Dynevest – HCEmily – Pale Mauve",
      sku: "WA874",
      quantity: 3,
      image: img01,
    },
    {
      id: "2",
      name: "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd",
      sku: "BX962",
      quantity: 1,
      image: img02,
    },
    {
      id: "3",
      name: "Billieblush Dynevest – Peach",
      sku: "BV122",
      quantity: 1,
      image: img03,
    },
  ];

  const activeItem = picklistItems[activePickIndex];

  /* =========================
     PRODUCT VERIFICATION
     ========================= */

  const isProductVerified = scanValue.trim() === activeItem.sku;

  function handleConfirm() {
    setActivePickIndex((prev) =>
      prev < picklistItems.length - 1 ? prev + 1 : prev
    );
    setScanValue("");
  }

  /* =========================
     DRAWER STATE
     ========================= */

  type DrawerView = "settings" | "print" | "history" | null;

  const [drawerView, setDrawerView] = useState<DrawerView>(null);

  function openDrawer(view: DrawerView) {
    setDrawerView(view);
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
    setDrawerView(null);
  }

  return (
    <ProductPageLayout>
      <div className="product-page">
        {/* =========================
            CONTENT
            ========================= */}
        <div className="product-page__content-picking">
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
                        onCheckedChange={() => {}}
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
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      {icons.qrScanner}
                    </svg>
                  }
                />
              </div>
            </Card>
          </div>

          {/* MIDDLE COLUMN – DETAILS */}
          <div className="product-page__column">
            <Card>
              <h3>Details</h3>

              <div className="product-details">
                <div className="product-details__row">
                  <span className="product-details__label">Order ID</span>
                  <span className="product-details__value product-details__value--strong">
                    2784741147
                  </span>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">Name</span>
                  <span className="product-details__value product-details__value--strong">
                    {activeItem.name}
                  </span>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">SKU</span>
                  <span className="product-details__value product-details__value--strong">
                    {activeItem.sku}
                  </span>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">Image</span>
                  <div className="product-details__image">
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                    />
                  </div>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">Order line</span>
                  <span className="product-details__value product-details__value--strong">
                    n/a
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN – PICKLIST */}
          <div className="product-page__column">
            <Card>
              <h3 className="picklist-header">
                <span>Picklist ID</span>
                <Tag label="9305204753" />
              </h3>

              <div className="picklist">
                {picklistItems.map((item, index) => {
                  const isActive = index === activePickIndex;

                  return (
                    <div
                      key={item.id}
                      className={[
                        "picklist-item",
                        isActive ? "picklist-item--active" : "",
                      ].join(" ")}
                    >
                      <div className="picklist-item__image">
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      </div>

                      <div className="picklist-item__content">
                        <div className="picklist-item__name">
                          {item.name}
                        </div>

                        <div className="picklist-item__meta">
                          <span className="picklist-item__qty">
                            {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* =========================
            DRAWER
            ========================= */}
        <aside
          className={[
            "product-drawer",
            isDrawerOpen ? "product-drawer--open" : "",
          ].join(" ")}
        >
          {/* ICON RAIL */}
          <div className="product-drawer__rail">
            <div className="product-drawer__rail-main">
              <button
                type="button"
                className="product-drawer__icon"
                onClick={() => openDrawer("settings")}
                aria-label="Settings"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  {icons.settings}
                </svg>
              </button>

              <button
                type="button"
                className="product-drawer__icon"
                onClick={() => openDrawer("print")}
                aria-label="Print"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  {icons.print}
                </svg>
              </button>

              <button
                type="button"
                className="product-drawer__icon"
                onClick={() => openDrawer("history")}
                aria-label="History"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  {icons.history}
                </svg>
              </button>
            </div>

            <div className="product-drawer__panel-close">
              <button
                type="button"
                className={[
                  "product-drawer__close",
                  isDrawerOpen ? "is-open" : "is-closed",
                ].join(" ")}
                onClick={closeDrawer}
                aria-label="Close drawer"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  {isDrawerOpen
                    ? icons.chevronRightStroke
                    : icons.chevronLeftStroke}
                </svg>
              </button>
            </div>
          </div>

          {/* PANEL */}
          {isDrawerOpen && (
            <div className="product-drawer__panel">
              <div className="product-drawer__panel-content">
                {drawerView === "settings" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">
                        Settings
                      </div>
                    </div>

                    <div className="drawer-section-itemsgroup">
                      <div className="drawer-section-item">
                        <Toggle
                          title="Auto confirm"
                          checked={false}
                          onCheckedChange={() => {}}
                        />
                      </div>

                      <div className="drawer-section-item">
                        <Toggle
                          title="Require double scan"
                          checked={true}
                          onCheckedChange={() => {}}
                        />
                      </div>
                    </div>

                    <div className="drawer-section-cta">
                      <Button variant="ghost">
                        Reset to defaults
                      </Button>
                    </div>
                  </div>
                )}

                {drawerView === "print" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">
                        Print
                      </div>
                    </div>

                    <div className="drawer-section-item">
                      <Button variant="ghost">
                        Print product label
                      </Button>
                    </div>

                    <div className="drawer-section-item">
                      <Button variant="ghost">
                        Print location label
                      </Button>
                    </div>
                  </div>
                )}

                {drawerView === "history" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">
                        History
                      </div>
                    </div>

                    <div className="drawer-section-item">
                      <li>Picked by a.kovach · 10:42</li>
                      <li>Scanned SKU · 10:41</li>
                      <li>Putaway started · 10:39</li>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* FOOTER */}
        <footer className="product-page__footer">
          <div className="product-page__footer-left">
            <Button variant="ghost">Back</Button>
          </div>

          <div className="product-page__footer-center">
            <ProgressBar value={40} />
          </div>

          <div className="product-page__footer-right">
            <Button
              variant="primary"
              disabled={!isProductVerified}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </footer>
      </div>
    </ProductPageLayout>
  );
}
