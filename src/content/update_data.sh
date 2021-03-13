# remove the old JS files
rm anime/enumeratedData.js
rm manga/enumeratedData.js

# run the python script
python3 enumerate_data.py

# run the linter
yarn standard --fix