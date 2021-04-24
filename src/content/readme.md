# content

most of the files and logic live here. 

* `<About />` is a very simple component, returning a stylized text.

* `<Content />` is using the data from `constants.js` to display a list of `<Card />` components, linking to the appropriate route.

  * this is where the search function and filtering functions are actually implemented.

  * both `/anime` and `/manga` pages use this component. The difference is the data they are enumerated from.

* **data enumeration** is done through a python script `enumerate_data.py`. It isn't a particularly exciting piece of code, and simply automates the process of writing out the urls to episodes and manga pages.

  * the enumeration of episodes is done using peertube api, through channel names hardcoded in a list

  * the enumeration of pages is done using python's `os` library, relying on the file structure in a directory 

  * all the data is then written to `enumeratedData.js`

  * there is a bash script included - `update_data.sh`, which basically re-writes and lints all the enumerated data. Not the most efficient way of updating, but it is good enough for automating the otherwise tedious manual labor. For now.

## util

Contains all the components that are shared for `./anime` and `/manga` pages.

see the local [readme](./util/readme.md)

* [view](./util/view/readme.md)

## anime

see the local [readme](./anime/readme.md)

## manga

see the local [readme](./manga/readme.md)
