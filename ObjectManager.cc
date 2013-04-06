#include "ObjectManager.hpp"
std::map<std::string,sf::Image>   ObjectManager::ImageStack;

std::map<std::string,sf::Texture>   ObjectManager::TextureStack;
 std::vector<Objects*> ObjectManager::ObjectStack;
int ObjectManager::ObjectCountTex=0;
int ObjectManager::ObjectCountImg=0;
