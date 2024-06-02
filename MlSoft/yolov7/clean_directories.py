import os
import shutil

def clean_directory(directory):
    if os.path.exists(directory):
        shutil.rmtree(directory)
    os.makedirs(directory)

def main():
    base_dir = "/home/robot/yolov7/dataset"
    train_dir = os.path.join(base_dir, "images/train")
    val_dir = os.path.join(base_dir, "images/val")
    
    # Clean train and val directories
    clean_directory(train_dir)
    clean_directory(val_dir)
    
    print("Cleaned train and val directories.")

if __name__ == "__main__":
    main()
