import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import os

# Загрузка модели
model = models.resnet18()
num_ftrs = model.fc.in_features
model.fc = nn.Linear(num_ftrs, 2)
model.load_state_dict(torch.load('model_weights.pth'))
model.eval()

# Преобразования изображения
preprocess = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]),
])

# Пути к тестовым данным
test_data_dir = '/home/robot/yolov7/data/test'
class_names = ['train', 'trainbad']

# Функция для предсказания класса изображения
def predict_image(image_path):
    img = Image.open(image_path)
    img_t = preprocess(img)
    batch_t = torch.unsqueeze(img_t, 0)

    with torch.no_grad():
        out = model(batch_t)
        _, indices = torch.max(out, 1)
        return class_names[indices[0]]

# Проход по всем тестовым данным и предсказания
for class_name in class_names:
    class_dir = os.path.join(test_data_dir, class_name)
    print(f"\nPredictions for class '{class_name}':")
    for img_name in os.listdir(class_dir):
        img_path = os.path.join(class_dir, img_name)
        predicted_class = predict_image(img_path)
        print(f"Image: {img_name} - Predicted class: {predicted_class}")
