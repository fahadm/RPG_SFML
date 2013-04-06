#ifndef HOUSES_H
#define HOUSES_H
//#define DEBUG_HOUSE 1
#ifndef uint8_t
#define uint8_t short int
#endif
#include <iostream>
#include <sstream>
#include <fstream>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
#include "Objects.hpp"
#include "ObjectManager.hpp"
struct Config
{
    std::string Path;
    std::vector<sf::IntRect> out;
    int Xcomp;
    int Ycomp;

};
class Houses:public Objects
{
    sf::Image *HouseTop;
    sf::Texture *House;
    sf::Sprite HouseSprite;
    sf::Image *DoorTop;
    sf::Texture *Door;
    sf::Sprite DoorSprite;
    std::string ActiveDoor;
    std::string ActiveHouse;
    std::vector<sf::IntRect> *OutDoor;
    std::vector<sf::IntRect> *OutHouse;
    static std::map<std::string,Config> Styles;
    sf::IntRect Area;
    std::string TeleportTo;
    sf::Vector2i TeleportPos;
    sf::Vector2i Length;
    bool useDoor;
    bool Drawn;
    int xpos,ypos;
    int VerticalComponents,HorizontalComponents;


public:
    Houses(std::string path,int x,int y);
    Houses (int x=0,int y=0);

    inline void  SetTeleportLocation(std::string name){TeleportTo=name;}
    sf::Vector2i GetTeleportPosition();
    std::string GetTeleportLocation();

    inline void  SetTeleportPosition(sf::Vector2i Pos) {TeleportPos=Pos;}




    inline std::string GetActiveDoor()
    {
        return ActiveDoor;
    }
    inline std::string GetActiveHouse()
    {
        return ActiveHouse;
    }
    void SelectDoorStyle(std::string );
    void SelectHouseStyle(std::string );
    void SetPosition(int x,int y);
    void EnableDoor();
    void DisableDoor();
    void Draw(sf::RenderWindow &App);
     sf::IntRect& GetRect();
     std::string GetName();
     sf::Sprite& GetSprite();
    static void LoadConfig(std::string path);
 bool IsDrawn();
 bool DoorState();
    //todo Addmore
    friend class ObjectManager;
};
#endif //HOUSES_H
