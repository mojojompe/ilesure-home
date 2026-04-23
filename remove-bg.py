from PIL import Image
import os
import glob

folder = "public/illustrations"
for file in glob.glob(os.path.join(folder, "*.png")):
    try:
        img = Image.open(file).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Change pixels that are highly white to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        img.save(file, "PNG")
        print(f"Processed {file}")
    except Exception as e:
        print(f"Failed {file}: {e}")
