#include <iostream>
#include <sstream>
#include <fstream>
#include <vector>
#include <map>
#include <string>
#include <SFML/Graphics.hpp>
#include <SFML/System.hpp>
#include <SFML/Window.hpp>
#include <SFML/Graphics.hpp>
#include "namespaces.hpp"
#include "Player.hpp"
#include "Tiles.hpp"
#include "Houses.hpp"
#include "Collision.hpp"
#include "AreaBuilder.hpp"

#ifndef SINGLETON_H
#define SINGLETON_H
#ifndef uint8_t
#define uint8_t short int
#endif

class Singleton
{
public:
	static Singleton* GetInstance();
    void Run();
    
    /** Default destructor */
    ~Singleton();
protected:
	/** Default constructor */
	Singleton();
	static Singleton * Instance;
private:
    sf::RenderWindow App; //!< Member variable "App"
    sf::View V; //!< Member variable "V"
    Player Andy; //!< Member variable "Andy"
    Collision ColHandler;; //!< Member variable "ColHandler;"
    AreaBuilder Area; //!< Member variable "LongState"
    static void LoadResources(Singleton & Var);
    
};

#endif // SINGLETON_H
