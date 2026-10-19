"""Small adb helper for capturing app screenshots from the Android emulator.

    python scripts/emu.py shot NAME        save media-src/captures/raw/NAME.png (+ a small preview)
    python scripts/emu.py tap X Y          tap at device pixels
    python scripts/emu.py text "abc"       type text (spaces allowed)
    python scripts/emu.py key KEYCODE      e.g. BACK, HOME, ENTER
    python scripts/emu.py swipe X1 Y1 X2 Y2
"""
import io
import subprocess
import sys
from pathlib import Path

from PIL import Image

ADB = r"C:\Users\badir\AppData\Local\Android\Sdk\platform-tools\adb.exe"
RAW = Path(__file__).resolve().parent.parent / "media-src" / "captures" / "raw"
RAW.mkdir(parents=True, exist_ok=True)


def adb(*args: str, capture: bool = False) -> bytes:
    result = subprocess.run([ADB, *args], check=True, capture_output=True)
    return result.stdout


def main() -> None:
    cmd, *rest = sys.argv[1:]
    if cmd == "shot":
        png = adb("exec-out", "screencap", "-p", capture=True)
        image = Image.open(io.BytesIO(png))
        image.save(RAW / f"{rest[0]}.png")
        image.resize((image.width * 2 // 5, image.height * 2 // 5)).save(RAW / "view.png")
        print(f"saved {rest[0]}.png {image.size}")
    elif cmd == "tap":
        adb("shell", "input", "tap", rest[0], rest[1])
    elif cmd == "text":
        adb("shell", "input", "text", rest[0].replace(" ", "%s"))
    elif cmd == "key":
        adb("shell", "input", "keyevent", f"KEYCODE_{rest[0]}")
    elif cmd == "swipe":
        adb("shell", "input", "swipe", *rest[:4], "400")
    else:
        raise SystemExit(f"unknown command {cmd}")


if __name__ == "__main__":
    main()
