from flask import Blueprint, request, g

from models.news import News
from serializers.news import NewsSchema

from middleware.secure_route import secure_route
from marshmallow import ValidationError


news_schema = NewsSchema()

router = Blueprint(__name__, 'news')

@router.route('/news', methods=['GET'])
def index_news():

  articles = News.query.all()

  return news_schema.jsonify(articles, many=True), 200



