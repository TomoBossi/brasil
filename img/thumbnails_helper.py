import os
from PIL import Image

input_folder = "./img"
output_folder = "./img/thumbnails"

def resize_image(image, column_width = 300):
    width, height = image.size
    new_width = column_width*2
    new_height = int(new_width * height / width)
    return image.resize((new_width, new_height), Image.LANCZOS)

for file_name in os.listdir(input_folder):
    if file_name.lower().endswith(".png"):
        output_file_name = f"{os.path.splitext(file_name)[0]}.jpg"
        if output_file_name not in os.listdir(output_folder):
            file_path = os.path.join(input_folder, file_name)
            pil_image = Image.open(file_path).convert('RGB')
            resized_image = resize_image(pil_image)
            output_file_path = os.path.join(output_folder, output_file_name)
            resized_image.save(output_file_path, "JPEG", quality=80)
