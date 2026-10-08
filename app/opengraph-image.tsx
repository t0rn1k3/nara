import { ImageResponse } from "next/og";

export const alt = "NARA — The European Narrative Atlas";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0b1426",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
            NA-RA
          </div>
          <div
            style={{
              display: "flex",
              border: "2px solid #0b1426",
              padding: "12px 18px",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Research initiative
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              maxWidth: 920,
              fontSize: 76,
              fontWeight: 600,
              lineHeight: 1.05,
            }}
          >
            The European Narrative Atlas
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 860,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#3d4a5c",
            }}
          >
            Mapping political narratives across Europe
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            height: 14,
            background: "#f69697",
          }}
        />
      </div>
    ),
    size,
  );
}
