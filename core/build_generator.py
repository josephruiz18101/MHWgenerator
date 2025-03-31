# File: core/build_generator.py

from core.data_loader import load_armor_data, load_skills_data
from itertools import product, combinations
from collections import defaultdict

def generate_best_build(weapon_type, goal, status_type=None):
    armor_data = load_armor_data()
    skills_data = load_skills_data()

    # Group armor by slot
    grouped = defaultdict(list)
    for piece in armor_data:
        grouped[piece['slot']].append(piece)

    # All possible 5-piece sets (head, chest, arms, waist, legs)
    builds = product(
        grouped['head'],
        grouped['chest'],
        grouped.get('arms', []),
        grouped.get('waist', []),
        grouped.get('legs', [])
    )

    best_score = -1
    best_build = None

    for build in builds:
        total_skills = defaultdict(int)
        defense_total = 0
        monsters = set()

        for piece in build:
            for skill_name, level in piece['skills']:
                total_skills[skill_name] += level
            defense_total += piece['defense']
            monsters.update(piece['monsters'])

        score = score_build(total_skills, skills_data, goal)

        if score > best_score:
            best_score = score
            best_build = {
                'armor': {p['slot']: p for p in build},
                'skills': dict(total_skills),
                'defense': defense_total,
                'monsters': sorted(monsters),
                'affinity': calculate_affinity_bonus(total_skills, skills_data)
            }

    return best_build

def score_build(skills, skills_data, goal):
    score = 0
    if goal == 'dps':
        score += skills.get('Critical Boost', 0) * 10
        score += skills.get('Weakness Exploit', 0) * 7
        score += skills.get('Attack Boost', 0) * 5
    elif goal == 'affinity':
        score += skills.get('Critical Eye', 0) * 6
        score += skills.get('Weakness Exploit', 0) * 5
    elif goal == 'status':
        score += skills.get('Status Attack Boost', 0) * 6
        score += skills.get('Attack Boost', 0) * 3
    elif goal == 'element':
        score += skills.get('Element Attack Boost', 0) * 6
        score += skills.get('Critical Element', 0) * 4
    return score

def calculate_affinity_bonus(skills, skills_data):
    affinity = 0
    if 'Critical Eye' in skills:
        affinity += skills["Critical Eye"] * skills_data['Critical Eye']['affinity_bonus_per_level']
    if 'Weakness Exploit' in skills:
        affinity += skills['Weakness Exploit'] * 10  # assume simplified flat bonus
    return f"+{affinity}%"