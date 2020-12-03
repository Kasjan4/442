
from app import app, db

from models.league import League
from models.user import User
import requests


with app.app_context():

    db.drop_all()

    db.create_all()

    admin = User(
        username="admin",
        email="admin@admin.com",
        password="admin"
    )
    admin.save()

    league_list = requests.get('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php').json()
    league_object_list =[]
    for league in league_list['leagues']:
      if league['strSport'] == 'Soccer':
        league_details = requests.get(f'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id={league["idLeague"]}')
        league_details = league_details['leagues'][0]
        country_latlng = requests.get(f'https://api.opencagedata.com/geocode/v1/json?key=f6caef04acfb4220a1785e5ac233d11d&q={league["strCountry"]}&pretty=1&no_annotations=1').json
        country_latlng = country_latlng['results'][0]['bounds']

        league_object = League(
        id = league_details['idLeague'],
        name=league_details['strLeague'],
        year=league_details['intFormedYear'],
        description=league_details['strDescriptionEN'],
        website=league_details['strWebsite'],
        image=league_details['strLogo'],
        lon= (float(country_latlng['northeast']['lng']) + float(country_latlng['southwest']['lng']))/2,
        lat= (float(country_latlng['northeast']['lat']) + float(country_latlng['southwest']['lat']))/2
        )
        league_object_list.append(league_object)
        

    print('Leagues created')
    print('Adding to database:')


    db.session.add_all(league_object_list)
    db.session.commit()

    print('Completed!')
