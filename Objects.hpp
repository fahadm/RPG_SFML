#include <iostream>
#include <sstream>
#include <fstream>
#include <vector>
#include <map>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>

#ifndef uint8_t
#define uint8_t short int
#endif

#ifndef OBJECT_H
#define OBJECT_H


/*----------
Dummy Class
May be needed in the future


------------*/
class Objects
{
public:

    virtual sf::IntRect& GetRect()=0; // The enclosing rectangle of the object
    virtual std::string GetName() =0; //Name(identifier) of the object
    virtual sf::Sprite& GetSprite() =0; //Sprite of the object
    virtual bool IsDrawn() =0; //don't know what this is
    virtual std::string GetTeleportLocation(){return "NUN";}
    virtual sf::Vector2i GetTeleportPosition(){return sf::Vector2i(-1,-1);}
    virtual bool DoorState(){return false;}


};


#endif
