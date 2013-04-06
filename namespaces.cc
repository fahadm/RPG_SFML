
#include "namespaces.hpp"

bool Keys::Key_UP=false;
bool Keys::Key_DOWN=false;
bool Keys::Key_LEFT=false;
bool Keys::Key_RIGHT=false;
bool Keys::Key_X=false;
bool Keys::GenericCollision=false;
sf::Vector2f Keys::GoodCordinates;

std::bitset<4> Keys::KeyState(std::string("1111"));
std::bitset<4> Keys::ActiveKey(std::string("0000"));
void Keys::GetKeyState(void)
{
//    if ( GenericCollision)
//    {
//        Keys::KeyState=std::bitset<4>(Keys::ActiveKey.to_ulong() ^Keys::KeyState.to_ulong());
//        Andy.SetCord(GoodCordinates);
//        LongState = Keys::ActiveKey.to_ulong();
//    }

    Key_LEFT=(sf::Keyboard::IsKeyPressed(sf::Keyboard::Left)&& KeyState.test(0));
    Key_RIGHT=sf::Keyboard::IsKeyPressed(sf::Keyboard::Right)&& KeyState.test(1);
    Key_UP=sf::Keyboard::IsKeyPressed(sf::Keyboard::Up)&& KeyState.test(2);
    Key_DOWN=sf::Keyboard::IsKeyPressed(sf::Keyboard::Down)&& KeyState.test(3);
    Key_X =sf::Keyboard::IsKeyPressed(sf::Keyboard::X );


    ActiveKey[0]=Key_LEFT;
    ActiveKey[1]=Key_RIGHT;
    ActiveKey[2]=Key_UP;
    ActiveKey[3]=Key_DOWN;


}
std::string Keys::toString(float x)
{

    std::ostringstream S;
    S<<x;



    return S.str();
}


