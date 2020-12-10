from app import db
from models.base import BaseModel
# from models.hotel_note import hotels_notes_join
# from models.user import User
# from models.team import Team
# from models.note import Note

class News(db.Model, BaseModel):

  __tablename__ = 'news'

  title = db.Column(db.String(300), nullable=False)
  image = db.Column(db.String(500), nullable=True)
  url = db.Column(db.String(500), nullable=False)


  # notes = db.relationship('Note', secondary=hotels_notes_join, backref='hotels')

  # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # user = db.relationship('User', backref='hotels')