from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.league import League

class LeagueSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:

    model = League
    load_instance = True


  # user_id = fields.Integer()

  # user = fields.Nested('UserSchema', only=('id', 'username'))
  