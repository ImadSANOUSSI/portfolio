"""
Main script for Automatic Flower Classification
"""

import os
import sys
import logging
from pathlib import Path

# Add project root to path
project_root = Path(__file__).parent
sys.path.append(str(project_root))

from config import LOGGING_CONFIG, PATHS

# Setup logging
def setup_logging():
    """Configure logging for the project"""
    # Create logs directory if it doesn't exist
    Path(PATHS['logs_dir']).mkdir(exist_ok=True)
    
    # Configure logging
    logging.basicConfig(
        level=getattr(logging, LOGGING_CONFIG['level']),
        format=LOGGING_CONFIG['format'],
        handlers=[
            logging.FileHandler(PATHS['logs_dir'] + LOGGING_CONFIG['file']),
            logging.StreamHandler(sys.stdout)
        ]
    )
    
    return logging.getLogger(__name__)

def create_directories():
    """Create necessary directories for the project"""
    directories = [
        PATHS['models_dir'],
        PATHS['data_dir'],
        PATHS['logs_dir'],
        PATHS['results_dir']
    ]
    
    for directory in directories:
        Path(directory).mkdir(exist_ok=True)
        logger.info(f"Directory created/verified: {directory}")

def main():
    """Main function"""
    global logger
    logger = setup_logging()
    
    logger.info("Starting Automatic Flower Classification project")
    
    try:
        # Create necessary directories
        create_directories()
        
        # Import and run components
        logger.info("Project setup completed successfully")
        logger.info("Please run the Colab notebook for the full experience:")
        logger.info("https://colab.research.google.com/drive/1PuJZYmd4ug7sSw7iImXk8F7K3b1CQAt2")
        
    except Exception as e:
        logger.error(f"Error during project setup: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
