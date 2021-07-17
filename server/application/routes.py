from flask import Flask, jsonify, request
from application import db
from application.utils import save_file
from application import app
from application.models import *
from werkzeug.security import generate_password_hash,check_password_hash

@app.route("/get", methods=['GET'])
def get_food():
    all_foods = Foods.query.all()
    results = foods_schema.dump(all_foods)
    return jsonify(results)

@app.route('/add', methods = ['POST'])
def add_food():
    foodName = request.form.get('FoodName')
    foodQuantity = request.form.get('FoodQuantity')
    foodDescription = request.form.get('FoodDescription')
    foodPrice = request.form.get('FoodPrice')
    foodImage = request.files.get('FoodImage')
    isSaved, file_name = save_file(foodImage, 'images')
    foods = Foods(foodName, foodQuantity, foodDescription, foodPrice, file_name)
    db.session.add(foods)
    db.session.commit()
    return food_schema.jsonify({'foods':foods})

@app.route('/delete/<id>', methods=['DELETE'])
def delete_food(id):
    food = Foods.query.get(id)
    db.session.delete(food)
    db.session.commit()
    return food_schema.jsonify(food)

@app.route("/update/<id>", methods=['PUT'])
def update_food(id):
    food = Foods.query.get(id)
    foodName = request.form.get('FoodName')
    foodQuantity = request.form.get('FoodQuantity')
    foodDescription = request.form.get('FoodDescription')
    foodPrice = request.form.get('FoodPrice')
    newFoodImage = request.files.get('newFoodImage')
    isSaved, file_name = save_file(newFoodImage, 'images')

    food.foodName = foodName
    food.foodQuantity = foodQuantity
    food.foodDescription = foodDescription
    food.foodPrice = foodPrice
    food.foodImage = file_name

    db.session.commit()
    return food_schema.jsonify(food)

@app.route("/food_details", methods=['GET'])
def get_food_details():
    food_id = request.args.get('id')

    food = Foods.query.get(food_id)
    results = food_schema.dump(food)
    return jsonify(results)

@app.route("/signup", methods=['POST'])
def signup():
    name = request.form.get('name')
    email = request.form.get('email')
    password = request.form.get('password')
    hashed_password = generate_password_hash(password, method='sha256')
    users = User(name,email,hashed_password)
    db.session.add(users)
    db.session.commit()
    return user_schema.jsonify({'users':users})

@app.route("/signin", methods=['POST'])
def signin():
    name = request.form.get('name')
    password = request.form.get('password')
    user = User.query.filter_by(name=name).first()
    if user and check_password_hash(user.password, password):
        users = user_schema.dump(user)
        return jsonify({'loggedIn':True, 'user':users})
    else:
        return jsonify({'loggedIn':True})


@app.route('/orders', methods = ['POST'])
def orders():
    foodName = request.form.get('foodName')
    foodQuantity = request.form.get('foodQuantity')
    foodPrice = request.form.get('foodPrice')
    name = request.form.get('name')
    order = Orders(foodName, foodQuantity, foodPrice, name)
    db.session.add(order)
    db.session.commit()
    return order_schema.jsonify({'order':order})

@app.route("/get_orders", methods=['GET'])
def get_orders():
    order = Orders.query.all()
    results = orders_schema.dump(order)
    return jsonify(results)

@app.route("/add_fav", methods=['POST'])
def add_fav():
    user_id = request.form.get('userId')
    food_id = request.form.get('foodId')
    food = Foods.query.get(food_id)
    foodName = food.foodName
    foodImage = food.foodImage
    fav_food = FavFoods(foodName,foodImage,food_id,user_id)
    db.session.add(fav_food)
    db.session.commit()
    return fav_food_schema.jsonify({'fav_food':fav_food})

@app.route("/delete_fav/<id>/<user_id>", methods=['DELETE'])
def delete_fav(id, user_id):
    print("food id: ",id)

    delete_food = FavFoods.query.filter_by(food_id=id, user_id=user_id)
    if not delete_food.count() > 0:
        print('not found')
        return 'not found'
    
    delete_food = delete_food.all()
    isDeleted = False
    for food in delete_food:
        print('food id: ',food.food_id)
        try:
            db.session.delete(food)
            db.session.commit()
            isDeleted = True
        except Exception as e:
            print(str(e))
            isDeleted = False
            return fav_food_schema.jsonify(delete_food)
    
    if isDeleted:
        return fav_food_schema.jsonify(delete_food)
    else:
        pass

@app.route("/get_fav/<id>", methods=['GET'])
def get_fav(id):
    fav_foods = FavFoods.query.filter_by(user_id=id)
    results = fav_foods_schema.dump(fav_foods)
    return jsonify(results)

@app.route("/red_star/<id>", methods=['GET'])
def red_star(id):
    favFood = FavFoods.query.filter_by(food_id=id).first()
    if favFood:
        food = fav_food_schema.dump(favFood)
        return jsonify({'red': True, 'food':food})
    else:
        return jsonify({'red': False})

