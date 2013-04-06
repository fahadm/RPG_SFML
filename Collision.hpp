#ifndef uint8_t
#define uint8_t short int
#endif
#include <iostream>
#include <map>
#include <vector>
#include <sstream>
#include <fstream>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
#include "Player.hpp"
//#include "ColBase.hpp"
#include "ObjectManager.hpp"
#ifndef COLLISION_H
#define COLLIISION_H


class Collision//:public ColBase
{
    static std::map<std::string,std::vector<sf::IntRect> > Handler;
    std::vector<sf::IntRect> ActiveHandle;


public:
    static void  ReadFromFile(std::string);
    Collision():NeedUpdate(false) {}
    void IsColliding(Player &Any)
    {
        int dx=0,dy=0;
        const std::vector<Objects*> &V = ObjectManager::GetObjectStack();

        for ( int i=0 ; i <V.size() ; i++)
        {
            if (V[i]->IsDrawn() && Any.Area.Intersects(V[i]->GetRect()))
            {
                //sf::Sprite::GetPosition
                dx= V[i]->GetSprite().GetPosition().x -V[i]->GetSprite().GetSubRect().Width*.30f;
                dy= V[i]->GetSprite().GetPosition().y ;//- V[i]->GetSprite().GetSubRect().Height;


                if (V[i]->DoorState()==true)
                {
                    std::cout<<"Door State is True\n";
                    if( Any.Area.Intersects(sf::IntRect(dx,dy,V[i]->GetSprite().GetSubRect().Width*.40f,V[i]->GetSprite().GetSubRect().Height*.75f)))
                    {


                        Any.SetCord((V[i]->GetTeleportPosition()));

                        NeedUpdate=true;
                        Teleport= V[i]->GetTeleportLocation();

                        return;
                    }
                }
                else std::cout<<"Door State is False\n";

                    NeedUpdate=false;
                    Any.SetCord(Keys::GoodCordinates);
                    break;

            }
        }


    }
    //temporary hack

    bool NeedUpdate;
    std::string Teleport;

};


#endif
