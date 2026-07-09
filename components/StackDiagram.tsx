"use client";

import dynamic from "next/dynamic";
import type { LayerResult } from "@/types/recommend";

const StackDiagramScene = dynamic(() => import("./StackDiagramScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 480,
        width: "100%",
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.07)",
        background: "#07080f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
        Loading diagram…
      </p>
    </div>
  ),
});

export function StackDiagram({ layers }: { layers: LayerResult[] }) {
  return <StackDiagramScene layers={layers} />;
}
