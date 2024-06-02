import os
import shutil
from pathlib import Path
import random

# Определите пути к исходным и целевым данным
source_dirs = {
    "trainbad": "/home/robot/MlSoft/yolov7/trainbad",
    "train": "/home/robot/MlSoft/yolov7/train"
}
target_root = "/home/robot/MlSoft/yolov7/data"
target_dirs = {
    "train": os.path.join(target_root, "train"),
    "val": os.path.join(target_root, "val"),
    "test": os.path.join(target_root, "test")
}
split_ratios = (0.7, 0.2, 0.1)  # Соотношение для train, val, test

def create_dirs():
    for split in target_dirs.values():
        for class_name in source_dirs.keys():
            os.makedirs(os.path.join(split, class_name), exist_ok=True)

def split_data():
    for class_name, source_dir in source_dirs.items():
        all_files = list(Path(source_dir).glob('*'))
        random.shuffle(all_files)

        train_split = int(len(all_files) * split_ratios[0])
        val_split = train_split + int(len(all_files) * split_ratios[1])

        train_files = all_files[:train_split]
        val_files = all_files[train_split:val_split]
        test_files = all_files[val_split:]

        move_files(train_files, class_name, target_dirs["train"])
        move_files(val_files, class_name, target_dirs["val"])
        move_files(test_files, class_name, target_dirs["test"])

def move_files(files, class_name, target_dir):
    for file in files:
        target_path = os.path.join(target_dir, class_name, file.name)
        print(f"Copying {file} to {target_path}")
        shutil.copy(file, target_path)

if __name__ == "__main__":
    create_dirs()
    split_data()
    print("Data preparation complete.")

