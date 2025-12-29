import os
import json

base_dir = r"c:\Users\drewp\Downloads\catalog"
png_files = [f for f in os.listdir(base_dir) if f.lower().endswith('.png')]

print(f"Found {len(png_files)} PNG files.")

with open('png_list.json', 'w') as f:
    json.dump(png_files, f)

print("Saved to png_list.json")
