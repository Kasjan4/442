from app import ma
from serializers.base import BaseSchema
from marshmallow import fields
from models.news import News

class NewsSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

  class Meta:

    model = News
    load_instance = True
