import os

data_dir = "/home/robot/yolov7/dataset/images"
categories = ['train', 'val']

for category in categories:
    for class_name in ['train', 'trainbad']:
        path = os.path.join(data_dir, category, class_name)
        if not os.path.exists(path):
            print(f"Directory {path} does not exist.")
        else:
            files = os.listdir(path)
            if len(files) == 0:
                print(f"No files found in directory {path}.")
            else:
                print(f"Found {len(files)} files in directory {path}.")
