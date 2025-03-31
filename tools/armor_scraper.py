# File: tools/armor_scraper.py

import requests
from bs4 import BeautifulSoup
import json
import os

BASE_URL = "https://monsterhunterwilds.wiki.fextralife.com/Armor+Sets"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'armor_data.json')

def fetch_html(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers, timeout=15)
    response.raise_for_status()
    return response.text

def parse_armor_table(html):
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table')
    armor_data = []

    if not table:
        print("No table found on page.")
        return armor_data

    rows = table.find_all('tr')[1:]  # skip header

    for row in rows:
        cols = row.find_all('td')
        if len(cols) < 5:
            continue

        name = cols[0].get_text(strip=True)
        slot = cols[1].get_text(strip=True).lower()
        defense = int(cols[2].get_text(strip=True).split('-')[0])  # take min def
        skills = [(s.strip(), 1) for s in cols[3].get_text(strip=True).split(',') if s]
        slots = [int(s) for s in cols[4].get_text(strip=True).split('/') if s.isdigit()]
        monster = cols[5].get_text(strip=True) if len(cols) > 5 else "Unknown"

        armor_data.append({
            "name": name,
            "slot": slot,
            "skills": skills,
            "slots": slots,
            "defense": defense,
            "monsters": [monster]
        })

    return armor_data

def save_armor_data(data):
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"✅ Saved {len(data)} armor pieces to {OUTPUT_PATH}")

def main():
    print("Fetching armor data from Fextralife...")
    try:
        html = fetch_html(BASE_URL)
        armor_data = parse_armor_table(html)
        save_armor_data(armor_data)
    except Exception as e:
        print("❌ Error:", e)

if __name__ == '__main__':
    main()