import urllib2
import pickle
import numpy as np
from ggplot import *
from pandas import *
from collections import Counter
from pylab import scatter, show, legend, xlabel, ylabel
from numpy import loadtxt, where
import csv
import re
import json


class Match(object):
    def __init__(self, teamOneOdds, teamTwoOdds, teamOne, teamTwo, matchId, winner, people, items):
        self.teamOneOdds = teamOneOdds
        self.teamTwoOdds = teamTwoOdds
        self.teamOne = teamOne
        self.teamTwo = teamTwo
        self.matchId = matchId
        self.winner = winner
        self.people = people
        self.items = items
    def __str__(self):
        return self.matchId + ""

matches = pickle.load(open("fullSave.p", "rb"))
# matches = []
def parse(low = 3999, high = 4498):
    for i in range(low, high):
        if  findExistingMatch(i):
            continue
        req = urllib2.Request('http://dota2lounge.com/match?m=%s' % i)
        try:
            response = urllib2.urlopen(req)
            the_page = response.read()
        except:
            print "There was an error opening the page"
            continue
        str1 = ' <div class="team"'
        str2 = ' </a>'
        try:
            firstTeamIndex = the_page.index(str1)
        except ValueError:
            print "There was an error parsing match", i
            continue
        teamOne =  the_page[firstTeamIndex: the_page.index(str2, firstTeamIndex)]
        teamOneOdds = teamOne[teamOne.index('<i>')+3:teamOne.index('</i>')-1]
        secondTeamIndex = the_page.index(str1, firstTeamIndex + 1)
        teamTwo =  the_page[secondTeamIndex: the_page.index(str2, secondTeamIndex)]
        teamTwoOdds = teamTwo[teamTwo.index('<i>')+3:teamTwo.index('</i>')-1]
        teamOneOdds= int(teamOneOdds)
        teamTwoOdds= int(teamTwoOdds)
        teamOne = teamOne[teamOne.index('<b>') +3 : teamOne.index('</b>')]
        teamTwo = teamTwo[teamTwo.index('<b>') + 3: teamTwo.index('</b>')]

        people = 0
        items = 0
        reg = re.compile("\\d+ people placed \\d+ items")
        for m in reg.finditer(the_page):
            innerReg = re.compile("\\d+")
            for n in innerReg.finditer(m.group()):
                if people == 0:
                    people = n.group()
                else:
                    items = n.group()
        if "(win)" in teamOne:
            teamOne = teamOne.replace("(win)", "")
            teamOne = teamOne.strip()
            teamTwo = teamTwo.strip()
            match = Match(teamOneOdds, teamTwoOdds, teamOne, teamTwo, i, teamOne, people, items )
            matches.append(match)
        elif "(win)" in teamTwo:
            teamTwo = teamTwo.replace("(win)", "")
            teamOne = teamOne.strip()
            teamTwo = teamTwo.strip()
            match = Match(teamOneOdds, teamTwoOdds, teamOne, teamTwo, i, teamTwo, people, items)
            matches.append(match)
        else:
            teamOne = teamOne.strip()
            teamTwo = teamTwo.strip()
            match = Match(teamOneOdds, teamTwoOdds, teamOne, teamTwo, i, "No Winner", people, items)
            matches.append(match)
        print i
        pickle.dump(matches, open("fullSave.p", "wb"))

def findExistingMatch(i):
    for match in matches:
        if match.matchId == i:
            return True
    return False

def makeJson():
    matches = pickle.load(open("fullSave.p", "rb"))
    for match in matches:
        match.people = int(match.people)
        match.items = int(match.items)
    with open('../../resources/dotaData/data.json', 'wb') as outfile:
        json.dump([match.__dict__ for match in matches], outfile)
        print len(matches)

parse()
makeJson()

