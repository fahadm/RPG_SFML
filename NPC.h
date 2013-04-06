#pragma once
#include "Player.hpp"
#include "Objects.hpp"
#include "ObjectManager.hpp"

class NPC : public Player,public Objects
{
	std::string Identifier;

public:
	
	NPC(void);
	NPC(std::string s, int ,int);
	~NPC(void);
};

