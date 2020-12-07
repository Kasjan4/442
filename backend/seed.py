
from app import app, db

from models.user import User
from models.team import Team
from models.league import League


import requests


with app.app_context():

    db.drop_all()

    db.create_all()


    league_list = requests.get('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php').json()
    league_object_list =[]
    existing_team_ids = set()
    for league in league_list['leagues']:
      if league['strSport'] == 'Soccer':
        league_details = requests.get(f'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id={league["idLeague"]}').json()
        league_details = league_details ['leagues'][0]

        country_latlng = requests.get(f'https://api.opencagedata.com/geocode/v1/json?q={league_details["strCountry"]}&key=ab82c77042d74ae6aae0bb67ff494887').json()
        country_latlng = country_latlng['results'][0]['bounds']

        league_object = League(
        id = league_details['idLeague'],
        name=league_details['strLeague'],
        year=league_details['intFormedYear'],
        country=league_details['strCountry'],
        description=league_details['strDescriptionEN'],
        website=league_details['strWebsite'],
        image=league_details['strLogo'],
        badge=league_details['strBadge'],
        lon= (float(country_latlng['northeast']['lng']) + float(country_latlng['southwest']['lng']))/2,
        lat= (float(country_latlng['northeast']['lat']) + float(country_latlng['southwest']['lat']))/2
        )
        league_object_list.append(league_object)
        team_list = requests.get(f'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id={league["idLeague"]}').json()
        if not team_list['teams']:
          continue
        for team in team_list['teams']:
          if team['idTeam'] not in existing_team_ids and team['strSport'] == 'Soccer':
            team_details = team
            existing_team_ids.add(team['idTeam'])
            team_object = Team(
            id =team_details['idTeam'],
            name=team_details['strTeam'],
            year=team_details['intFormedYear'],
            country=team_details['strCountry'],
            description=team_details['strDescriptionEN'],
            website=team_details['strWebsite'],
            image=team_details['strTeamBadge'],
            stadium=team_details['strStadium'],
            league_id=league['idLeague']
            )
            league_object_list.append(team_object)
        

    print('Leagues created')
    print('Adding to database:')

    admin = User(
        username="admin",
        email="admin@admin.com",
        password="admin",
        team="133616",
        league="4332"
    )
    db.session.add_all(league_object_list + [admin])
    db.session.commit()


    print('Completed!')
