import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      quotes: this.appService.getHello()
    };
  }


  @Get("quotes")
  @Render('index')
  getJson()
  {
    
    return{
      quotes: quotes.quotes,
  
    }
  }


  @Get("randomQuote")
  @Render("randomQuote")
  getRandom()
  {


    let myNum = Math.floor(Math.random() * (quotes.quotes.length - 1 + 1) + 1);

      return{
        quotes: quotes.quotes[myNum]
      }

  }

  @Get("authors")
  @Render("authors")
  getAuthors()
  {


    let myMap = new Map<string,number>();



      quotes.quotes.forEach(item => {
          if(myMap.has(item.author))
          {
            let myNum = myMap.get(item.author);
            myMap.set(item.author, myNum + 1);
          }
          else
          {
            myMap.set(item.author,1);
          }
      });

      return{
        quotes: myMap
      }

  }


  @Get("quotes/:id")
  @Render("OneQuote")
  getOneQuote(@Param('id') id: string)
  {

    let myId = parseInt(id) - 1;


    



    return{
      quotes: quotes.quotes[myId]
    }



  }


  @Get("DeleteQuote/:id")
  @Render("DeleteQuote")
  deleteQuote(@Param('id') id: string)
  {

    let myId = parseInt(id) - 1;
    

    let myLenght = quotes.quotes.splice(myId,1).length
 
    if(myLenght == 0)
    {
      console.log(myLenght)
      return{ 
        msg: "Ismeretlen idézet"
        }
    }
    else
    {
      return{
        msg: "Sikeres törlés"
      }
    }



   



  }







}
