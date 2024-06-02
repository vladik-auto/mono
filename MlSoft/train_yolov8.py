from ultralytics import YOLO

# Загрузка предобученной модели
model = YOLO('yolov8n-cls.pt')

# Обучение модели
results = model.train(data='/home/robot/MlSoft/yolov7/data', epochs=25, imgsz=224, batch=8)

# Сохранение обученной модели
model.save('yolov8n-cls-trained.pt')
