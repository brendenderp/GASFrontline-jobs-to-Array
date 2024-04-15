

function FindFrontLineJobs(url) {
 


 // Extract the part after the protocol and domain
   var path = url.split('//')[1];


   // Extract the town name between slashes
   var town = path.split('/')[1];


   // Construct the regular expression dynamically
   var regex = new RegExp(town + "/.*");


   // Replace everything after the town name
   //make sure that no matter what the given URL we are going to the correct address.
   var url = url.replace(regex, town + "/")+ "/onlineapp/jobpostings/Output.asp?all=1&";


//for this URL definition all that really matters is "ttps://www.applitrack.com/corvallis"  you can find any frontline job page and put
// /jobpostings/Output.asp?all=1& after it and youll be getting jobs for it. I designed this script to be dynamic in that way.
 var Jobs = [];
 // Fetch the content of the ASP file
 var response = UrlFetchApp.fetch(url);
 var content = response.getContentText();


 // Find the occurrences of "wrapword" in the content, this is the element ID of the job title.
 var index = 0;
 var occurrences = [];
 while (true) {
   index = content.indexOf("wrapword", index);
   if (index === -1) break;
   occurrences.push(index);
   index += "wrapword".length;
 }


  // Extract and print the following characters until "</td>" is encountered
for (var i = 0; i < occurrences.length; i++) {
   var start = occurrences[i] + "wrapword".length;
   var end = start + 256;
   var extractedText = content.substring(start, end);




   // I honestly dont understand asp files. and I didnt read any documentation to read this. But it seems like its a JS file
   // that dictates how the DOM should be edited using JS. Sometimes a  element gets cut off mid way though.
   //Honestly not exactly sure why...  But bellow you can see we are searching for the </td> or '); in each element.
   // Whichever comes first. Why is an entire script being sent just to set dom elements rather than
   //having a separate script that already does that and sending over just a json file with all the page content??
   //I dont know, I didnt design it... Maybe They need to use backend server time to maintain funding?
   var endTagIndex = extractedText.indexOf("</td>"); //.  ');


   console.log(extractedText.indexOf("');") ,"< ", endTagIndex );
  
   if(extractedText.indexOf("');") < endTagIndex && extractedText.indexOf("');") != -1){ endTagIndex = extractedText.indexOf("');");}


   if (endTagIndex !== -1) {
     extractedText = extractedText.substring(0, endTagIndex);
   }
   // Remove specified text by finding its index and removing characters from the beginning
   var specifiedText = "\' style=\'width: 950px; padding: 5px;\'>    "; // Text to remove
   var specifiedTextIndex = extractedText.indexOf(specifiedText);
   if (specifiedText.length !== -1) {
     extractedText = extractedText.substring(specifiedTextIndex + specifiedText.length);
   }
   Logger.log("Text after wrapword occurrence " + (i + 1) + ": " + extractedText);
   Jobs.push(extractedText);
 }
return(Jobs);
}


