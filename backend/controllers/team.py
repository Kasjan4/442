from flask import Blueprint, request, g

from models.team import Team
from serializers.team import TeamSchema

from middleware.secure_route import secure_route
from marshmallow import ValidationError


team_schema = TeamSchema()

router = Blueprint(__name__, 'team')

@router.route('/teams', methods=['GET'])
def index():

  teams = Team.query.all()

  return team_schema.jsonify(teams, many=True), 200


@router.route('/team/<int:id>', methods=['GET'])
def get_single_team(id):

  team = Team.query.get(id)

  if not team:
    return {'message': 'Team not available'}, 404

  return team_schema.jsonify(team), 200
