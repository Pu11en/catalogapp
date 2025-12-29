import os
import shutil

base_dir = r"c:\Users\drewp\Downloads\flavorflow\public\products"
other_dir = os.path.join(base_dir, "other")
lalahs_dir = os.path.join(base_dir, "lalahs")

if not os.path.exists(lalahs_dir):
    os.makedirs(lalahs_dir)

if os.path.exists(other_dir):
    print(f"Checking {other_dir} for images...")
    files = [f for f in os.listdir(other_dir) if f.endswith('.png')]
    
    for file in files:
        src = os.path.join(other_dir, file)
        # file is like 'item-1.png'
        # we want 'lalahs-item-1.png'
        
        # Check if it already has lalahs prefix (idempotency)
        if file.startswith("lalahs-"):
            new_name = file
        else:
            new_name = f"lalahs-{file}"
            
        dst = os.path.join(lalahs_dir, new_name)
        
        try:
            shutil.move(src, dst)
            print(f"Moved {file} to {dst}")
        except Exception as e:
            print(f"Error moving {file}: {e}")
            
    # Remove empty other dir
    if not os.listdir(other_dir):
        os.rmdir(other_dir)
        print("Removed empty 'other' directory.")

print("Reorganization of Lalah's items complete.")
