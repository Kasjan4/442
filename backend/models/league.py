from app import db
from models.base import BaseModel

from models.team import Team


class League(db.Model, BaseModel):

  __tablename__ = 'leagues'

  name = db.Column(db.String(100), nullable=False, unique=True)
  year = db.Column(db.Integer(), nullable=True)
  country = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(10000), nullable=True)
  website = db.Column(db.String(200), nullable=True)
  image = db.Column(db.String(200), nullable=True)
  badge = db.Column(db.String(200), nullable=True)
  lon = db.Column(db.Integer(), nullable=False)
  lat = db.Column(db.Integer(), nullable=False)
  teams = db.relationship('Team', backref='league')


  # notes = db.relationship('Note', secondary=hotels_notes_join, backref='hotels')

  # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # user = db.relationship('User', backref='hotels')