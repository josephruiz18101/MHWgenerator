# File: core/data_loader.py

import json
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_json(file_name):
    path = os.path.join(DATA_PATH, file_name)
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)

def load_armor_data():
    return load_json('armor_data.json')

def load_skills_data():
    return load_json('skills_data.json')

def load_weapons_data():
    return load_json('weapons_data.json')

def load_decorations_data():
    return load_json('decorations_data.json')
