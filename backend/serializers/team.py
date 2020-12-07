from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.team import Team

class TeamSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:

    model = Team
    load_instance = True
