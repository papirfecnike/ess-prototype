import type { LoaderFunction } from "react-router";
import { useState } from "react";

import { PageLayout } from "@/components/layout/PageLayout";
import { PageSection } from "@/components/layout/PageSection";

import { ExpandableDataTable } from "@/components/data/ExpandableDataTable";
import type { DataTableColumn } from "@/components/data/DataTableCore";
import { Tag } from "@/components/ui/tag/Tag";
import { Icon } from "@/components/ui/icon/Icon";

export const loader: LoaderFunction = async () => {
  return null;
};

/* =========================
   STATUS → TAG RENDERER
   ========================= */

function renderStatusTag(status: string) {
  switch (status) {
    case "In progress":
      return <Tag label={status} variant="warning" />;

    case "Prepared":
      return <Tag label={status} variant="default" />;

    case "Waiting":
      return <Tag label={status} variant="danger" />;

    case "Completed":
      return <Tag label={status} variant="success" />;

    default:
      return <Tag label={status} />;
  }
}

export default function InventoryInspection() {
  /* =========================
     COLUMNS
     ========================= */

  const columns: DataTableColumn[] = [
    { key: "batchid", label: "Batch ID", sortable: true },
    { key: "product", label: "Product", sortable: true },
    { key: "sku", label: "SKU", sortable: true },
    { key: "compartment", label: "Compartment ID", sortable: true },
    { key: "maxcapacity", label: "Max. capacity", align: "center" },
    { key: "currentqty", label: "Current quantity", align: "center" },

    {
      key: "events",
      label: "Events",
      align: "center",
      renderCell: () => (
        <button
          type="button"
          className="btn--ghost"
          aria-label="View history"
          onClick={() => {
            console.log("open history");
          }}
        >
          <Icon name="history" size="sm" />
        </button>
      ),
    },
  ];

  /* =========================
     ROWS
     ========================= */

  const rows = [
    {
      batchid: 432170,
      product: "Bisgaard Winter Boots - Pixie - Khaki",
      sku: "WD750",
      compartment: "AS-887652-01-01",
      maxcapacity: "12",
      currentqty: "23",
    },
    {
      batchid: 432171,
      product: "Name It Jumpsuit - NkfRoka - Burgundy",
      sku: "WF773",
      compartment: "AS-886752-01-01",
      maxcapacity: "12",
      currentqty: "98",
    },
    {
      batchid: 432174,
      product: "adidas Performance Shoes - Advantage 2.0",
      sku: "WF685",
      compartment: "AS-889872-01-01",
      maxcapacity: "12",
      currentqty: "09",
    },
    {
      batchid: 432175,
      product: "adidas Performance Shoes - VL Court 3.0 K",
      sku: "BS970",
      compartment: "AS-234652-01-0",
      maxcapacity: "12",
      currentqty: "11",
    },
    {
      batchid: 432176,
      product: "adidas Performance Shoes - Run 70s 2.0 EL C - Navy/White",
      sku: "BM841",
      compartment: "AS-854658-01-01",
      maxcapacity: "12",
      currentqty: "65",
    },
    {
      batchid: 432177,
      product: "Name It Blouse - Rib - Lavender Gray",
      sku: "WH768",
      compartment: "AS-991652-01-01",
      maxcapacity: "12",
      currentqty: "53",
    },
    {
      batchid: 432177,
      product: "Wheat Boxers - 2-Pack - Louis - Blue Multi Stripe",
      sku: "WC240",
      compartment: "AS-887342-01-01/3",
      maxcapacity: "12",
      currentqty: "48",
    },
    {
      batchid: 432177,
      product: "Molo Collegegenser - Maxi - Multi Kronblader",
      sku: "WI810",
      compartment: "AS-887117-01-01/3",
      maxcapacity: "12",
      currentqty: "71",
    },
    {
      batchid: 432177,
      product: "Name It Blouse - Rib - Lavender Gray",
      sku: "WH768",
      compartment: "AS-887652-01-01/3",
      maxcapacity: "12",
      currentqty: "23",
    },
    {
      batchid: 432177,
      product: "Name It Blouse - Rib - Lavender Gray",
      sku: "WH768",
      compartment: "AS-887652-01-01/3",
      maxcapacity: "12",
      currentqty: "23",
    },
  ];

  /* =========================
     RENDER
     ========================= */

  return (
    <PageLayout
      title="Inspection"
      subtitle="All inventory operations and advice lines"
    >
      <PageSection>
        <ExpandableDataTable
          rowIdKey="batchid"
          columns={columns}
          rows={rows}
          renderExpandedRow={(row) => (
            <table>
              <thead>
                <tr>
                  <th>Production ID</th>
                  <th>Location type</th>
                  <th>Location ID</th>
                  <th>Location capacity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>WD750-01</td>
                  <td>1/4 bin</td>
                  <td>AS-326437-04-01</td>
                  <td>12/80</td>
                  <td>In progress</td>
                </tr>
                <tr>
                  <td>WD750-01</td>
                  <td>1/4 bin</td>
                  <td>AS-322439-04-04</td>
                  <td>30/80</td>
                  <td>Prepared</td>
                </tr>
              </tbody>
            </table>
          )}

        />

      </PageSection>
    </PageLayout>
  );
}
