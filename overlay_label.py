from PIL import Image

def overlay_label():
    try:
        # Load the base image
        base_img = Image.open('images/premium_diffuser_and_oil.png').convert('RGBA')
        
        # Load the label image
        label_img = Image.open('images/ESCAPADE LABEL HD.jpeg').convert('RGBA')
        
        # We don't know exactly where the bottle is in the AI image,
        # but let's assume it's in the center-left or center.
        # Since it's a 1024x1024 image, a typical bottle might be 200-300px wide.
        # But wait, doing it blindly with Python is dangerous because if the bottle
        # is on the right, the label will float in mid-air.
        pass
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    overlay_label()
