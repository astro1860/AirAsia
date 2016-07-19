AirAsia
===========================
Data Analyze and visualization project. See demo here: https://astro1860.github.io 

**Intro**

Visualize pm2.5 concentration using d3.js and leaflet.js and data crawled from http://www.stateair.net and https://airnow.gov using python. User can browse the air pollution data by either hover mouse over the buttions of cities on the top panel, or click on map. On the right panel, a line chart of pm2.5 concentration (in ug/m3) vs time is shown. Data points are visible in the line chart, with tooptips when mouse is hovered upon data points.   
**Data Analyze**

 * Crawled concentration data and datetime from data sources for 12 cities in Asia: city = "beijing", "shanghai", "chengdu", "shenyang", "guangzhou", "jakata_central", "jakata_south", "haoni", "dhaka","HoChiMinhCity","NewDelhi","Ulaanbaatar"
 * 24 data points are are crawled from rss feed, namely pm2.5 concentration data in the latest 24hours
 * Parsed xml data using python 
 * Stored data in csv for data visualization
  
**Data visualization**

  * Created line chart with scattered points created by d3.js
  * Designed tooptip information box showing time + concentration data with d3.js, when mouse hovered.
  * Used leaflet.js and mapbox to create map visualzing location of 12 cites
  * Used bootstrap and jquery to create layouts of website
  
**Platform and library**

* python 2.7
* xml.etree.ElementTree
* d3.js
* leaflet.js
* bootstrap
* jQuery
* mapbox
* OpenstreetMap

**How to Run**

1. In code/ run crawl.py that crawl concentration data and time data from data source
2. python crawl.py > [yourfolder]/[city].csv to save data of a city to your folder. In our case, data are saved in data/
3. open main.html in your browser
* attention: since d3.js is loaded from other website therefore it takes a while to load. 
