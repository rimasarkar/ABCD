'use strict'
/*
A common utility to convert a string to date passed with a valid date format,
**params**
stringDate --> passed string to be converted to date
format --> A valid date format
*/

module.exports.toDate = function(stringDate,format)
{

  var normalized      = stringDate.replace(/[^a-zA-Z0-9]/g, '-');
  var normalizedFormat= format.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
  var formatItems     = normalizedFormat.split('-');
  var dateItems       = normalized.split('-');

  var monthIndex  = formatItems.indexOf("mm");
  var dayIndex    = formatItems.indexOf("dd");
  var yearIndex   = formatItems.indexOf("yyyy");

  var today = new Date();

  var year  = yearIndex>-1  ? dateItems[yearIndex]    : today.getFullYear();
  var month = monthIndex>-1 ? dateItems[monthIndex]-1 : today.getMonth()-1;
  var day   = dayIndex>-1   ? dateItems[dayIndex]     : today.getDate();

  // month with specific number of days check conditions
        if((month < 0) || (month > 11) || (day < 1) || (day > 31))
            throw new Error("Invalid Month or Date Field Recieved.Please check")
        else if((month == 1) && (day > 28))
            throw new Error("Invalid date for February Month received..")
        else if(((month == 3) || (month == 5) || (month == 8) || (month == 10))
        && (day > 30))
            throw new Error("Invalid Date for specified month Recieved.")


  return new Date(year,month,day);
};

module.exports.isValidFormat = function(stringDate){

  var pattern = /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/;
  if(!pattern.test(stringDate))
  {
    return false;
  }
  return true;
}

module.exports.DateException = function(message){
  this.message = message
  this.name = 'Date Exception'
}
