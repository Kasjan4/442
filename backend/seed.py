
from app import app, db

from models.user import User
from models.team import Team
from models.league import League
from models.news import News
from tqdm import tqdm
import requests

with app.app_context():

    db.drop_all()

    db.create_all()

    news_articles = {
        "status": "ok",
        "totalResults": 10,
        "articles": [
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "Tottenham boss Jose Mourinho handed suspended one-match European competition ban",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/tottenham-boss-jose-mourinho-handed-suspended-one-match-european-competition-ban-1605289161000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/oNze89wG93jcV7GzGGeSnT-1200-80.jpg",
                "publishedAt": "2020-11-13T17:39:21Z",
                "content": "Tottenham head coach Jose Mourinho has been handed a suspended one-match European competition ban by UEFA.\r\nThe Portuguese was deemed to be responsible for the late kick-off of the Europa League matc… [+1019 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "Premier League scraps unpopular pay-per-view experiment",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/premier-league-scraps-unpopular-pay-per-view-experiment-1605289121000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/Bzv6TrQ29paN6PiDSUCJ9L-1200-80.jpg",
                "publishedAt": "2020-11-13T17:38:41Z",
                "content": "The Premier League has scrapped its controversial pay-per-view experiment and made all matches from November 21 and throughout the festive period available live via one of their regular UK broadcast … [+2828 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "National League nine want chairman to resign over distribution of bail-out cash",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/national-league-nine-want-chairman-to-resign-over-distribution-of-bail-out-cash-1605288041000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/VLwGw8SLeqUP5usp6Lx6Eg-1200-80.jpg",
                "publishedAt": "2020-11-13T17:20:41Z",
                "content": "Nine National League clubs have called for the resignation of the governing bodys chairman, Brian Barwick.\r\nThe future of the National League and the two regionalised divisions one step down the pyra… [+3376 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "none",
                "title": "Bolton v Salford live stream: how to watch League Two wherever you are in the world",
                "description": "How to watch a Bolton v Salford live stream, as two promotion hopefuls look to find some form",
                "url": "https://www.fourfourtwo.com/news/bolton-v-salford-live-stream-how-to-watch-league-two-wherever-you-are-in-the-world",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/CehJixYUKBttTmpnabDs27-1200-80.jpg",
                "publishedAt": "2020-11-13T16:45:06Z",
                "content": "Bolton v Salford live stream, Sky Sports, Friday 13 November, 7.45pm GMT\r\nSalford City make the short journey to Bolton on Friday in a League Two clash that will mark the first ever meeting between t… [+5838 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "FourFourTwo Staff",
                "title": "Nike releases new Phantom GT gear - inspired by the Scorpion range",
                "description": "Remember the Nike ad with the cage football tournament? You can now buy balls and boots inspired by that iconic time",
                "url": "https://www.fourfourtwo.com/news/nike-phantom-gt-scorpion-range-football-boot-cage-advert",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/d2x6yoQUnja7M3PnLieG5D-1200-80.jpg",
                "publishedAt": "2020-11-13T15:47:23Z",
                "content": "Eighteen years ago, Nike released that advert - the legendary cage football tournament featuring master of ceremonies Eric Cantona. Remember that group of world-class footballers competing in a three… [+3681 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "Scott McTominay reveals relief after shoot-out provides a happy ending for Scots",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/scott-mctominay-reveals-relief-after-shoot-out-provides-a-happy-ending-for-scots-1605282099000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/XHzinWTxkM69rRwdgAx2NY-1200-80.jpg",
                "publishedAt": "2020-11-13T15:41:39Z",
                "content": "Scott McTominay admits he was the most relieved man in Belgrade after seeing David Marshall bail out Scotlands Euro 2020 dreams.\r\nThe Manchester United midfielder looked to have strolled through anot… [+4010 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "Further trouble for Liverpool after Mohamed Salah tests positive for coronavirus",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/further-trouble-for-liverpool-after-mohamed-salah-tests-positive-for-coronavirus-1605281763000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/3LuvDALesH4oarMqL9ot7k-1200-80.jpg",
                "publishedAt": "2020-11-13T15:36:03Z",
                "content": "Premier League champions Liverpool have suffered another blow after the Egyptian Football Association confirmed striker Mohamed Salah had tested positive for coronavirus.\r\nThe governing body said a m… [+1110 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "Sunderland not commenting on reports Stewart Donald has agreed to sell club",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/sunderland-not-commenting-on-reports-stewart-donald-has-agreed-to-sell-club-1605281016000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/BbSUEsYrRdZQMC9urhTSkn-1200-80.jpg",
                "publishedAt": "2020-11-13T15:23:36Z",
                "content": "Sunderland are remaining tight-lipped over claims that owner Stewart Donald has agreed to sell the League One club.\r\nOfficials were not commenting on Friday afternoon on a report that a consortium le… [+1467 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "England Women’s home friendly against Norway in December cancelled",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/england-womens-home-friendly-against-norway-in-december-cancelled-1605280472000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/GREnWFsSMActcCkJXnSn68-1200-80.jpg",
                "publishedAt": "2020-11-13T15:14:32Z",
                "content": "England Womens home friendly against Norway next month has been cancelled, the Football Association has announced.\r\nThe match, which had been set to take place at Sheffield Uniteds Bramall Lane on De… [+1132 chars]"
            },
            {
                "source": {
                    "id": "four-four-two",
                    "name": "FourFourTwo"
                },
                "author": "PA Staff",
                "title": "FPL tips: Why hidden data suggests it’s time to sell Son and Kane",
                "description": "none",
                "url": "https://www.fourfourtwo.com/news/fpl-tips-why-hidden-data-suggests-its-time-to-sell-son-and-kane-1605280248000",
                "urlToImage": "https://cdn.mos.cms.futurecdn.net/8kmncYUPhagswJQGRcZdPJ-1200-80.jpg",
                "publishedAt": "2020-11-13T15:10:48Z",
                "content": "Eight games of the Premier League season have passed and teams have started showing their form but which sides have had a truly easy start, and who can expect the next eight games to be much trickier… [+2807 chars]"
            }
        ]
    }

    news_articles_array = news_articles['articles']
    news_object_list = []

    for article in tqdm(news_articles_array):

        article_object = News(
            title=article['title'],
            image=article['urlToImage'],
            url=article['url']
        )

        news_object_list.append(article_object)

    league_list = requests.get('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php').json()
    league_object_list = []
    countries = {}
    existing_team_ids = set()
    print("starting ...")
    for league in tqdm(league_list['leagues']):
        if league['strSport'] == 'Soccer':
            league_details = requests.get(
                f'https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id={league["idLeague"]}').json()
            league_details = league_details['leagues'][0]
            country = league_details['strCountry']
            if country in countries:
                country_latlng = countries[country]
            else:
                country_latlng = requests.get(
                    f'https://api.opencagedata.com/geocode/v1/json?q={league_details["strCountry"]}&key=ab82c77042d74ae6aae0bb67ff494887').json()
                country_latlng = country_latlng['results'][0]['bounds']
                countries[country] = country_latlng

            league_object = League(
                id=league_details['idLeague'],
                name=league_details['strLeague'],
                year=league_details['intFormedYear'],
                country=league_details['strCountry'],
                description=league_details['strDescriptionEN'],
                website=league_details['strWebsite'],
                image=league_details['strLogo'],
                badge=league_details['strBadge'],
                lon=(float(country_latlng['northeast']['lng']) +
                     float(country_latlng['southwest']['lng']))/2,
                lat=(float(country_latlng['northeast']['lat']) +
                     float(country_latlng['southwest']['lat']))/2
            )
            league_object_list.append(league_object)
            team_list = requests.get(
                f'https://www.thesportsdb.com/api/v1/json/1/lookup_all_teams.php?id={league["idLeague"]}').json()
            if not team_list['teams']:
                continue
            for team in team_list['teams']:
                if team['idTeam'] not in existing_team_ids and team['strSport'] == 'Soccer':
                    team_details = team
                    existing_team_ids.add(team['idTeam'])
                    team_object = Team(
                        id=team_details['idTeam'],
                        name=team_details['strTeam'],
                        year=team_details['intFormedYear'],
                        country=team_details['strCountry'],
                        description=team_details['strDescriptionEN'],
                        website=team_details['strWebsite'],
                        image=team_details['strTeamBadge'],
                        stadium=team_details['strStadium'],
                        league_id=league['idLeague'],
                        banner=team_details['strTeamBanner'],
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

    article1 = User(
        username="admin",
        email="admin@admin.com",
        password="admin",
        team="133616",
        league="4332"
    )

    db.session.add_all(league_object_list + [admin] + news_object_list)
    db.session.commit()

    print('Completed!')
