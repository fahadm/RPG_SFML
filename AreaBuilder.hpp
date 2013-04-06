#include <iostream>
#include <sstream>
#include <fstream>
#ifndef uint8_t
#define uint8_t short int
#endif
#include <vector>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
#include "Tiles.hpp"
#include "Houses.hpp"
#ifndef AreaBuilder_H
#define AreaBuilder_H


class AreaBuilder
{
public:
    AreaBuilder();
    void LoadFromFile(std::string path)
    {
        std::ifstream fin;
        fin.open(path.c_str(),std::ios::in);
        if (!fin)
        {
            throw 0x05;
        }
        std::string file;
        std::getline(fin,file,(char)-1);
//        std::cout<<file<<std::endl;
        std::istringstream iss(file);

        std::string Get;
        iss>>Get;
        while ( Get != "__EOF__"  )
        {

            std::string name;
            AreaInfo AreaTem;
            iss>>Get>>name;
            iss>>Get>>AreaTem.TileSet;
            iss>>Get>>AreaTem.Houses;
            AreaTem.Reserve();
            iss>>Get;
//                std::cout<<Get<<std::endl;

            for(int i=0 ; i <AreaTem.TileSet; i++)
            {
                iss>>Get>>AreaTem.TileSetVec[i].Id;
                iss>>Get>>AreaTem.TileSetVec[i].Location;
                iss>>Get>>AreaTem.TileSetVec[i].FirstTile.x>>AreaTem.TileSetVec[i].FirstTile.y;
                iss>>Get>>AreaTem.TileSetVec[i].TileStyle.y>>AreaTem.TileSetVec[i].TileStyle.x;
                iss>>Get>>AreaTem.TileSetVec[i].Width;
                iss>>Get>>AreaTem.TileSetVec[i].Height;
                iss>>Get>>AreaTem.TileSetVec[i].Grid.Left>>AreaTem.TileSetVec[i].Grid.Top>>AreaTem.TileSetVec[i].Grid.Width>>AreaTem.TileSetVec[i].Grid.Height;
                AreaTem.TileSetVec[i].Grid.Width -=AreaTem.TileSetVec[i].Grid.Left;
                AreaTem.TileSetVec[i].Grid.Height -=AreaTem.TileSetVec[i].Grid.Top;


            }


            //Avoiding all safe practices read World.ini to understand this code fahad from 2 weeks in the future
            iss>>Get>>Get;
            std::cout<<Get<<std::endl;
            for(int i=0 ; i <AreaTem.Houses; i++)
            {
                iss>>Get>>AreaTem.H_Info[i].Id;
                std::cerr<<Get<<AreaTem.H_Info[i].Id<<std::endl;
//                std::system("pause");
                iss>>Get>>AreaTem.H_Info[i].Style;
                iss>>Get>>AreaTem.H_Info[i].Door;
                if (AreaTem.H_Info[i].Door == true)
                {
                    iss>>Get>>AreaTem.H_Info[i].DoorStyle;
                    iss>>Get>>AreaTem.H_Info[i].Teleportsto;


                    iss>>Get>>AreaTem.H_Info[i].TeleportPosition.x>>AreaTem.H_Info[i].TeleportPosition.y;
                }
                iss>>Get>>AreaTem.H_Info[i].Position.x>>AreaTem.H_Info[i].Position.y;


            }


            iss>>Get;

            iss>>Get;

            Areas[name]=AreaTem;
            //If this doesnt Work Make a Copy Constructor and overload assignment operator for Areainfo struct
            iss>>Get;


        }



    }
    void SetActiveArea(std::string Area)
    {
        if (ActiveAreaStr != Area && Areas.find(Area) != Areas.end() )
        {
            ActiveArea = Areas[Area];
            ActiveAreaStr=Area;
            //Start The Loading Here
            VecHouses.clear();
            ObjectManager::ClearAllObjects();
            VecTiles.clear();
            VecHouses.resize(ActiveArea.Houses);
            VecTiles.resize(ActiveArea.TileSet);


            for ( unsigned i=0 ; i <VecTiles.size() ; i ++)
            {
                VecTiles[i].LoadFromFile(ActiveArea.TileSetVec[i].Location,ActiveArea.TileSetVec[i].FirstTile.x,ActiveArea.TileSetVec[i].FirstTile.y);
                VecTiles[i].SetGridPosition(ActiveArea.TileSetVec[i].Grid);
                VecTiles[i].SetTile(ActiveArea.TileSetVec[i].TileStyle.y,ActiveArea.TileSetVec[i].TileStyle.x);


            }
            for ( unsigned i=0 ; i <VecHouses.size() ; i ++)
            {
//                    Houses::SetPosition()
                ObjectManager::RegisterNewObject(&VecHouses[i]);
                VecHouses[i].SelectHouseStyle(ActiveArea.H_Info[i].Style);
                VecHouses[i].DisableDoor();
                if (ActiveArea.H_Info[i].Door)
                {
                    VecHouses[i].EnableDoor();
                    VecHouses[i].SelectDoorStyle(ActiveArea.H_Info[i].DoorStyle);
                    VecHouses[i].SetTeleportLocation(ActiveArea.H_Info[i].Teleportsto);
                    VecHouses[i].SetTeleportPosition(ActiveArea.H_Info[i].TeleportPosition);

                }
                VecHouses[i].SetPosition(ActiveArea.H_Info[i].Position.x,ActiveArea.H_Info[i].Position.y);
            }

        }

    }
    void Draw ( sf::RenderWindow & App)
    {

        for ( unsigned k=0 ; k <VecTiles.size() ; k ++)
        {


            for ( int i=ActiveArea.TileSetVec[k].Grid.Left; i < ActiveArea.TileSetVec[k].Grid.Left + ActiveArea.TileSetVec[k].Grid.Width; i +=ActiveArea.TileSetVec[k].Width )
                for ( int j=ActiveArea.TileSetVec[k].Grid.Top; j < ActiveArea.TileSetVec[k].Grid.Top + ActiveArea.TileSetVec[k].Grid.Height; j +=ActiveArea.TileSetVec[k].Height )
                {
                    VecTiles[k].SetGridPosition(sf::IntRect(i,j,ActiveArea.TileSetVec[k].Width,ActiveArea.TileSetVec[k].Height));
                    VecTiles[k].Draw(App);
                }

        }
        for ( unsigned i=0 ; i <VecHouses.size() ; i ++)
        {
		    VecHouses[i].Draw(App);
        }

    }
protected:
private:
    struct TileSetInfo
    {
        int Id;
        std::string Location;
        sf::Vector2i FirstTile;
        sf::Vector2i TileStyle;
        sf::IntRect Grid;
        int Width;
        int Height;

    };
    struct HouseInfo
    {
        int Id;
        std::string Style;
        std::string DoorStyle;
        bool Door;
        std::string Teleportsto;
        sf::Vector2i TeleportPosition;
        sf::Vector2i Position;

    };
    struct AreaInfo
    {
        int Houses;
        int TileSet;
        std::vector<HouseInfo> H_Info;
        std::vector<TileSetInfo> TileSetVec;
        void Reserve()
        {
            if ( Houses == 0 || TileSet == 0) return;
            H_Info.resize(Houses);
            TileSetVec.resize(TileSet);


        }

    };
    std::vector<Houses> VecHouses;
    std::vector<tiles> VecTiles;
    AreaInfo ActiveArea;
    std::string ActiveAreaStr;
    std::map <std::string,AreaInfo> Areas;

};

#endif // AreaBuilder_H
