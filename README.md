React-Boilerplate
=================

Boilerplate template for React.js w/ server-side rendering.

Using: React, React-router, Stylus, Webpack, Gulp, Flux, Dispatchr, Node, Express 4.

To run: "npm install", "gulp build", "node server.js". Type "gulp" to make development version + watch files, "gulp build" to make production version.

How to use: For server-side rendering to work properly, must keep state only inside stores. A new context/dispatcher is created for every request and gives access to request-specific stores.
   
![screen shot 2014-12-05 at 1 16 04 am](https://cloud.githubusercontent.com/assets/2387719/5311868/57494618-7c1c-11e4-9369-780e88b7a870.png)
