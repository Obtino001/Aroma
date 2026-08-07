import cv2
import numpy as np
from PIL import Image

def composite_label(bottle_path, label_path, out_path, box, corner_radius=10):
    # Load bottle image
    bottle = Image.open(bottle_path).convert("RGBA")
    
    # Load label image
    label = Image.open(label_path).convert("RGBA")
    
    # Resize label to fit the width and height of the box
    x, y, w, h = box
    label = label.resize((w, h), Image.LANCZOS)
    
    # Create mask for rounded corners
    mask = Image.new("L", (w, h), 0)
    from PIL import ImageDraw
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, w, h), corner_radius, fill=255)
    
    # Apply mask to label
    label.putalpha(mask)
    
    # Paste label onto bottle
    bottle.paste(label, (x, y), label)
    
    # Save result
    bottle.convert("RGB").save(out_path, quality=95)

# Bounding boxes need to be exact to cover the garbled text.
# The bottle composite image is 1024x1024.
# We will need to guess the box. Let's start with a generic box for My Way.
# Let's save a test image first to see if the box is correct.
if __name__ == "__main__":
    # My Way (Assuming the bottle is centered and the label is around 400x500 in the center)
    composite_label("images/my_way_bottle_composite.png", "images/MY WAY LABEL HD.jpeg", "images/test_my_way.png", (312, 450, 400, 500))
