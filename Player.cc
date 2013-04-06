#include "Player.hpp"
Player::Player():Pos(0,0),Cord(0,0)
{
    FragLen= sf::Vector2i(0,0);

}
Player::Player(std::string n,int wl,int hl):Pos(0,0),Cord(0,0)
{
    //if (!PlayerSet.LoadFromFile(n)) throw "File Not Found";
	PlayerSet = ObjectManager::RequestTextureObject(n);

    Person.SetTexture(PlayerSet);
    PlayerSet.SetSmooth(false);
    SetNoFrag(wl,hl);


//31.25
//48
}
void  Player::LoadFromFile(std::string n)
{

    if (!PlayerSet.LoadFromFile(n)) throw "File Not Found";
    std::cerr<<"LOADED"<<std::endl;
    Person.SetTexture(PlayerSet);
    PlayerSet.SetSmooth(false);
//    PlayerSet.CreateMaskFromColor (PlayerSet.GetPixel(0,0));

}


void Player::ChangeView(sf::View &V)
{
    V.SetCenter(Cord);
//    V.s
}
void Player::SetNoFrag(sf::Vector2i V)
{
    this->FragLen.x = PlayerSet.GetWidth()/V.x;
    this->FragLen.y = PlayerSet.GetHeight()/V.y;;
}

void Player::SetNoFrag(int wl,int hl)
{
    this->FragLen.x = PlayerSet.GetWidth()/wl;
    this->FragLen.y = PlayerSet.GetHeight()/hl;
}

void Player::SpriteMove()
{
    float x=1.0;
    int width=PlayerSet.GetWidth();
    if (Keys::Key_X)
        x=3.0f;

    if (Keys::Key_UP)
    {
        Pos.y = FragLen.y*3;
        Pos.x+= FragLen.x;
        Pos.x =((int)Pos.x %width);
        Cord.y-= x*1.0f;

    }
    else if (Keys::Key_DOWN)
    {
        Pos.y =0;
        Pos.x+= FragLen.x;
        Pos.x =((int)Pos.x %width);
        Cord.y+=x*1.0f;
    }
    else if (Keys::Key_LEFT)
    {
        Pos.y = FragLen.y;
        Pos.x+= FragLen.x;
        Pos.x =((int)Pos.x %width);
        Cord.x-= x*1.0f;
    }
    else if (Keys::Key_RIGHT)
    {
        Pos.y = FragLen.y*2;
        Pos.x+= FragLen.x;
        Pos.x =((int)Pos.x %width);
        Cord.x+= x*1.0f;
    }

    Area = sf::IntRect(Cord.x+FragLen.x*.1f,Cord.y+FragLen.y*.75f,FragLen.x*.9f,FragLen.y*.25f);
    Person.SetSubRect(sf::IntRect(Pos.x,Pos.y,FragLen.x,FragLen.y));
}
void Player::SetCord(sf::Vector2f x)
{
    Cord=x;

}
void Player::SetCord(sf::Vector2i x)
{
    Cord.x=x.x;
    Cord.y=x.y;

}
sf::Vector2f Player::GetCord()
{
    return Cord;
}

void Player::Draw(sf::RenderWindow &App)
{

    #ifdef DEBUG_PLYR
    App.Draw(sf::Shape::Rectangle(Area.Left,Area.Top,Area.Width,Area.Height,sf::Color(0,0,0),2,sf::Color(255,255,255)));

    #endif

    App.Draw(Person);

}
void Player::Logic()
{
    SpriteMove();
    Person.SetPosition(Cord);

}
