"use client";

import { useState } from "react";
import styles from "./Gallery.module.css";

export interface GalleryFigure {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  frame: "plain" | "phone";
}

/**
 * Figures for one project. Phone screenshots sit side by side; other figures
 * share one frame with numbered buttons to switch between them.
 */
export function Gallery({ figures, showLabel }: { figures: GalleryFigure[]; showLabel: string }) {
  const [index, setIndex] = useState(0);
  if (figures.length === 0) return null;

  if (figures.every((f) => f.frame === "phone")) {
    return (
      <div className={styles.phones} style={{ ["--count" as string]: figures.length }}>
        {figures.map((figure) => (
          <figure key={figure.src} className={styles.phone}>
            <img src={figure.src} width={figure.width} height={figure.height} alt={figure.alt} loading="lazy" decoding="async" />
            <figcaption>{figure.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const current = figures[Math.min(index, figures.length - 1)];
  // One frame for all figures: as wide as the tallest plain figure needs, so none is cropped.
  const plain = figures.filter((f) => f.frame !== "phone");
  const ratio = Math.min(3, Math.max(1.2, ...(plain.length ? [Math.min(...plain.map((f) => f.width / f.height))] : [1.6])));
  return (
    <div className={styles.gallery}>
      <figure className={styles.figure}>
        <div className={styles.frame} data-frame={current.frame} style={{ aspectRatio: String(ratio) }}>
          <img
            key={current.src}
            src={current.src}
            width={current.width}
            height={current.height}
            alt={current.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
        <figcaption className={styles.caption} aria-live="polite">
          {figures.length > 1 ? (
            <span className={styles.count}>
              {index + 1}/{figures.length}
            </span>
          ) : null}
          {current.caption}
        </figcaption>
      </figure>
      {figures.length > 1 ? (
        <div className={styles.thumbs} role="group" aria-label={showLabel}>
          {figures.map((figure, i) => (
            <button
              key={figure.src}
              type="button"
              className={styles.thumb}
              aria-pressed={i === index}
              aria-label={`${showLabel} ${i + 1}: ${figure.caption}`}
              onClick={() => setIndex(i)}
            >
              <img src={figure.src} width={figure.width} height={figure.height} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
