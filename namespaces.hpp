
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
#include <sstream>
#include <bitset>
#ifndef uint8_t
#define uint8_t short int
#endif

#ifndef NAMESPACES_H
#define NAMESPACES_H
namespace Keys
{
extern bool  Key_UP;
extern bool  Key_DOWN;
extern bool  Key_LEFT;
extern bool  Key_RIGHT;
extern bool  Key_X;
extern sf::Vector2f GoodCordinates;
extern bool GenericCollision;
extern std::bitset<4> KeyState;
extern std::bitset<4> ActiveKey;
void GetKeyState();
std::string toString(float x);
};
#endif
