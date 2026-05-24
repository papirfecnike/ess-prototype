import { useEffect, useState } from "react";

import { ProductPageLayout } from "../components/layout/ProductPageLayout";

import { Card } from "../components/ui/card/Card";
import { Button } from "../components/ui/button/Button";
import { TextField } from "../components/ui/input/TextField";
import { Toggle } from "../components/ui/toggle/Toggle";
import { InputStepper } from "../components/ui/input-stepper/InputStepper";
import { Dialog } from "../components/ui/dialog/Dialog";
import { Icon } from "../components/ui/icon/Icon";

import img01 from "@/assets/product/img01.png";
import img02 from "@/assets/product/img02.png";
import img03 from "@/assets/product/img03.png";
import img04 from "@/assets/product/img04.png";
import img05 from "@/assets/product/img05.png";

import "../styles/product-page.css";

const PRODUCT_MAP: Record<string, { name: string; sku: string; image?: string }> = {
  WD750: { name: "Bisgaard Winter Boots - Pixie - Khaki", sku: "WD750" },
  WF773: { name: "Name It Jumpsuit - NkfRoka - Burgundy", sku: "WF773" },
  BW975: { name: "Minymo Cardigan - Knitted - Woodrose", sku: "BW975" },
  WC551: { name: "Minymo Cardigan w. Teddy - Parisian Night", sku: "WC551" },
  BS970: { name: "adidas Performance Shoes - VL Court 3.0 K", sku: "BS970" },
  WH768: { name: "Name It Blouse - Rib - Lavender Gray", sku: "WH768" },
  WG096: { name: "Name It Blouses - 2-Pack - Iceland Fossil/Flint Stone", sku: "WG096" },
  WF685: { name: "adidas Performance Shoes - Advantage 2.0", sku: "WF685", image: img04 },
  BM841: { name: "adidas Performance Shoes - Run 70s 2.0 EL C", sku: "BM841", image: img05 },
  WA874: { name: "Hust and Claire Dynevest – HCEmily – Pale Mauve", sku: "WA874", image: img01 },
  BX962: { name: "Name It Dynevest - NmfMylane - Woodrose m. Sløyfebånd", sku: "BX962", image: img02 },
  BV122: { name: "Billieblush Dynevest – Peach", sku: "BV122", image: img03 },
};

export default function InboundPutawayProductPage() {

  const [scanValue, setScanValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const [activeItem, setActiveItem] = useState<{ name: string; sku: string; image?: string }>({
    name: "Unknown product",
    sku: "",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const skuParam = (params.get("sku") || "").toUpperCase();
    setActiveItem(PRODUCT_MAP[skuParam] ?? { name: "Unknown product", sku: skuParam });
  }, []);

  type DrawerView = "settings" | "print" | "history" | "stock" | null;
  const [drawerView, setDrawerView] = useState<DrawerView>(null);

  function openDrawer(view: DrawerView) {
    if (drawerView === view && isDrawerOpen) {
      closeDrawer();
      return;
    }
    setDrawerView(view);
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
    setDrawerView(null);
  }

  const isProductVerified = scanValue.trim() === activeItem.sku;

  function finalizeConfirm() {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("putaway:completed", JSON.stringify({ sku: activeItem.sku }));
      window.location.assign("/inbound/putaway-table");
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

  function handleExitConfirm() {
    sessionStorage.setItem("putaway:interrupted", JSON.stringify({ sku: activeItem.sku }));
    window.location.assign("/inbound/putaway-table");
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
                <InputStepper value={quantity} onChange={setQuantity} min={0} />
              </div>
            </Card>

            <Card>
              <h3>Compartment</h3>
              <div>
                <div className="location-card">
                  <div className="location-card__visual">
                    <Icon name="download" size="lg" />
                  </div>
                  <div className="location-card__content">
                    <div className="location-card__text">
                      <span className="location-card__label">Compartment ID</span>
                      <span className="location-card__value">AS-112025-01-01</span>
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
                  leadingIcon={<Icon name="qrScanner" size="md" />}
                />
              </div>
            </Card>
          </div>

          {/* MIDDLE COLUMN */}
          <div className="product-page__column">
            <Card>
              <h3>Details</h3>
              <div className="product-details">
                <div className="product-details__row">
                  <span className="product-details__label">Order ID</span>
                  <span className="product-details__value product-details__value--strong">2784741147</span>
                </div>
                <div className="product-details__row">
                  <span className="product-details__label">Name</span>
                  <span className="product-details__value product-details__value--strong">{activeItem.name}</span>
                </div>
                <div className="product-details__row">
                  <span className="product-details__label">SKU</span>
                  <span className="product-details__value product-details__value--strong">{activeItem.sku}</span>
                </div>
                <div className="product-details__row">
                  <span className="product-details__label">Image</span>
                  <div className="product-details__image">
                    {activeItem.image ? (
                      <img src={activeItem.image} alt={activeItem.name} />
                    ) : (
                      <div className="product-details__no-image">no image</div>
                    )}
                  </div>
                </div>
                <div className="product-details__row">
                  <span className="product-details__label">Order line</span>
                  <span className="product-details__value product-details__value--strong">n/a</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* DRAWER */}
        <aside className={["product-drawer", isDrawerOpen ? "product-drawer--open" : ""].join(" ")}>
          <div className="product-drawer__rail">
            <div className="product-drawer__rail-main">

              <button type="button" className={["product-drawer__icon", drawerView === "settings" ? "is-active" : ""].join(" ")} onClick={() => openDrawer("settings")}>
                <Icon name="settings" size="md" />
              </button>

              <button type="button" className={["product-drawer__icon", drawerView === "stock" ? "is-active" : ""].join(" ")} onClick={() => openDrawer("stock")}>
                <Icon name="inventory" size="md" />
              </button>

              <button type="button" className={["product-drawer__icon", drawerView === "print" ? "is-active" : ""].join(" ")} onClick={() => openDrawer("print")}>
                <Icon name="print" size="md" />
              </button>

              <button type="button" className={["product-drawer__icon", drawerView === "history" ? "is-active" : ""].join(" ")} onClick={() => openDrawer("history")}>
                <Icon name="history" size="md" />
              </button>

            </div>

            <div className="product-drawer__panel-close">
              <button
                type="button"
                className={["product-drawer__close", isDrawerOpen ? "is-open" : ""].join(" ")}
                onClick={closeDrawer}
              >
                <Icon name={isDrawerOpen ? "chevronRightStroke" : "chevronLeftStroke"} size="md" />
              </button>
            </div>
          </div>

          {isDrawerOpen && (
            <div className="product-drawer__panel">
              <div className="product-drawer__panel-content">

                {/* SETTINGS */}
                {drawerView === "settings" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">Settings</div>
                    </div>
                    <div className="drawer-section-itemsgroup">
                      <div className="drawer-section-item">
                        <Toggle title="Auto confirm" checked={false} onCheckedChange={() => {}} />
                      </div>
                      <div className="drawer-section-item">
                        <Toggle title="Require double scan" checked={true} onCheckedChange={() => {}} />
                      </div>
                    </div>
                    <div className="drawer-section-cta">
                      <Button variant="ghost" size="sm">
                        Reset to defaults
                      </Button>
                    </div>
                  </div>
                )}

                {/* STOCK INFORMATION */}
                {drawerView === "stock" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">Stock information</div>
                    </div>
                    <div className="drawer-section-itemsgroup">
                      <div className="drawer-section-item">
                        <span className="drawer-section-item-label">SKU</span>
                        <span className="drawer-section-item-value">{activeItem.sku}</span>
                      </div>
                      <div className="drawer-section-item">
                        <span className="drawer-section-item-label">Total in stock</span>
                        <span className="drawer-section-item-value">142 units</span>
                      </div>
                      <div className="drawer-section-item">
                        <span className="drawer-section-item-label">Reserved</span>
                        <span className="drawer-section-item-value">38 units</span>
                      </div>
                      <div className="drawer-section-item">
                        <span className="drawer-section-item-label">Available</span>
                        <span className="drawer-section-item-value">104 units</span>
                      </div>
                      <div className="drawer-section-item">
                        <span className="drawer-section-item-label">Compartments</span>
                        <span className="drawer-section-item-value">3 bins</span>
                      </div>
                      <div className="drawer-section-item">
                        <span className="drawer-section-item-label">Last putaway</span>
                        <span className="drawer-section-item-value">07-Jan-2026</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRINT */}
                {drawerView === "print" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">Print</div>
                    </div>
                    <div className="drawer-section-item">
                      <Button variant="ghost" size="sm" className="drawer-print-button">Print product label</Button>
                    </div>
                    <div className="drawer-section-item">
                      <Button variant="ghost" size="sm" className="drawer-print-button">Print compartment label</Button>
                    </div>
                  </div>
                )}

                {/* HISTORY */}
                {drawerView === "history" && (
                  <div className="drawer-section">
                    <div className="drawer-section-item">
                      <div className="drawer-section-item-title">History</div>
                    </div>
                    <div className="drawer-section-item drawer-history-list">
                      <div className="drawer-history-row"><strong>Received by a.kovach</strong><span>10:42</span></div>
                      <div className="drawer-history-row"><strong>Scanned SKU</strong><span>10:41</span></div>
                      <div className="drawer-history-row"><strong>Putaway started</strong><span>10:39</span></div>
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
            <Button variant="ghost" intent="danger" leadingIcon="chevronLeftStroke" onClick={() => window.location.assign("/inbound/putaway")}>Exit</Button>
          </div>
          <div className="product-page__footer-center" />
          <div className="product-page__footer-right">
            <Button variant="primary" disabled={!isProductVerified} onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </footer>
      </div>

      {/* QUANTITY CONFIRM DIALOG */}
      <Dialog
        isOpen={isDialogOpen}
        intent="warning"
        title="Quantity changes"
        footerLeft={<Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>}
        footerRight={<Button variant="primary" onClick={finalizeConfirm}>Confirm</Button>}
      >
        Are you sure you can put away different quantity than expected?
      </Dialog>

      {/* EXIT CONFIRM DIALOG */}
      <Dialog
        isOpen={isExitDialogOpen}
        intent="warning"
        title="Exit task"
        footerLeft={<Button variant="ghost" onClick={() => setIsExitDialogOpen(false)}>Cancel</Button>}
        footerRight={<Button variant="primary" onClick={handleExitConfirm}>Confirm</Button>}
      >
        Are you sure you want to cancel the current task and return to the dashboard?
      </Dialog>

    </ProductPageLayout>
  );
}
