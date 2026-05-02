# Generate placeholder CheckPlease icons (CP text on the brand navy background).
# Run from the repo root:  python scripts/make_icons.py
# Final icons should be commissioned (Fiverr ~$20-50) before Chrome Web Store submission.

from PIL import Image, ImageDraw, ImageFont
import os

BRAND_NAVY = (13, 58, 94)   # #0d3a5e — same as the modal accent
WHITE = (255, 255, 255)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "icons")
os.makedirs(OUT_DIR, exist_ok=True)

SIZES = [16, 48, 128]


def find_font(size):
    """Try to load Verdana — the brand font. Fall back to a system default if missing."""
    candidates = [
        "C:/Windows/Fonts/verdanab.ttf",
        "C:/Windows/Fonts/Verdana Bold.ttf",
        "C:/Windows/Fonts/verdana.ttf",
        "/Library/Fonts/Verdana.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def make_icon(px):
    img = Image.new("RGBA", (px, px), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded square background
    radius = max(2, px // 6)
    draw.rounded_rectangle((0, 0, px - 1, px - 1), radius=radius, fill=BRAND_NAVY)

    # "CP" text — sized so it fills the square nicely
    text = "CP"
    target_text_height = int(px * 0.55)
    font = find_font(target_text_height)

    # Measure
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (px - text_w) // 2 - bbox[0]
    y = (px - text_h) // 2 - bbox[1]
    draw.text((x, y), text, fill=WHITE, font=font)

    return img


for size in SIZES:
    img = make_icon(size)
    out_path = os.path.join(OUT_DIR, f"icon{size}.png")
    img.save(out_path, "PNG")
    print(f"Wrote {out_path}")

print("Done.")
