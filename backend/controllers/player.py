from flask import Blueprint, request, g

import requests

from middleware.secure_route import secure_route
from marshmallow import ValidationError
router = Blueprint(__name__, 'player')


@router.route('/player/<string:name>', methods=['GET'])
def get_single_player(name):

  player = requests.get(f'https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p={name}')

  if player.status_code != 200 :
    return {'message': 'Refine your search'}
  player = player.json().get('player')
  if not player:
    return {'message': 'Refine your search'}
  player = player[0]
  if not player:
    return {'message': 'Refine your search'}
  player_json = dict(
    player_name=player['strPlayer'],
    team_name=player['strTeam'],
    team_id=player['idTeam'],
    description=player['strDescriptionEN'],
    date_of_birth=player['dateBorn'],
    nationality=player['strNationality'],
    instagram=player['strInstagram'],
    image=player['strCutout']
  )

  return player_json, 200