#ifndef PLAYER_H
#define PLAYER_H
#ifndef uint8_t
#define uint8_t short int
#endif

//#define DEBUG_PLYR 1
#include <iostream>
#include <sstream>
#include <fstream>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
#include "namespaces.hpp"
#include "ObjectManager.hpp"
class Player
{
protected:
    sf::Texture PlayerSet;
    sf::Sprite Person;
    sf::Vector2f Pos;
    sf::Vector2f Cord;
    sf::Vector2i FragLen;
    sf::IntRect Area;
public:
    Player();
    Player(std::string n,int wl=4,int hl=4);
    void ChangeView(sf::View &V);
    void SetNoFrag(sf::Vector2i V);
    void SetNoFrag(int wl,int hl);
    void SpriteMove();
    void Logic();
    void Draw(sf::RenderWindow &App);
    void SetCord(sf::Vector2f x);
    void SetCord(sf::Vector2i x);
    void LoadFromFile(std::string n);
    sf::Vector2f GetCord();
    //todo Addmore
    friend class Collision;
};
#endif //PLAYER_H
