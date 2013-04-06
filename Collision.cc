#include "Collision.hpp"
std::map<std::string,std::vector<sf::IntRect> > Collision::Handler;

void Collision::ReadFromFile(std::string name)
{
    std::ifstream fin(name.c_str(),std::ios::in);

    std::string X;
    fin>>X;

    while (X !="___EOF____")
    {
        int x1=0,y1=0,x2=0,y2=0;
        fin>>x1>>y1>>x2>>y2;
        fin>>X;
    }



}

