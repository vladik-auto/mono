import os

def label_images(directory):
    for filename in os.listdir(directory):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            # Determine the label based on the filename
            if filename.startswith("поехали на дачу"):
                label = 1
            else:
                label = 0

            # Write the label to a text file
            label_file_path = os.path.join(directory, f"{os.path.splitext(filename)[0]}.txt")
            with open(label_file_path, 'w') as label_file:
                label_file.write(str(label))

def main():
    frames_dir = "/home/robot/yolov7/frames"  # Update this to your actual frames directory
    label_images(frames_dir)

if __name__ == "__main__":
    main()
