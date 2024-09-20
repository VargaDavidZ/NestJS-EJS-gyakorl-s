import { Controller, Get, Render } from '@nestjs/common';
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







}
