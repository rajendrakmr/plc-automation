"use client";

import React, { useState, useRef, useCallback } from "react";
import { FadeIn } from "./Sections1";
import styles from "./GlobalReach.module.css";

interface MarkerInfo {
  name: string;
  coords: [number, number];
  delay: number;
  flag: string;
  address: string;
  phone: string;
  email: string;
}

interface PopupState {
  marker: MarkerInfo;
  svgX: number;
  svgY: number;
}

const markers: MarkerInfo[] = [
  {
    name: "USA",
    coords: [-95.7, 37.1],
    delay: 0,
    flag: "🇺🇸",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "United Kingdom",
    coords: [-0.1, 51.5],
    delay: 0.3,
    flag: "🇬🇧",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "India",
    coords: [77.2, 28.6],
    delay: 0.6,
    flag: "🇮🇳",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Thailand",
    coords: [100.5, 13.8],
    delay: 0.9,
    flag: "🇹🇭",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Vietnam",
    coords: [106.7, 10.8],
    delay: 1.1,
    flag: "🇻🇳",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Malaysia",
    coords: [101.7, 3.1],
    delay: 1.3,
    flag: "🇲🇾",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Singapore",
    coords: [103.8, 1.3],
    delay: 1.5,
    flag: "🇸🇬",
    address: "10 Ubi Crescent Blk 10, Lobby B, Ubi Techpark #05-31, Singapore - 408564",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Indonesia",
    coords: [106.8, -6.2],
    delay: 1.7,
    flag: "🇮🇩",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Philippines",
    coords: [120.9, 14.6],
    delay: 1.9,
    flag: "🇵🇭",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Taiwan",
    coords: [121.5, 25.0],
    delay: 2.1,
    flag: "🇹🇼",
    address: "",
    phone: "+65 8950 7034",
    email: "sales@plcautomat.com",
  },
  {
    name: "Australia",
    coords: [133.8, -25.3],
    delay: 2.3,
    flag: "🇦🇺",
    address: "Suite 302, 13/15 Wentworth Ave, Sydney NSW 2000",
    phone: "+61 421 000 214",
    email: "sales@plcautomat.com",
  },
  {
  name: "New Zealand",
  coords: [174.8, -41.3],
  delay: 2.5,
  flag: "🇳🇿",
  address: "",
  phone: "+61 421 000 214",
 email: "sales@plcautomat.com",
},
];;

function toSvgXY(lon: number, lat: number) {
  return {
    x: ((lon + 180) / 360) * 960,
    y: ((90 - lat) / 180) * 500,
  };
}

// ─── Popup Component ─────────────────────────────────────────────────────────

interface PopupProps {
  popup: PopupState;
  svgRef: React.RefObject<SVGSVGElement | null>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

function MarkerPopup({ popup, svgRef, containerRef, onClose }: PopupProps) {
  const { marker, svgX, svgY } = popup;

  // Convert SVG coords → pixel position relative to container
  let left = 50;
  let top = 50;

  if (svgRef.current && containerRef.current) {
    const svgRect = svgRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const svgW = svgRect.width;
    const svgH = svgRect.height;

    const px = (svgX / 960) * svgW;
    const py = (svgY / 500) * svgH;

    left = svgRect.left - containerRect.left + px;
    top = svgRect.top - containerRect.top + py;
  }

  return (
    <div
      className={styles.grPopup}
      style={{ left, top }}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-label={`${marker.name} office details`}
    >
      {/* Arrow */}
      <div className={styles.grPopupArrow} />

      {/* Close */}
      <button
        className={styles.grPopupClose}
        onClick={onClose}
        aria-label="Close popup"
      >
        ✕
      </button>

      {/* Header */}
      <div className={styles.grPopupHeader}>
        <span className={styles.grPopupFlag}>{marker.flag}</span>
        <span className={styles.grPopupTitle}>{marker.name}</span>
      </div>

      {/* Details */}
      <div className={styles.grPopupBody}>


        <div className={styles.grPopupRow}>
          <svg
            className={styles.grPopupIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
          </svg>
          <a href={`tel:${marker.phone}`} className={styles.grPopupLink}>
            {marker.phone}
          </a>
        </div>

        <div className={styles.grPopupRow}>
          <svg
            className={styles.grPopupIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <a href={`mailto:${marker.email}`} className={styles.grPopupEmailLink}>
            {marker.email}
          </a>
        </div>

        {marker.address && <div className={styles.grPopupRow}>
          <svg
            className={styles.grPopupIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className={styles.grPopupVal}>{marker.address}</span>
        </div>}
      </div>
    </div>
  );
}

// ─── World Map Component ──────────────────────────────────────────────────────

interface WorldMapProps {
  activeMarker: string | null;
  onMarkerClick: (marker: MarkerInfo, svgX: number, svgY: number) => void;
  svgRef: React.RefObject<SVGSVGElement | null>;
}

function WorldMap({ activeMarker, onMarkerClick, svgRef }: WorldMapProps) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 960 500"
      className={styles.grSvg}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="World map showing PLC Automation Group office locations"
      role="img"
    >
      {/* ── Continent outlines ── */}

      {/* North America */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M38,52 L62,45 L88,38 L115,35 L140,40 L162,52 L178,65 L188,80 L192,100 L190,122 L182,142 L172,158 L162,170 L152,182 L140,196 L128,210 L118,226 L108,240 L96,250 L80,258 L66,262 L52,256 L40,244 L30,228 L22,210 L18,190 L18,168 L22,148 L28,128 L32,108 L34,88 L36,70 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M18,98 L28,90 L38,88 L44,95 L40,104 L30,108 L20,106 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M228,14 L258,10 L280,18 L288,34 L280,52 L260,62 L238,60 L220,50 L214,36 L220,22 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M110,258 L126,252 L138,262 L142,278 L136,292 L122,298 L108,290 L102,274 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M118,298 L148,286 L178,280 L204,288 L222,302 L232,322 L234,346 L228,372 L218,398 L204,422 L188,442 L170,456 L152,460 L136,452 L122,436 L112,416 L106,394 L106,370 L110,346 L114,322 Z" />

      {/* Europe */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M388,52 L418,46 L448,44 L474,48 L494,58 L506,72 L510,90 L504,108 L490,120 L472,128 L452,132 L432,130 L412,122 L396,110 L386,96 L382,78 L384,62 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M430,24 L448,18 L464,22 L472,36 L466,52 L450,58 L434,52 L426,38 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M376,56 L386,50 L392,58 L388,68 L378,70 L372,62 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M376,90 L394,86 L408,92 L412,108 L404,120 L388,124 L374,116 L368,102 Z" />

      {/* Africa */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M388,140 L420,134 L450,132 L476,138 L498,150 L512,168 L516,190 L512,214 L504,238 L494,264 L482,290 L468,316 L452,338 L434,354 L414,360 L394,354 L376,338 L362,316 L352,290 L346,262 L346,234 L350,206 L358,180 L368,158 L378,146 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M524,252 L534,244 L542,250 L542,268 L534,280 L524,276 L520,262 Z" />

      {/* Middle East */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M510,120 L546,112 L574,118 L592,132 L598,150 L590,170 L576,184 L556,192 L534,190 L514,178 L504,160 L504,140 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M558,148 L580,142 L596,150 L600,168 L588,180 L566,184 L548,176 L544,160 L550,150 Z" />

      {/* Asia main */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M498,44 L540,36 L590,30 L645,28 L700,30 L752,36 L798,44 L836,56 L862,72 L878,92 L882,114 L872,136 L854,154 L832,168 L808,178 L782,184 L756,188 L728,186 L700,180 L672,172 L646,162 L622,152 L600,142 L578,134 L558,126 L540,118 L522,110 L508,100 L498,86 L494,70 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M594,156 L622,150 L644,158 L652,176 L650,198 L638,216 L620,228 L600,226 L584,212 L578,192 L580,172 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M690,172 L716,166 L734,174 L738,194 L730,214 L714,226 L696,224 L682,210 L678,192 L682,178 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M710,218 L722,212 L730,220 L728,238 L716,248 L704,242 L700,228 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M698,248 L728,240 L752,244 L760,258 L752,272 L728,278 L704,272 L694,260 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M748,230 L772,224 L790,232 L796,250 L788,268 L768,276 L748,268 L738,250 L740,236 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M730,278 L762,272 L782,278 L784,290 L762,296 L734,292 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M762,174 L776,168 L784,176 L782,192 L770,200 L758,194 L756,180 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M790,148 L800,144 L806,152 L802,164 L792,166 L786,158 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M826,100 L840,94 L850,100 L850,114 L838,122 L826,116 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M838,118 L852,112 L860,120 L856,132 L844,136 L836,128 Z" />

      {/* Russia */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M490,26 L550,18 L620,14 L700,12 L770,14 L840,20 L900,30 L920,44 L918,62 L898,72 L862,72 L838,58 L800,46 L756,38 L700,32 L640,30 L580,32 L530,36 L498,44 L490,36 Z" />

      {/* Australia */}
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M720,318 L760,308 L802,304 L840,308 L870,320 L888,340 L892,364 L882,388 L862,406 L834,418 L800,422 L766,416 L736,402 L716,382 L708,356 L710,334 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M808,426 L820,420 L830,428 L826,440 L814,442 L806,434 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M906,370 L918,362 L926,372 L920,388 L908,390 Z" />
      <path fill="#b8cfe8" stroke="#8eb0d4" strokeWidth="0.8"
        d="M912,392 L922,386 L930,396 L924,410 L912,410 Z" />

      {/* ── Markers ── */}
      {markers.map((m) => {
        const { x, y } = toSvgXY(m.coords[0], m.coords[1]);
        const isActive = activeMarker === m.name;

        return (
          <g
            key={m.name}
            transform={`translate(${x.toFixed(1)},${y.toFixed(1)})`}
            onClick={(e) => {
              e.stopPropagation();
              onMarkerClick(m, x, y);
            }}
            className={styles.grMarker}
            role="button"
            tabIndex={0}
            aria-label={`${m.name} office`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onMarkerClick(m, x, y);
              }
            }}
          >
            {/* Pulse ring */}
            <circle cx="0" cy="0" r="10" fill="#05339c" fillOpacity="0.18">
              <animate
                attributeName="r"
                values="5;16;5"
                dur="3s"
                begin={`${m.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="fill-opacity"
                values="0.3;0;0.3"
                dur="3s"
                begin={`${m.delay}s`}
                repeatCount="indefinite"
              />
            </circle>

            {/* Outer dot */}
            <circle
              cx="0"
              cy="0"
              r={isActive ? 6 : 4.5}
              fill={isActive ? "#0033cc" : "#05339c"}
              opacity="0.95"
              style={{ transition: "r 0.15s ease" }}
            />

            {/* Inner white */}
            <circle cx="0" cy="0" r="2" fill="#ffffff" />
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export const GlobalReach = () => {
  const [popup, setPopup] = useState<PopupState | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMarkerClick = useCallback(
    (marker: MarkerInfo, svgX: number, svgY: number) => {
      // Toggle: click same marker again → close
      if (popup?.marker.name === marker.name) {
        setPopup(null);
        return;
      }
      setPopup({ marker, svgX, svgY });
    },
    [popup]
  );

  const handleClose = useCallback(() => setPopup(null), []);

  return (
    <section>
      <FadeIn>
        <div
          ref={containerRef}
          className={styles.grContainer}
          onClick={handleClose}
        >
          <WorldMap
            activeMarker={popup?.marker.name ?? null}
            onMarkerClick={handleMarkerClick}
            svgRef={svgRef}
          />

          {popup && (
            <MarkerPopup
              popup={popup}
              svgRef={svgRef}
              containerRef={containerRef}
              onClose={handleClose}
            />
          )}
        </div>
      </FadeIn>
    </section>
  );
};