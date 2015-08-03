import os

os.chdir('Dota2Lounge Data')
execfile("parse.py")
os.chdir('../spotify')
execfile("charts.py")