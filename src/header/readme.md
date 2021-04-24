# header

the directory and the files in it are simple enough. The `<Header />` component can be thought of as the main component, as it is what `<App />` imports and uses in the 'upper' directory.

`<Header />` itself includes two components:

* `<Ribbon />` just a list of entries we want to invite the user's attention to. The entries used are defined in the `newJson` object, declared and initialized in the `constants.js`.

* `<Piccha />` is the container for `<Navigator />`. The name of the component is a butchering of the word 'Picture', chosen for the lack of alternative. The component defines
  
  * the size of the header, depending on the route

  * the Lorem Ipsum text 

`<Navigator />`, although also a simple enough component, is perhaps the most complicated one here. `<Navigator />` is where both state-altering functions passed in from `<App> />` and the information about sections get used. Contains:

* the menu. It is a simple `<ul />` stylized using a mixin defined in `index.scss`.

* the `<SearchBar />` component, to which passes in the `searchFunction` received as a prop

* the ant design `<Switch />` component, which calls the `themeSwitchFunction` received as a prop
