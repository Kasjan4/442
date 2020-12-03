from app import db
from models.base import BaseModel
# from models.hotel_note import hotels_notes_join
# from models.user import User
# from models.note import Note

class League(db.Model, BaseModel):

  __tablename__ = 'leagues'

  name = db.Column(db.String(40), nullable=False, unique=True)
  year = db.Column(db.Integer(), nullable=False)
  country = db.Column(db.String(40), nullable=False)
  description = db.Column(db.String(3000), nullable=False)
  website = db.Column(db.String(200), nullable=False)
  image = db.Column(db.String(200), nullable=False)
  lon = db.Column(db.Integer(), nullable=False)
  lat = db.Column(db.Integer(), nullable=False)


  # notes = db.relationship('Note', secondary=hotels_notes_join, backref='hotels')

  # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # user = db.relationship('User', backref='hotels')