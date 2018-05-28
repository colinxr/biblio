# Biblio - Colin Rabyniuk

A front-end interface for the Office/Bureau Biblio Wordpress api.

## Install
Clone the repo to your machine, navigate to the directory, and run `npm install`.

When packages finish installing run `npm run dev` to fire up the server. 

This script uses Concurrently to simultaneously compile and watch the scss files, and also start up the dev server.

## The App
With Biblio, users are able to add or remove bookes from their own reading list, as well as filter books via category. Each book component also calls the Goodreads API to pull in the item's description where available. There's also a link to Goodreads if the user would like to read more. 

The reading list on the side is stored in local storage, and will persist through different browser sessions. If the user tries to add a book already in their list, an error message will appear. 
