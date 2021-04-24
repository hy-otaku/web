# util

* `<Card />` takes in data ( originally from `constants.js` ), and translates it into a neat `<table />` and some `<p />`, whenever applicable.

  * `<Card />` can change the state of the application by callback `onGenreSelected`, which is used to filter the cards by a specific genre.

* `<CompletedIndication />` takes in a boolean to return a stylized `<span />` indicating whether a piece of data is completed or not. Some of the style is defined in `index.scss`, as a function of whether the chosen theme is light or dark.

* `<Custombox />` is a wrapper around `<Lightbox />`

* `<Lightbox />`, in its turn, is just a shameless copy-paste of the source file of the `react-awesome-lightbox` component, slighlty updates to work for `<iframe />` tags, so it can be used for displaying video files, as well as images.

  * note that `Lighbox.js` is included in the `.gitignore`. The reason is that the linter would complain about the file, and I do not plan to change the file anytime soon. In fact, I hope the original react-awesome-lightbox will get upgraded to be compatible with `iframe` tags :3

## view

see the local [readme](./view/readme.md)
