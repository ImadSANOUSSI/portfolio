"""
Configuration file for Automatic Flower Classification project
"""

# Model Configuration
MODEL_CONFIG = {
    'input_shape': (224, 224, 3),
    'num_classes': 5,  # Adjust based on your dataset
    'learning_rate': 0.001,
    'batch_size': 32,
    'epochs': 100,
    'validation_split': 0.2
}

# CNN Architecture
CNN_CONFIG = {
    'filters': [32, 64, 128, 256],
    'kernel_size': (3, 3),
    'pool_size': (2, 2),
    'dropout_rate': 0.5,
    'dense_units': [512, 256]
}

# FAISS Configuration
FAISS_CONFIG = {
    'index_type': 'IVF100,Flat',  # IVF100 with Flat quantizer
    'nlist': 100,  # Number of clusters
    'nprobe': 10,  # Number of clusters to visit during search
    'dimension': 512  # Embedding dimension
}

# LLaMA Configuration
LLAMA_CONFIG = {
    'model_name': 'llama2:7b',  # Default Ollama model
    'temperature': 0.7,
    'max_tokens': 200,
    'top_p': 0.9
}

# Data Augmentation
AUGMENTATION_CONFIG = {
    'rotation_range': 20,
    'width_shift_range': 0.2,
    'height_shift_range': 0.2,
    'horizontal_flip': True,
    'zoom_range': 0.2,
    'fill_mode': 'nearest'
}

# File Paths
PATHS = {
    'models_dir': 'models/',
    'data_dir': 'data/',
    'logs_dir': 'logs/',
    'results_dir': 'results/'
}

# Supported Flower Classes (example)
FLOWER_CLASSES = [
    'daisy',
    'dandelion', 
    'rose',
    'sunflower',
    'tulip'
]

# API Configuration
API_CONFIG = {
    'host': '0.0.0.0',
    'port': 8000,
    'debug': True
}

# Logging Configuration
LOGGING_CONFIG = {
    'level': 'INFO',
    'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    'file': 'flower_classification.log'
}
