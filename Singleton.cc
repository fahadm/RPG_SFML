#include "Singleton.hpp"

Singleton* Singleton::Instance =NULL;
Singleton::Singleton():App(sf::VideoMode(800,600,32) , "SFML window",sf::Style::Close)
{
	sf::Texture Logo;
	sf::Sprite LogoSp;
	LoadResources(*this);
}





void Singleton::Run()
{
	bool fullscreen=false;

	 App.EnableVerticalSync(true);

	while (App.IsOpened())
	{


		Keys::GetKeyState();



		//-----------Process Events
		sf::Event Event;
		while (App.PollEvent(Event))
		{
			if (Event.Type == sf::Event::Closed)
				App.Close();
			if ((Event.Type == sf::Event::KeyPressed) && (Event.Key.Code == sf::Keyboard::Escape))
				App.Close();
			if ((Event.Type == sf::Event::KeyPressed) && (Event.Key.Code == sf::Keyboard::F2))
				Area.SetActiveArea("RockyTown");
			if ((Event.Type == sf::Event::KeyPressed) && (Event.Key.Code == sf::Keyboard::F1))
				Area.SetActiveArea("GrassyTown");
			if ((Event.Type == sf::Event::KeyPressed) && (Event.Key.Code == sf::Keyboard::D))
				std::cout<<1000.f/App.GetFrameTime()<<std::endl;
			if ((Event.Type == sf::Event::KeyPressed) && (Event.Key.Code == sf::Keyboard::F))
			{
				fullscreen = !fullscreen;
				if (fullscreen)
					App.Create(sf::VideoMode(640, 480, 32), "SFML Window", (fullscreen ? sf::Style::Fullscreen : sf::Style::Resize|sf::Style::Close));
			}


		}
		//-----------Process Events

		App.Clear();
		//-----------Collision check
		ColHandler.IsColliding(Andy);

		if (ColHandler.NeedUpdate)
		{
			Area.SetActiveArea(ColHandler.Teleport);
			ColHandler.NeedUpdate=false;
		}
		//-----------Collision check
		Keys::GoodCordinates = Andy.GetCord();
		Andy.Logic();


		App.SetView(V);
		Area.Draw(App);

		Andy.Draw(App);

		Andy.ChangeView(V);
		App.Display();
	}
}
	Singleton* Singleton::GetInstance()
	{
		if (Instance == NULL )
			{
				Instance = new Singleton();
				return Instance;
			}
		return Instance;
	}

	void Singleton::LoadResources(Singleton &Var)
	{

		Houses::LoadConfig("gfx2\\houses.ini");
		Var.Area.LoadFromFile("gfx2\\World.ini");
		Var.Area.SetActiveArea("GrassyTown");
		Var.Andy.LoadFromFile("p1.png");
		Var.Andy.SetNoFrag(4,4);
		Var.Andy.SetCord(sf::Vector2f(400,400));
		Var.V = Var.App.GetDefaultView();
		// Var.App.SetFramerateLimit(100);


	}

	Singleton::~Singleton()
	{
		//dtor
	}
