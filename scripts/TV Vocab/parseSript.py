import urllib2
import pickle
import numpy as np
import csv
import re
import json
from bs4 import BeautifulSoup
import os
import errno

showLinks = {
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=new-girl": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=30-rock":False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=big-bang-theory": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=mike-and-molly": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=breaking-bad": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=two-and-a-half-men": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=parks-and-recreation": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=seinfeld": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=friends": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=south-park": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=trailer-park-boys": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-office-us": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=game-of-thrones": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=lost": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=mad-men": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=arrested-development":False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=downton-abbey": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-wire": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-sopranos": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=community": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-simpsons": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=dexter": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=its-always-sunny-in-philadelphia": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=battlestar-galactica": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=six-feet-under": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=futurama": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-x-files": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=house-md": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-twilight-zone-1959": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=star-trek-the-next-generation": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=how-i-met-your-mother": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=curb-your-enthusiasm": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=scrubs": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=24": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=archer": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-walking-dead": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=sherlock": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=adventure-time": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=buffy-the-vampire-slayer": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=cheers": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=modern-family": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-cosby-show": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=the-wire": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=psych": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=glee": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=burn-notice": False,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=doctor-who": True,
"http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=pokemon": True,




}


def make_sure_path_exists(path):
    try:
        os.makedirs(path)
    except OSError as exception:
        if exception.errno != errno.EEXIST:
            raise

def parseShowPage(showLink):
    try:
        content = urllib2.urlopen(showLink).read()
    except:
        print "There was an error opening the page", showLink
        return
    soup = BeautifulSoup(content)
    showName = showLink.replace("http://www.springfieldspringfield.co.uk/episode_scripts.php?tv-show=", "")
    episodeLinks = []
    make_sure_path_exists(showName)
    for anchor in soup.find_all('a', class_="season-episode-title"):
        episodeLinks.append(anchor.get('href', '/'))
    counter = 0
    for link in episodeLinks:
        counter+=1
        if counter >= 50:
            return
        print showName, counter
        script = parseEpisodePage(link).encode('ascii', 'ignore').lower()
        script = re.sub(r'\[.*?\]', '', script)
        script = re.sub(r'[^\w ]', '', script)
        with open(  showName + "/" + str(counter) + ".txt", 'wb') as outfile:
            outfile.write(script)


def parseEpisodePage(episodeLink):
    episodeLink = "http://www.springfieldspringfield.co.uk/" + episodeLink
    content = urllib2.urlopen(episodeLink).read()
    soup = BeautifulSoup(content)
    return soup.find("div", class_="scrolling-script-container").get_text()

for link in showLinks:
    if showLinks[link]:
        print "Parsing:", link
        parseShowPage(link)


