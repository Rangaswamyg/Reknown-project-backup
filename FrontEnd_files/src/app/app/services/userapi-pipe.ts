import { Pipe, PipeTransform, Testability } from '@angular/core';


@Pipe({name: 'Signupcountry'})
export class SignupCountryApiPipe implements PipeTransform {
    constructor(){}
    transform(countrydetails_signup: any[],current_country?:any): any{
    if(!current_country || current_country == undefined){
       // console.log("checkinggg countrycode");
        return countrydetails_signup = undefined;
    }else{
        var signupcountry = current_country ? countrydetails_signup.filter(countryApi=>{return countryApi.name == current_country }) : countrydetails_signup;
      //  console.log('filtercountry', signupcountry);
        return signupcountry;
    }

    }
}

// @Pipe({name: 'Signupcity'})
// export class SignupCityApiPipe implements PipeTransform {
//     constructor(){}
//     transform(countrydetails_signup: any[],current_country?:any): any{
//     if(!current_country || current_country == undefined){
//        // console.log("checkinggg country");
//         return countrydetails_signup = undefined;
//     }else{
//         var signupcity = current_country ? countrydetails_signup.filter(cityApi=>{return cityApi.name == current_country }) : countrydetails_signup;
//         console.log('filtercountry', signupcity);
//         return signupcity;
//     }

//     }
// }