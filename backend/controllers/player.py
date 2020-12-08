from flask import Blueprint, request, g

import requests

from middleware.secure_route import secure_route
from marshmallow import ValidationError
router = Blueprint(__name__, 'player')


@router.route('/player/<string:name>', methods=['GET'])
def get_single_player(name):

  player = requests.get(f'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p={name}')

  if player.status_code != 200 :
    return {'message': 'Player not available'}, 404
  player = player.json().get('player')
  if not player:
    return {'message': 'Player not available'}, 404
  player = player[0]
  if not player:
    return {'message': 'Player not available'}, 404
  player_json = dict(
    name=name,
    team_name=player['strTeam'],
    team_id=player['idTeam'],
    description=player['strDescriptionEN'],
    date_of_birth=player['dateBorn'],
    nationality=player['strNationality'],
    instagram=player['strInstagram'],
    image=player['strCutout']
  )

  return player_json, 200