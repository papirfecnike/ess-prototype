import { useEffect, useState } from "react";

import { ProductPageLayout } from "../components/layout/ProductPageLayout";

import { Card } from "../components/ui/card/Card";
import { Button } from "../components/ui/button/Button";
import { TextField } from "../components/ui/input/TextField";
import { Toggle } from "../components/ui/toggle/Toggle";
import { InputStepper } from "../components/ui/input-stepper/InputStepper";
import { Dialog } from "../components/ui/dialog/Dialog";
import { icons } from "../components/ui/icon/icons";

/* product images */
import img01 from "@/assets/product/img01.png";
import img02 from "@/assets/product/img02.png";
import img03 from "@/assets/product/img03.png";

import "../styles/product-page.css";

/* =========================
   PRODUCT CATALOG
   ========================= */

const PRODUCT_MAP: Record<
  string,
  { name: string; sku: string; image?: string }
> = {
  WD750: { name: "Bisgaard Winter Boots - Pixie - Khaki", sku: "WD750" },
  WF773: { name: "Name It Jumpsuit - NkfRoka - Burgundy", sku: "WF773" },
  BW975: { name: "Minymo Cardigan - Knitted - Woodrose", sku: "BW975" },
  WC551: { name: "Minymo Cardigan w. Teddy - Parisian Night", sku: "WC551" },
  WF685: { name: "adidas Performance Shoes - Advantage 2.0", sku: "WF685" },
  BS970: { name: "adidas Performance Shoes - VL Court 3.0 K", sku: "BS970" },
  BM841: { name: "adidas Performance Shoes - Run 70s 2.0 EL C", sku: "BM841" },
  WH768: { name: "Name It Blouse - Rib - Lavender Gray", sku: "WH768" },
  WG096: { name: "Name It Blouses - 2-Pack - Iceland Fossil/Flint Stone", sku: "WG096" },

  /* assets available */
  WA874: {
    name: "Hust and Claire Dynevest – HCEmily – Pale Mauve",
    sku: "WA874",
    image: img01,
  },
  BX962: {
    name: "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd",
    sku: "BX962",
    image: img02,
  },
  BV122: {
    name: "Billieblush Dynevest – Peach",
    sku: "BV122",
    image: img03,
  },
};

type Props = {
  value: number; // 0–100
};

export default function InboundPutawayProductPage() {
  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [markForInspection, setMarkForInspection] = useState(false);

/* =========================
     DIALOG STATE
     ========================= */

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  /* =========================
     ACTIVE PRODUCT (DYNAMIC)
     ========================= */
  const [activeItem, setActiveItem] = useState<{
    name: string;
    sku: string;
    image?: string;
  }>({
    name: "Unknown product",
    sku: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const skuParam = (params.get("sku") || "").toUpperCase();

  
    if (PRODUCT_MAP[skuParam]) {
      setActiveItem(PRODUCT_MAP[skuParam]);
    } else {
      setActiveItem({
        name: "Unknown product",
        sku: skuParam,
      });
    }
  }, []);


  /* =========================
     PRODUCT VERIFICATION
     ========================= */

  const isProductVerified = scanValue.trim() === activeItem.sku;

  /* =========================
     CONFIRM LOGIC
     ========================= */

  function finalizeConfirm() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        "putaway:completed",
        JSON.stringify({ sku: activeItem.sku })
      );

      window.location.assign("/inbound/putaway");
    }
  }

  function handleConfirm() {
    if (!isProductVerified) return;

    if (quantity > 1) {
      setIsDialogOpen(true);
      return;
    }

    finalizeConfirm();
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
                    {activeItem.image ? (
                      <img
                        src={activeItem.image}
                        alt={activeItem.name}
                      />
                    ) : (
                      <div className="product-details__no-image">
                        no image
                      </div>
                    )}
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
  {/* RAIL */}
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

    {/* CLOSE BUTTON */}
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

  {/* PANEL – A RAIL MELLETT NYÍLIK KI */}
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
              <p>Picked by a.kovach · 10:42</p>
              <p>Scanned SKU · 10:41</p>
              <p>Putaway started · 10:39</p>
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

      {/* =========================
          QUANTITY CONFIRM DIALOG
          ========================= */}

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
        Are you sure you can put away different quantity than expected?
      </Dialog>
    </ProductPageLayout>
  );
}
