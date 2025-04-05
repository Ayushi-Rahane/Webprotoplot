from flask import Flask, render_template, request, jsonify
from datetime import datetime
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB URI
db = client['impact_tree_db']
users = db['users']
# Initialize a single user (for demo)
def init_user():
    if users.count_documents({}) == 0:
        users.insert_one({
            "username": "demo_user",
            "points": 0,
            "water": 0,
            "stage": 0,
            "last_watered": None,
            "tree_planted": False
        })

init_user()

@app.route('/')
def home():
    return render_template('index.html')


# Game route → game.html
@app.route('/game')
def game():
    return render_template('game.html')

# Game APIs
@app.route('/get_game_data')
def get_game_data():
    user = users.find_one({"username": "demo_user"})
    return jsonify({
        'points': user['points'],
        'water': user['water'],
        'stage': user['stage'],
        'tree_planted': user['tree_planted']
    })
@app.route('/add_points', methods=['POST'])
def add_points():
    users.update_one({"username": "demo_user"}, {"$inc": {"points": 10}})
    return '', 204


@app.route('/buy_water', methods=['POST'])
def buy_water():
    user = users.find_one({"username": "demo_user"})
    if user['points'] >= 10:
        users.update_one(
            {"username": "demo_user"},
            {"$inc": {"points": -10, "water": 1}}
        )
        return '', 204
    else:
        return 'Not enough points', 400

@app.route('/water_plant', methods=['POST'])
def water_plant():
    user = users.find_one({"username": "demo_user"})
    if user['water'] >= 1 and user['stage'] < 5:
        new_stage = user['stage'] + 1
        users.update_one(
            {"username": "demo_user"},
            {
                "$inc": {"water": -1},
                "$set": {
                    "stage": new_stage,
                    "last_watered": datetime.utcnow(),
                    "tree_planted": True if new_stage == 5 else False
                }
            }
        )
        return '', 204
    else:
        return 'No water or already fully grown', 400
if __name__ == '__main__':
    app.run(debug=True)