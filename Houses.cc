#include "Houses.hpp"

std::map<std::string,Config> Houses::Styles;
Houses::Houses(std::string path,int x=0,int y=0):xpos(x),ypos(y)
{
    useDoor=false;
    House->SetSmooth(false);
}
Houses::Houses (int x,int y):xpos(x),ypos(y)
{
    useDoor=false;

}
void Houses::SelectDoorStyle(std::string str )
{
    if (ActiveDoor!=str)
    {

        ActiveDoor = str;
        if (Styles.find(str) != Styles.end())
        {

            DoorTop=&ObjectManager::RequestImageObject(Styles[ActiveDoor].Path);

            DoorTop->CreateMaskFromColor(DoorTop->GetPixel(0,0));
            Door=&ObjectManager::RequestTextureObject(Styles[ActiveDoor].Path);
            DoorSprite.SetTexture(*Door);
            OutDoor =&Styles[ActiveDoor].out;

        }
        else
            throw "Style "+ str+"Unavailable" ;
    }

}
void Houses::SelectHouseStyle(std::string str )
{
    if (ActiveHouse!=str)
    {

        ActiveHouse = str;
        if (Styles.find(str) != Styles.end())
        {

            Config &Cfg=(Styles[ActiveHouse]);



            HouseTop = &ObjectManager::RequestImageObject(Cfg.Path);

            HouseTop->CreateMaskFromColor(HouseTop->GetPixel(0,0));
            House=&ObjectManager::RequestTextureObject(Cfg.Path);
            HouseSprite.SetTexture(*House);
            House->SetSmooth(false);
            OutHouse = &Cfg.out;
            VerticalComponents= Cfg.Xcomp;
            HorizontalComponents=Cfg.Ycomp;
            Length.x=Length.y=0;

            for ( int i =0 ; i < HorizontalComponents; i++)
                Length.x+= (OutHouse->begin()+i)->Width;
            for ( int i =0 ; i < VerticalComponents; i++)
                Length.y+=(OutHouse->begin()+i*3)->Height;
            Length.x*=.75f;
            Length.y*=.75f;



        }
        else
            throw "Style "+ str+"Unavailable" ;


        std::cout<<"House Image Address"<<HouseTop<<std::endl;
        std::cout<<"House Texture Address"<<House<<std::endl;
    }
}
void Houses::SetPosition(int x,int y)
{
    xpos = x;
    ypos=y;
    Area.Top=y+1;
    Area.Left=x+3;

    Area.Width  = Length.x ;
    Area.Width  *= .99f ;
    Area.Height = Length.y;
    Area.Height  *= .92f ;


}
void Houses::EnableDoor()
{
    useDoor=true;
}

void Houses::DisableDoor()
{
    useDoor=false;
}
void Houses::Draw(sf::RenderWindow &App)
{
#ifdef DEBUG_HOUSE
    App.Draw(sf::Shape::Rectangle(Area.Left,Area.Top,Area.Width,Area.Height,sf::Color(0,0,0),2,sf::Color(255,255,255)));
    if (DoorState())
    {
        int dx=0,dy=0;
                      dx= HouseSprite.GetPosition().x -HouseSprite.GetSubRect().Width*.40f;
                      dy= HouseSprite.GetPosition().y ;//- V[i]->GetSprite().GetSubRect().Height;
                   //    Any.Area.Intersects(sf::IntRect(dx,dy,V[i]->GetSprite().GetSubRect().Width,V[i]->GetSprite().GetSubRect().Height))
        App.Draw(sf::Shape::Rectangle(sf::FloatRect(dx,dy,HouseSprite.GetSubRect().Width*.40f,HouseSprite.GetSubRect().Height*.75f),sf::Color(22,33,44),2,sf::Color(255,255,255)));

    }


#endif
    ////Don't Draw If not on Active Screen

    sf::Vector2f Center,HalfSize;
    Center=App.GetView().GetCenter();
    HalfSize = App.GetView().GetSize();
    HalfSize.x/=2;
    HalfSize.y/=2;
    if (!Area.Intersects(sf::IntRect(Center.x-HalfSize.x,Center.y-HalfSize.y,HalfSize.x*2,HalfSize.y*2)))
    {
        Drawn=false;
        return;
    }

        Drawn= true;
    ////
    int x=xpos,y=ypos;
    for (int i=0 ; i < HorizontalComponents ; i++)
    {
        x=xpos;
        for ( int j=i*3 ; j <(i+1)*VerticalComponents ; j++)
        {
            if (j==7 && useDoor)
            {
                DoorSprite.SetPosition(x-.5f,y);
                DoorSprite.SetSubRect(*(OutDoor->begin()));
                DoorSprite.SetScaleX(0.75f);
                DoorSprite.SetScaleY(0.75f);
                App.Draw(DoorSprite);

            }
            else
            {


                HouseSprite.SetPosition(x,y);
                HouseSprite.SetSubRect(*(OutHouse->begin()+j));
                HouseSprite.SetScaleX(0.75f);
                HouseSprite.SetScaleY(0.75f);
            }
            x+= ((OutHouse->begin()+j)->Width)*0.75f;
            App.Draw(HouseSprite);
        }
        y+=((OutHouse->begin()+i*3)->Height -1)*.75f;



    }



}



/*
This function reads the House.ini file to load up all the houses.
if the style name starts with House then it will also read x




*/
void Houses::LoadConfig(std::string path)
{


    std::ifstream fin;
    fin.open(path.c_str(),std::ios::in);
    if (!fin)
    {
        throw 0x05;
    }
    std::string file;
    std::getline(fin,file,(char)-1);
    //   std::cout<<file<<std::endl;

    std::istringstream iss(file);

    std::string temp;
    iss>>temp;
    while (temp != "___EOF____")
    {

        int x1,y1,x2,y2;

        if (temp[0]=='<' )
        {
            std::string name;

            temp.erase(temp.begin(),temp.begin()+1);
            temp.erase(temp.end()-1,temp.end());
            iss>>name;
            iss>>Styles[temp].Path;

            iss>>name>>Styles[temp].Xcomp;
            iss>>name>>Styles[temp].Ycomp;

            iss>>name;

            while (name[0]!='<' && name[1]!='/')
            {

                iss>>x1>>y1>>name>>x2>>y2;

                Styles[temp].out.push_back(sf::IntRect(x1,y1,x2-x1,y2-y1));
                iss>>name;



            }


        }

        iss>>temp;
    }


}
  sf::IntRect& Houses::GetRect()
{
    return Area;

}
 std::string Houses::GetName()
{
    return "Houses";
}

sf::Sprite& Houses::GetSprite()
{
return HouseSprite;
}
bool Houses::IsDrawn()
{
return Drawn;
}
 std::string Houses::GetTeleportLocation(){return TeleportTo;}
     sf::Vector2i Houses::GetTeleportPosition(){return TeleportPos;}
//sf::Vector2i Houses::GetTeleportPosition( )
bool Houses::DoorState(){return useDoor;}
