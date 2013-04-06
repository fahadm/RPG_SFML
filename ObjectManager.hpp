#include <iostream>
#include <sstream>
#include <fstream>
#include <vector>
#include <map>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
#include "Tiles.hpp"
#include "Houses.hpp"
#include "Objects.hpp"
//Todo Add more Headers
#ifndef uint8_t
#define uint8_t short int
#endif
#ifndef OBJECTMANAGER_H
#define OBJECTMANAGER_H
/*
Mainly responsible for loading textures and images.
Also maintains the list of objects currently in the system

*/

class ObjectManager
{
public:
    inline static sf::Image& RequestImageObject(std::string name )
    {
        if (ImageStack.find(name) != ImageStack.end())
        {
            return ImageStack[name];

        }
        else
        {
            std::cout<<"Loading Image Obj no # "<<ObjectCountImg++<<std::endl;
            ImageStack[name];
            ImageStack[name].LoadFromFile(name);

            return ImageStack[name];

        }

    }
    inline static sf::Texture& RequestTextureObject(std::string name )
    {

        if (TextureStack.find(name) != TextureStack.end())
        {
            return TextureStack[name];

        }
        else
        {
            std::cout<<"Loading Texture Obj no # "<<ObjectCountTex++<<std::endl;

            TextureStack[name];
            TextureStack[name].LoadFromImage(RequestImageObject(name));

            return TextureStack[name];

        }

    }
    static inline void RegisterNewObject(Objects * Obj)
    {
        ObjectStack.push_back(Obj);
        std::cout<<"New "<<Obj->GetName()<<" Object  Added, Object # "<<ObjectStack.size()<<std::endl;

    }
    static inline void ClearAllObjects(){ObjectStack.clear();}
    static const std::vector<Objects*> &  GetObjectStack() {return ObjectStack;}



protected:
private:
    static std::map<std::string,sf::Image>   ImageStack;
    static std::map<std::string,sf::Texture>   TextureStack;
    static std::vector<Objects*> ObjectStack;
    static int ObjectCountTex;
    static int ObjectCountImg;


};

#endif // OBJECTMANAGER_H
