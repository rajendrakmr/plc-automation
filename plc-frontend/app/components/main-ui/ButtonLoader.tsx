"use client";

interface ButtonLoaderProps {
  size?: number;
  color?: string;
  borderColor?: string;
}

export default function ButtonLoader({
  size = 14,
  color = "#fff",
  borderColor = "rgba(255,255,255,.4)",
}: ButtonLoaderProps) {
  return (
    <>
      <span
        style={{
          width: `${size}px`,
          height: `${size}px`,
          border: `2px solid ${borderColor}`,
          borderTop: `2px solid ${color}`,
          borderRadius: "50%",
          display: "inline-block",
          animation: "btn-spin .7s linear infinite",
          flexShrink: 0,
        }}
      />

      <style>{`
        @keyframes btn-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}