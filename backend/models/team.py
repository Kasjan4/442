from app import db
from models.base import BaseModel
from models.user import User
# from models.note import Note

class Team(db.Model, BaseModel):

  __tablename__ = 'teams'

  name = db.Column(db.String(100), nullable=False, unique=True)
  year = db.Column(db.Integer(), nullable=True)
  country = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(100000), nullable=True)
  website = db.Column(db.String(200), nullable=True)
  image = db.Column(db.String(200), nullable=True)
  stadium = db.Column(db.String(100), nullable=True)
  league_id = db.Column(db.Integer(), db.ForeignKey('leagues.id'))
  banner = db.Column(db.String(300), nullable=True)
  # fans = db.relationship('User', backref='favourite_team')
 


  # notes = db.relationship('Note', secondary=hotels_notes_join, backref='hotels')

  # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # user = db.relationship('User', backref='hotels')