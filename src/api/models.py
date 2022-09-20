from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

takingActivity = db.Table("takingActivity",
     db.Column("user_id", db.Integer, db.ForeignKey("user.id")),
     db.Column("activities_id", db.Integer, db.ForeignKey("activities.id"))
)

class User(db.Model):
     __tablename__ = "user"
     id = db.Column(db.Integer, primary_key=True)
     username = db.Column(db.String(120), unique=True, nullable=False)
     name = db.Column(db.String(120), nullable=False)
     lastname = db.Column(db.String(120), nullable=False)
     age = db.Column(db.String(120), nullable=True)
     gender= db.Column(db.String(120), nullable=True)
     email = db.Column(db.String(120), unique=True, nullable=False)
     password = db.Column(db.String(250), nullable=False)
     mobile= db.Column(db.Integer, unique=True, nullable=True)
     address = db.Column(db.String(80), nullable=True)
     activities = db.relationship("Activities", secondary=takingActivity, back_populates="users")
     postedactivities = db.relationship('Activities', backref='user', lazy=True)
     def __repr__(self):
          return '<User {self.email}>'
    
     def serialize(self):
          return {
               "id": self.id,
               "username": self.username,
               "name": self.name,
               "lastname": self.lastname,
               "age": self.age,
               "gender": self.gender,
               "email": self.email,
               "password": self.password,
               "mobile": self.mobile,
               "address": self.address,
              
         }

     def obtain_activities(self):
          return list(map(lambda x: x.serialize(), self.activities))

class Activities(db.Model):
     __tablename__ = "activities"
     id = db.Column(db.Integer, primary_key=True)
     description = db.Column(db.String(120), nullable=True)
     name= db.Column(db.String(120), nullable=False)
     category=db.Column(db.String(120), nullable=False)
     date= db.Column(db.String(120), nullable=False)
     time=db.Column(db.String(120), nullable=False)
     city = db.Column(db.String(120), nullable=False)
     location = db.Column(db.String(120), nullable=False)
     players = db.Column(db.Integer, nullable=False)
     latitude = db.Column(db.String(120), nullable=True)
     longitude = db.Column(db.String(120), nullable=True)
     users = db.relationship("User", secondary=takingActivity, back_populates="activities")
     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

     def __repr__(self):
          return '<Activities {self.name}>'
     def serialize(self):
          return {
               "id": self.id,
               "description": self.description,
               "name": self.name,
               "category": self.category,
               "date": self.date,
               "time": self.time,
               "city": self.city,
               "location": self.location,
               "players": self.players,
               "latitude": self.latitude,
               "longitude": self.longitude,
               "user_id": self.user_id,
               "users": self.obtain_users(),
           
         }

     def obtain_users(self):
          return list(map(lambda x: x.serialize(), self.users))

