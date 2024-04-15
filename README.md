
## GASFrontLine-Jobs-To-Array

### Overview

The provided code consists of three main functions designed to work with Google Apps Script. The purpose of this script is to scrape job postings from frontline and put them into an array.

### Function

**FindFrontLineJobs(url):**
   - This function scrapes job postings from a specified URL.
   - It dynamically modifies the URL to ensure it points to the correct address for retrieving job postings.
   - It fetches the content of the URL, searches for occurrences of a specific HTML element ID (`wrapword`), and extracts job titles based on certain patterns in the content.
   - It removes unnecessary text from the extracted job titles and returns them as an array.

### Usage

1. Call `FindFrontLineJobs` to initiate the process.
2. Provide the URL of the website containing the job postings.( ex "https://www.applitrack.com/salkeizk12/onlineapp/default.aspx" ) 
3. The script will scrape the job postings, and they will all be returned in a neat array. 

### Notes

- The script utilizes Google Apps Script, which provides server-side scripting for Google Workspace applications.
- It also uses the `UrlFetchApp` service to fetch content from URLs.
- The `Logger` class is used for logging messages, which can be viewed in the Google Apps Script editor.

This script serves as a simple automation tool for extracting and organizing job postings from a website into a Google Sheets spreadsheet.
Because this is running in google app scripts you can set it to run on a timer and (for example) have it send you an email when a new job listing of desired type shows up.
