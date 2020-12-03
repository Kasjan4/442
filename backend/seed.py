
from app import app, db

from models.league import League
from models.user import User


with app.app_context():

    db.drop_all()

    db.create_all()

    admin = User(
        username="admin",
        email="admin@admin.com",
        password="admin"
    )
    admin.save()


    PremierLeague = League(
        id = 4328,
        name='Premier League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    Bundesliga = League(
        id = 4331,
        name='Bundesliga',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    LaLiga = League(
        id = 4335,
        name='La Liga',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    SerieA = League(
        id = 4332,
        name='Serie A',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    Ligue1 = League(
        id = 4334,
        name='Ligue 1',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    Eredivisie = League(
        id = 4337,
        name='Eredivisie',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    MLS = League(
        id = 4346,
        name='MLS',
        year=1993,
        description='Major League Soccer (MLS) is a professional soccer league representing the sport\ns highest level in both the United States and Canada. MLS constitutes one of the major professional sports leagues of the United States and Canada. The league is composed of 20 teams—17 in the U.S. and 3 in Canada. The MLS regular season runs from March to October, with each team playing 34 games; the team with the best record is awarded the Supporters\n Shield. The post season includes twelve teams competing in the MLS Cup Playoffs through November and December, culminating in the championship game, the MLS Cup. MLS teams also play in other competitions against teams from other divisions and countries, such as the U.S. Open Cup, the Canadian Championship, and the CONCACAF Champions League. MLS is sanctioned by the United States Soccer Federation (U.S. Soccer). Major League Soccer was founded in 1993 as part of the United States\n successful bid to host the 1994 FIFA World Cup. The first season took place in 1996 with ten teams. MLS experienced financial and operational struggles in its first few years: The league lost millions of dollars, teams played in mostly empty American football stadiums, and two teams folded in 2002. Since then, MLS has expanded to 20 teams, owners built soccer-specific stadiums, average attendance at MLS matches exceeds that of the National Basketball Association (NBA) and the National Hockey League (NHL), MLS secured national TV contracts, and the league is now profitable. Instead of operating as an association of independently owned teams, MLS is a single entity in which each team is owned and controlled by the league\ns investors. The investor-operators control their teams as owners control teams in other leagues, and are commonly (but inaccurately) referred to as the team\ns owners. The league\ns closed membership makes it one of the world\ns few soccer leagues that does not use promotion and relegation, which is uncommon in North America. MLS headquarters are in New York City.'
        website='www.mlssoccer.com'
        image=
        lon=
        lat=
    ),
    PrimeiraLiga = League(
        id = 4344,
        name='Primeira Liga',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    ChineseSuperLeague = League(
        id = 4359,
        name='Chinese Super League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    ScottishPremierLeague = League(
        id = 4330,
        name='Scottish Premier League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    SuperleagueGreece = League(
        id = 4336,
        name='Superleague Greece',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    BelgianFirstDivisionA = League(
        id = 4338,
        name='Belgian First Division A',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    TurkishSuperLig = League(
        id = 4339,
        name='Turkish Super Lig',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    BrazilianSerieA = League(
        id = 4351,
        name='Brazilian Serie A',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    RussianFootballPremierLeague = League(
        id = 4355,
        name='Russian Football Premier League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    AustralianALeague = League(
        id = 4356,
        name='Australian A-League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    SwedishAllsvenskan = League(
        id = 4347,
        name='Swedish Allsvenskan',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    MexicanPrimeraLeague = League(
        id = 4350,
        name='Mexican Primera League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    UkrainianPremierLeague = League(
        id = 4354,
        name='Ukrainian Premier League',
        year=
        description=
        website=
        image=
        lon=
        lat=
    ),
    NorwegianEliteserien = League(
        id = 4358,
        name='Norwegian Eliteserien',
        year=
        description=
        website=
        image=
        lon=
        lat=
    )


    print('Leagues created')
    print('Adding to database:')


    db.session.add_all([PremierLeague, Bundesliga, LaLiga, SerieA, Ligue1, Eredivisie, MLS, PrimeiraLiga, ChineseSuperLeague, ScottishPremierLeague, SuperleagueGreece, BelgianFirstDivisionA, TurkishSuperLig, BrazilianSerieA, RussianFootballPremierLeague, AustralianALeague, SwedishAllsvenskan, MexicanPrimeraLeague, UkrainianPremierLeague, NorwegianEliteserien])

    db.session.commit()

    print('Completed!')
