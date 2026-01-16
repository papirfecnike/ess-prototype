import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ProductPageLayout } from "../components/layout/ProductPageLayout";

import { Card } from "../components/ui/card/Card";
import { Button } from "../components/ui/button/Button";
import { TextField } from "../components/ui/input/TextField";
import { Toggle } from "../components/ui/toggle/Toggle";
import { InputStepper } from "../components/ui/input-stepper/InputStepper";
import { Dialog } from "../components/ui/dialog/Dialog";
import { icons } from "../components/ui/icon/icons";

/* product images */
import img05 from "@/assets/product/img05.png";
import img06 from "@/assets/product/img06.png";
import img07 from "@/assets/product/img07.png";
import img08 from "@/assets/product/img08.png";

import "../styles/product-page.css";

/* =========================
   INSPECTION DATA BY BATCH
   ========================= */

const INSPECTION_MAP: Record<
  string,
  {
    name: string;
    sku: string;
    locationId: string;
    image: string;
  }
> = {
  "9875": {
    name: "Bisgaard Winter Boots - Pixie - Khaki",
    sku: "WD750",
    locationId: "AS-887651-01-01",
    image: img05,
  },
  "9876": {
    name: "Joha Leggings - Wool - Rib - Rust",
    sku: "WF873",
    locationId: "AS-887652-01-01",
    image: img06,
  },
  "9877": {
    name: "Minymo Cardigan - Knitted - Woodrose",
    sku: "BW975",
    locationId: "AS-887653-01-01",
    image: img07,
  },
  "9878": {
    name: "Minymo Cardigan w. Teddy - Parisian Night",
    sku: "WC551",
    locationId: "AS-887654-01-01",
    image: img08,
  },
};

export default function InventoryInspectionProductPage() {
  /* =========================
     STATE
     ========================= */

  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [markForInspection, setMarkForInspection] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  type DrawerView = "settings" | "print" | "history" | null;
  const [drawerView, setDrawerView] = useState<DrawerView>(null);

  const [activeItem, setActiveItem] = useState<{
    batchId: string;
    name: string;
    sku: string;
    locationId: string;
    image: string;
  } | null>(null);

  /* =========================
     INIT FROM QUERY
     ========================= */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batchId = params.get("id") || "";

    const data = INSPECTION_MAP[batchId];
    if (!data) return;

    setActiveItem({
      batchId,
      ...data,
    });
  }, []);

  if (!activeItem) return null;

  /* =========================
     PRODUCT VERIFICATION
     ========================= */

  const isProductVerified =
    scanValue.trim().toUpperCase() === activeItem.sku;

  /* =========================
     CONFIRM LOGIC
     ========================= */

    function finalizeConfirm() {
      const raw = sessionStorage.getItem("inspection:completedIds");
      const prev: number[] = raw ? JSON.parse(raw) : [];

      const next = prev.includes(Number(activeItem.batchId))
        ? prev
        : [...prev, Number(activeItem.batchId)];

      sessionStorage.setItem(
        "inspection:completedIds",
        JSON.stringify(next)
      );

      navigate("/inventory/inspection-table");
    }

  function handleConfirm() {
    if (!isProductVerified) return;

    if (quantity > 1) {
      setIsDialogOpen(true);
      return;
    }

    finalizeConfirm();
  }

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
        <div className="product-page__content-putaway">
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
                        {activeItem.locationId}
                      </span>
                    </div>

                    <div className="location-card__toggle">
                      <Toggle
                        checked={markForInspection}
                        onCheckedChange={setMarkForInspection}
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
                  <span className="product-details__label">
                    Name
                  </span>
                  <span className="product-details__value product-details__value--strong">
                    {activeItem.name}
                  </span>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">
                    Product ID
                  </span>
                  <span className="product-details__value product-details__value--strong">
                    {activeItem.sku}
                  </span>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">
                    Image
                  </span>
                  <div className="product-details__image">
                    <img
                      src={activeItem.image}
                      alt={activeItem.name}
                    />
                  </div>
                </div>

                <div className="product-details__row">
                  <span className="product-details__label">
                    Order line
                  </span>
                  <span className="product-details__value product-details__value--strong">
                    n/a
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* DRAWER */}
        <aside
          className={[
            "product-drawer",
            isDrawerOpen ? "product-drawer--open" : "",
          ].join(" ")}
        >
          <div className="product-drawer__rail">
            <div className="product-drawer__rail-main">
              <button
                type="button"
                className="product-drawer__icon"
                onClick={() => openDrawer("settings")}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  {icons.settings}
                </svg>
              </button>

              <button
                type="button"
                className="product-drawer__icon"
                onClick={() => openDrawer("print")}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  {icons.print}
                </svg>
              </button>

              <button
                type="button"
                className="product-drawer__icon"
                onClick={() => openDrawer("history")}
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
                  isDrawerOpen ? "is-open" : "",
                ].join(" ")}
                onClick={closeDrawer}
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  {icons.chevronRightStroke}
                </svg>
              </button>
            </div>
          </div>

          {isDrawerOpen && (
            <div className="product-drawer__panel">
              <div className="product-drawer__panel-content">
                {drawerView === "settings" && <div>Settings</div>}
                {drawerView === "print" && <div>Print</div>}
                {drawerView === "history" && <div>History</div>}
              </div>
            </div>
          )}
        </aside>

        {/* FOOTER */}
        <footer className="product-page__footer">
          <div className="product-page__footer-left">
            <Button variant="ghost">Back</Button>
          </div>

          <div className="product-page__footer-center" />

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

      {/* DIALOG */}
      <Dialog
        isOpen={isDialogOpen}
        intent="warning"
        title="Quantity changes"
        footerLeft={
          <Button
            variant="ghost"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
        }
        footerRight={
          <Button
            variant="primary"
            onClick={finalizeConfirm}
          >
            Confirm
          </Button>
        }
      >
        Are you sure you can inspect different quantity than expected?
      </Dialog>
    </ProductPageLayout>
  );
}
