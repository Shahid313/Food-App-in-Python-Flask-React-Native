from application import app, db, ma
import datetime

class Foods(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    foodName = db.Column(db.String(100))
    foodPrice = db.Column(db.String(100))
    foodQuantity = db.Column(db.String(100))
    foodDescription = db.Column(db.Text())
    foodImage = db.Column(db.Text,nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now)
    favFood = db.relationship('FavFoods',backref='foods',lazy='dynamic')

    def __init__(self, foodName, foodPrice, foodQuantity, foodDescription, foodImage):
        self.foodName = foodName
        self.foodPrice = foodPrice
        self.foodQuantity = foodQuantity
        self.foodDescription = foodDescription
        self.foodImage = foodImage

class FoodSchema(ma.Schema):
    class Meta:
        fields = ('id', 'foodName', 'foodPrice', 'foodQuantity', 'foodDescription','foodImage', 'date')

food_schema = FoodSchema()
foods_schema = FoodSchema(many=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(100))
    favFood = db.relationship('FavFoods',backref='user',lazy='dynamic')

    def __init__(self,name,email,password):
        self.name = name
        self.email = email
        self.password = password

class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'email', 'password')

user_schema = UserSchema()
users_schema = UserSchema(many=True)


class Orders(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    foodName = db.Column(db.String(100))
    foodQuantity = db.Column(db.String(100))
    foodPrice = db.Column(db.String(100))
    name = db.Column(db.String(100))

    def __init__(self,foodName,foodQuantity,foodPrice,name):
        self.foodName = foodName
        self.foodQuantity = foodQuantity
        self.foodPrice = foodPrice
        self.name = name

class OrderSchema(ma.Schema):
    class Meta:
        fields = ('id', 'foodName', 'foodQuantity', 'foodPrice', 'name')

order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

class FavFoods(db.Model):
    fav_food_id = db.Column(db.Integer, primary_key=True)
    foodName = db.Column(db.String(100))
    foodImage = db.Column(db.Text,nullable=False)
    food_id = db.Column(db.Integer,db.ForeignKey('foods.id'))
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))

    def __init__(self, foodName, foodImage, food_id, user_id):
        self.foodName = foodName
        self.foodImage = foodImage
        self.food_id = food_id
        self.user_id = user_id

class FavFoodsSchema(ma.Schema):
    class Meta:
        fields = ('fav_food_id', 'foodName', 'foodImage', 'user_id')

fav_food_schema = FavFoodsSchema()
fav_foods_schema = FavFoodsSchema(many=True)
