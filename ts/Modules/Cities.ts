const data = require("cities.json"),
      unique = require('array-unique'),
      latinize = require('latinize');


type CityObj = {
  name: string,
  country: string,
  lng: string,
  lat: string
}

interface FormattedCitiesArrayInterface {
  [key: string]: string[]
}

const Cities = (function(all_cities: CityObj[]) {
  // Private
  type jQueryStringValType = string | number | string[] | undefined;
  

  let cities_formatted: FormattedCitiesArrayInterface = {
    'a': [],
    'b': [],
    'c': [],
    'd': [],
    'e': [],
    'f': [],
    'g': [],
    'h': [],
    'i': [],
    'j': [],
    'k': [],
    'l': [],
    'm': [],
    'n': [],
    'o': [],
    'p': [],
    'q': [],
    'r': [],
    's': [],
    't': [],
    'u': [],
    'v': [],
    'w': [],
    'x': [],
    'y': [],
    'z': [],
    'other': []
  };

  // Private Helpers
  function _performFormatting(): void {  
    console.time("formatting");
    let i = 0;
    for (;i < all_cities.length; i++) {
      const f_city_lettter_lower = latinize(all_cities[i].name[0].toLowerCase()),
            city_name = latinize(all_cities[i].name);

      if(cities_formatted.hasOwnProperty(f_city_lettter_lower)) 
      {
        cities_formatted[f_city_lettter_lower].push(city_name);
      } 
      else 
      {
        cities_formatted['other'].push(city_name);
      }
    }
    console.timeEnd("formatting");
  }

  function _performSearch(array: string[], k: string): string[] {

    console.time("search");

    let res: string[] = [],
        i: number = 0,
        k_lower = k.toLowerCase(),
        num_of_result = 0;

    for (; i < array.length; i++) {
      if(num_of_result <= 10) {
        const curr_city = array[i],
              curr_city_lower = array[i].toLowerCase();

        if(curr_city_lower.includes(k_lower) || curr_city_lower.startsWith(k_lower) || k_lower === curr_city_lower) {  
          res.push(curr_city);
          num_of_result++;
        } 

      }
    }

    console.timeEnd("search");
    return res;
  }


  // Public
  function getCitiesByKeyword(k: jQueryStringValType): string[] {
    let res: string[] = [];

    console.log(cities_formatted);

    function __isInputValid() {
      if( typeof k === "string" && k.length >= 1 )
        return true;
      else 
        return false;
    }

    if(__isInputValid() && typeof k === "string") {
      let ks_first_letter = k[0].toLowerCase();

      if(cities_formatted.hasOwnProperty(ks_first_letter))
        res = _performSearch(cities_formatted[ks_first_letter], k);
      else 
        res = _performSearch(cities_formatted["other"], k);
    }

    return unique(res);
  }

  function init(): void {
    _performFormatting();
  }
  // interface
  return {
    init,
    getCitiesByKeyword
  };
})(data);

export default Cities ;
