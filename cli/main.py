# File: cli/main.py

from core.build_generator import generate_best_build

def run_cli():
    print("\n🎯 Monster Hunter Wilds Build Generator")
    print("-------------------------------------")

    weapon = input("Enter weapon type (e.g. Long Sword, Bow, Great Sword): ").strip()

    print("\nBuild Goals:")
    print("  1. Max DPS")
    print("  2. Max Affinity")
    print("  3. Max Elemental Damage")
    print("  4. Max Status Effects (Poison, Sleep, etc.)")
    goal_map = {
        '1': 'dps',
        '2': 'affinity',
        '3': 'element',
        '4': 'status'
    }
    goal_input = input("Choose a goal (1-4): ").strip()
    build_goal = goal_map.get(goal_input, 'dps')

    status_type = None
    if build_goal == 'status':
        status_type = input("Which status effect? (e.g. Poison, Sleep, Paralysis): ").strip()

    print("\nGenerating best build...")
    build = generate_best_build(weapon_type=weapon, goal=build_goal, status_type=status_type)

    print("\n✅ Best Build:")
    for slot, armor_piece in build['armor'].items():
        print(f"- {slot.title()}: {armor_piece['name']} ({', '.join([f'{s[0]} Lv{s[1]}' for s in armor_piece['skills']])})")

    print("\nSkills Summary:")
    for skill, level in build['skills'].items():
        print(f"  {skill}: Lv{level}")

    print("\nTotal Defense:", build['defense'])
    print("Affinity Bonus:", build.get('affinity', 'N/A'))
    print("Monsters Needed:", ", ".join(build['monsters']))
