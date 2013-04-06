#include "Singleton.hpp"

int main(void)

{
    
    try
    {
		Singleton *Main = Singleton::GetInstance() ;
		Main->Run();

    }
    catch (const char * s)
    {
        std::cout<<s;
    }

}


