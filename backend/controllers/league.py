from flask import Blueprint, request, g

from models.league import League
from serializers.league import LeagueSchema

from middleware.secure_route import secure_route
from marshmallow import ValidationError



league_schema = LeagueSchema()


router = Blueprint(__name__, 'league')


@router.route('/leagues', methods=['GET'])
def index():

  leagues = League.query.all()

  return league_schema.jsonify(leagues, many=True), 200


@router.route('/league/<int:id>', methods=['GET'])
def get_single_league(id):

  league = League.query.get(id)
  print(league)
  print(id)

  if not league:
    return {'message': 'League not available'}, 404

  return league_schema.jsonify(league), 200


# @router.route('/hotels/notes', methods=['GET'])
# def get_notes():

#   notes = Note.query.all()

#   return populate_note.jsonify(notes, many=True), 200


# @router.route('/league/<int:id>', methods=['GET'])
# def get_single_league(id):
#   hotel = Hotels.query.get(id)

#   if not hotel:
#     return { 'message': 'Hotel not available' }, 404

#   return hotels_schema.jsonify(hotel), 200


# @router.route('/hotels', methods=['POST'])
# @secure_route
# def create():
#   hotel_dictionary = request.get_json()
#   print(type(hotel_dictionary))
#   hotel_dictionary['user_id'] = g.current_user.id

#   try:
#     hotel = hotels_schema.load(hotel_dictionary)

#   except ValidationError as e:
#     return { 'errors': e.messages, 'message': 'Could not add hotel' }


#   hotel.save()

#   return hotels_schema.jsonify(hotel), 200


# @router.route('/hotels/<int:id>', methods=['PUT'])
# @secure_route
# def update_hotel(id):

#   existing_hotel = Hotels.query.get(id)

#   try:
#     hotel = hotels_schema.load(
#       request.get_json(),

#       instance=existing_hotel,

#       partial=True
#     )

    # except ValidationError as e:
    #   return { 'errors': e.messages, 'message': 'Could not update hotel' }

    # if hotel.user != g.current_user:
    #   return { 'message': 'Unauthorized' }, 401

    # hotel.save()

    # return hotels_schema.jsonify(hotel), 201


# @router.route('/hotels/<int:id>', methods=['DELETE'])
# @secure_route
# def remove(id):

#   hotel = Hotels.query.get(id)

#   hotel.remove()
#   return { 'message': f'Hotel {id}--deleted successfully' }


# @router.route('/hotels/<int:hotel_id>/comments', methods=['POST'])
# @secure_route
# def comment_create(hotel_id):

#   comment_data = request.get_json()

#   hotel = Hotels.query.get(hotel_id)

#   comment = comment_schema.load(comment_data)

#   comment.hotel = hotel
#   comment.save()

#   return comment_schema.jsonify(comment)


# @router.route('hotels/<int:hotel_id>/comments/<int:comment_id>', methods=['DELETE'])
# def comment_delete(hotel_id, comment_id):

#   hotel = Hotels.query.get(hotel_id)

#   comment = hotel['comments'].query.get(comment_id)

#   print(comment)

#   # comment.remove()

#   return { 'message': f'Comment {comment_id}--deleted successfully' }
