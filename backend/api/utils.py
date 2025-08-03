import os
from django.conf import settings

def get_medial_file_path(filename, folder='plots'):
    save_dir = os.path.join(settings.MEDIA_ROOT, folder)
    os.makedirs(save_dir, exist_ok=True)
    return os.path.join(save_dir, filename)
