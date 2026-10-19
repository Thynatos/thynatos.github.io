"""Subset the TeX Gyre Pagella OTFs shipped with MiKTeX and save them as WOFF2.

TeX Gyre Pagella is distributed under the GUST Font License. The glyph outlines
are unchanged; the files are only subset to Latin (incl. Turkish) and re-wrapped.
"""
import sys
from pathlib import Path
from fontTools import subset

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
OUT.mkdir(parents=True, exist_ok=True)
UNICODES = "U+0000-024F,U+02C6-02DD,U+2000-206F,U+20AC,U+20BA,U+2190-2193,U+2212,U+2248,U+2264-2265,U+00D7"
for name in ("regular", "italic", "bold"):
    dest = OUT / f"pagella-{name}.woff2"
    subset.main([
        str(SRC / f"texgyrepagella-{name}.otf"),
        f"--unicodes={UNICODES}",
        "--layout-features=kern,liga,onum,lnum,tnum,pnum,frac,sups",
        "--flavor=woff2",
        f"--output-file={dest}",
    ])
    print(dest.name, dest.stat().st_size // 1024, "KB")
