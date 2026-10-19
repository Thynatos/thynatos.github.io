"""Route figure for the Sabancı case, drawn from the challenge repository's data.

Grey legs were driven before mid-day and stay locked; teal legs are the re-planned
afternoon. Amber rings are machines that failed; filled diamonds were repaired
the same day.

    python scripts/plot_sabanci.py [instance_number]
"""
import json
import sys
from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt

REPO = Path(r"C:/Users/badir/Documents/AI_Tools_and_Research/optimization challenge/optchall_26_data")
OUT = Path(__file__).resolve().parent.parent / "media-src" / "generated" / "sabanci-routes.png"
N = sys.argv[1] if len(sys.argv) > 1 else "7"

PANEL, INK, GREY, TEAL, AMBER = "#eef2f4", "#0f2233", "#a9b6c0", "#0a7570", "#e0a100"

instance = json.loads((REPO / f"instances/instance_{N}.json").read_text(encoding="utf-8"))
solution = json.loads((REPO / f"results/solutions/sol_instance_{N}.json").read_text(encoding="utf-8"))
xy = {node["id"]: (node["x"], node["y"]) for node in instance["network"]["nodes"]}
depot = instance["depot_node_id"]
mid_day = instance["mid_day_time"]
failed = {m["node"]: m for m in instance["machines"] if "failed_at" in m}

repaired = set()
fig, ax = plt.subplots(figsize=(16, 10), dpi=100)
fig.patch.set_facecolor(PANEL)
ax.set_facecolor(PANEL)

for truck in solution["trucks"]:
    visits = truck["route"]["machine_visits"]
    if visits[-1]["node_id"] != depot:
        visits = visits + [{"node_id": depot, "arrival_time": 10**9}]
    for a, b in zip(visits, visits[1:]):
        locked = b["arrival_time"] <= mid_day
        (x0, y0), (x1, y1) = xy[a["node_id"]], xy[b["node_id"]]
        ax.plot([x0, x1], [y0, y1], color=GREY if locked else TEAL, lw=1.8 if locked else 2.4,
                solid_capstyle="round", zorder=1 if locked else 2)
    for v in visits:
        if "Repair" in v.get("operations", []):
            repaired.add(v["node_id"])

machines = [m["node"] for m in instance["machines"]]
ax.scatter([xy[n][0] for n in machines], [xy[n][1] for n in machines], s=26, color=INK, zorder=3)
ax.scatter([xy[n][0] for n in failed], [xy[n][1] for n in failed], s=420, facecolors="none",
           edgecolors=AMBER, linewidths=3, zorder=4)
done = [n for n in failed if n in repaired]
ax.scatter([xy[n][0] for n in done], [xy[n][1] for n in done], s=110, marker="D", color=AMBER,
           edgecolors=INK, linewidths=1.4, zorder=5)
ax.scatter([xy[depot][0]], [xy[depot][1]], s=260, marker="s", color=INK, zorder=6)

ax.set_aspect("equal")
ax.margins(0.04)
ax.axis("off")
OUT.parent.mkdir(parents=True, exist_ok=True)
fig.savefig(OUT, facecolor=PANEL, bbox_inches="tight", pad_inches=0.3)
print(f"instance {N}: {len(machines)} machines, {instance['n_trucks']} trucks, "
      f"{len(failed)} failed, {len(done)} repaired the same day -> {OUT.name}")
