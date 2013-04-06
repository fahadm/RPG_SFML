#ifndef TILES_H
#define TILES_H
#ifndef uint8_t
#define uint8_t short int
#endif
#include <iostream>
#include <sstream>
#include <fstream>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Graphics.hpp>
class tiles
{
    sf::Texture tile4x4;//The Whole Texture
    sf::Sprite TileMap; // The specific Tile
    uint8_t TilePos[5] ;
    sf::IntRect Grid;

    sf::Vector2f First_Tile;
    sf::Vector2f V1; //Selected tile Cordinates
    sf::Vector2f V2;//
public:
    tiles() {}
    tiles(std::string n,int,int);
    void LoadFromFile(std::string n,int,int);
    void  SetRecSpace(sf::Vector2f V1);
    void SetTile(int R,int C);
    void Draw(sf::RenderWindow &App);
//    sf::IntRect& GetRect();
//    std::string GetName();
    void SetGridPosition(sf::IntRect v);
    void SetStartPosition(int x,int y);
    void SetEndPosition(int x, int y);

};
#endif //TILES_H
