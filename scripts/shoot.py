"""Full-page QA screenshots of the running site (desktop and phone, both languages).

    python scripts/shoot.py [base_url]
Writes qa/<lang>-<device>.png and section crops for closer review.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3210"
OUT = Path(__file__).resolve().parent.parent / "qa"
OUT.mkdir(exist_ok=True)
PAGES = {"en": "/", "tr": "/tr/"}
DEVICES = {"desktop": {"width": 1440, "height": 900}, "phone": {"width": 390, "height": 844}}
SECTIONS = ["top", "work", "studies", "experience", "awards", "skills", "contact"]

with sync_playwright() as p:
    browser = p.chromium.launch()
    for device, viewport in DEVICES.items():
        context = browser.new_context(viewport=viewport, device_scale_factor=1, reduced_motion="reduce")
        page = context.new_page()
        for lang, path in PAGES.items():
            page.goto(BASE + path, wait_until="networkidle")
            page.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager')")
            page.evaluate("document.querySelectorAll('details').forEach(d => d.open = true)")
            page.add_style_tag(content="header{position:static !important}")
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(600)
            page.screenshot(path=OUT / f"{lang}-{device}.png", full_page=True)
            if device == "desktop" and lang == "en":
                for section in SECTIONS:
                    el = page.locator(f"#{section}")
                    if el.count():
                        el.first.screenshot(path=OUT / f"{lang}-{device}-{section}.png")
            print("shot", lang, device)
        context.close()
    browser.close()
