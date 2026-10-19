"""Collect the site's images, convert them to WebP and write src/content/media.json.

Sources are either project artifacts elsewhere in Documents (copied into media-src/
the first time, so the site keeps its own copy) or files produced by the capture
scripts in media-src/. Missing sources are skipped; the matching figures then
simply do not render.

    python scripts/prepare_media.py
"""
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "media-src"
OUT_DIR = ROOT / "public" / "media"
MANIFEST = ROOT / "src" / "content" / "media.json"
DOCS = Path("C:/Users/badir/Documents")

# media key -> (source, max width in px)
SOURCES = {
    "tcotz/planner.webp": (DOCS / "Academic_Archive/TCOTZ/landing-page/ui_schedule.png", 1600),
    "tcotz/validation.webp": (DOCS / "cv and applcatons/Portfolio_Data/TCOTZ_21/figures/validation.png", 1600),
    "sabanci/routes.webp": (SRC_DIR / "generated/sabanci-routes.png", 1600),
    "esik/home.webp": (SRC_DIR / "captures/esik-home.png", 720),
    "esik/overlay.webp": (SRC_DIR / "captures/esik-overlay.png", 720),
    "esik/suggestion.webp": (SRC_DIR / "captures/esik-suggestion.png", 720),
    "esik/report.webp": (SRC_DIR / "captures/esik-report.png", 720),
    "nudgewell/by-hour.webp": (DOCS / "IC/SIC_AI_18_Capstone_Group_6/deliverables/02_literature_data_technology_review/figures/fig2_by_hour.png", 1600),
    "nudgewell/said-vs-did.webp": (DOCS / "IC/SIC_AI_18_Capstone_Group_6/deliverables/02_literature_data_technology_review/figures/fig1_said_vs_did.png", 1600),
    "ratemygig/home.webp": (SRC_DIR / "captures/ratemygig-home.png", 1600),
    "ratemygig/event.webp": (SRC_DIR / "captures/ratemygig-event.png", 1600),
    "studies/coldchain-routes.webp": (DOCS / "Academic_Archive/479project/output/figure_vrp_routes.png", 1200),
    "studies/ubereats-map.webp": (SRC_DIR / "captures/ubereats-map.png", 1100),
    "studies/sac-learning-curve.webp": (DOCS / "AI_Tools_and_Research/sac-her-fetchreach/results/baseline_learning_curve.png", 1400),
}


def main() -> None:
    manifest = {}
    for key, (source, max_width) in SOURCES.items():
        if not source.exists():
            print(f"skip  {key}  (missing {source})")
            continue
        # Keep a copy of external artifacts inside the project.
        if SRC_DIR not in source.parents:
            local = SRC_DIR / "artifacts" / key.replace(".webp", source.suffix)
            local.parent.mkdir(parents=True, exist_ok=True)
            if not local.exists():
                shutil.copy2(source, local)
            source = local
        image = Image.open(source)
        image = image.convert("RGBA") if image.mode in ("RGBA", "LA", "P") else image.convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.LANCZOS)
        dest = OUT_DIR / key
        dest.parent.mkdir(parents=True, exist_ok=True)
        image.save(dest, "WEBP", quality=84, method=6)
        manifest[key] = {"width": image.width, "height": image.height}
        print(f"ok    {key}  {image.width}x{image.height}  {dest.stat().st_size // 1024} KB")
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"wrote {MANIFEST.relative_to(ROOT)} ({len(manifest)} images)")


if __name__ == "__main__":
    main()
