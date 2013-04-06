#include "Tiles.hpp"
tiles::tiles(std::string n,int FX=40,int FY=40)
{
    tile4x4.LoadFromFile(n);
    TileMap.SetTexture(tile4x4);
    tile4x4.SetSmooth(false);

    First_Tile=V1 = sf::Vector2f(FX,FY);
    V2 = sf::Vector2f(40,40);
    TileMap.SetSubRect(sf::IntRect(V1.x,V1.y,V2.x,V2.y));


}
void tiles::LoadFromFile(std::string n,int FX=40,int FY=40)
{
    if (!tile4x4.LoadFromFile(n)) std::cerr<<"Loading of Tileset "+ n + " Failed"<<std::endl;

    TileMap.SetTexture(tile4x4);
    tile4x4.SetSmooth(false);

    First_Tile=V1 = sf::Vector2f(FX,FY);
    V2 = sf::Vector2f(40,40);
    TileMap.SetSubRect(sf::IntRect(V1.x,V1.y,V2.x,V2.y));


}
void  tiles::SetRecSpace(sf::Vector2f V1)
{
    this->V1 = V1;
    this->V2.x = 40;
    this->V2.y = 40;

    TileMap.SetSubRect(sf::IntRect(V1.x,V1.y,V2.x,V2.y));
}

void tiles::SetTile(int R,int C)
{

    V1= this->First_Tile;

    V1.y+=((R-1)*80);

    V1.x+=((C-1)*80);

    this->V2.x = 40;
    this->V2.y = 40;

    std::cout<<V1.x <<" "<<V1.y <<std::endl;
    TileMap.SetSubRect(sf::IntRect(V1.x,V1.y,V2.x,V2.x));


}
void tiles::SetGridPosition(sf::IntRect v)
{

    Grid=v;
    if (Grid.Width % int(TileMap.GetSize().x) != 0 )
    {
        int temp = ceil((Grid.Width) /float(TileMap.GetSize().x)) ;
        temp*=TileMap.GetSize().x;
        Grid.Width=temp;
//        std::cout<<"Rounded X to "<<Grid.Width;
    }
    if (Grid.Height % int(TileMap.GetSize().y) != 0 )
    {
        int temp = ceil((Grid.Height) /float(TileMap.GetSize().y)) ;
        temp*=TileMap.GetSize().y;
        Grid.Height=temp;
//        std::cout<<"Rounded Y to "<<Grid.Height;
    }



}
void tiles::SetStartPosition(int x,int y)
{
    Grid.Top=y;
    Grid.Left=x;


}

void tiles::Draw(sf::RenderWindow &App)
{


    sf::Vector2f Center,HalfSize;
    Center=App.GetView().GetCenter();
    HalfSize = App.GetView().GetSize();
    HalfSize.x/=2;
    HalfSize.y/=2;
    if (!Grid.Intersects(sf::IntRect(Center.x-HalfSize.x,Center.y-HalfSize.y,HalfSize.x*2,HalfSize.y*2)))
    {
        return;
    }

    sf::Vector2<float> sprwidth=TileMap.GetSize();

    for ( int i=Grid.Top; i < Grid.Top + Grid.Height; i+=sprwidth.y)
    {
        for ( int j=Grid.Left; j < Grid.Left + Grid.Width; j+=sprwidth.x)
        {
            TileMap.SetPosition(j,i);
            App.Draw(TileMap);



        }
    }


}
// sf::IntRect& tiles::GetRect()
//{
//    return Grid;
//
//}
// std::string tiles::GetName()
//{
//    return "Tiles";
//}
//
