# remove the old JS files
rm ./enumeratedData.js

# run the python script
python3 enumerate_data.py

# run the linter
yarn standard --fix