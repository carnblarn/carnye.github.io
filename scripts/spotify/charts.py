import urllib2
import sys
import json
import pprint
import operator
import time
import os


pp = pprint.PrettyPrinter(indent=4)


# latest day is the 27th

def getDailyLatest():
    content = json.loads(urllib2.urlopen("http://charts.spotify.com/api/tracks/most_streamed/global/daily/latest").read())
    with open('dailyTop/latest.txt', 'wb') as write_file:
        json.dump(content['tracks'], write_file)

def oldListContains(trackName, oldList):
    for track in oldList:
        if track['track_name'] == trackName:
            return track['num_streams']
    return 0

# top 40 list by age/gender groups
def customRanking():
    with open('dailyTop/latest.txt', 'rb') as the_file:
        newList = json.loads(the_file.read())
    rankings = {}
    for track in newList:
        newStreams = track['num_streams']
        male0 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_0_17'] * 1.0/100
        female0 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_0_17'] * 1.0/100
        male18 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_18_24'] * 1.0/100
        female18 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_18_24'] * 1.0/10
        male25 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_25_29'] * 1.0/100
        female25 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_25_29'] * 1.0/100
        male30 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_30_34'] * 1.0/100
        female30 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_30_34'] * 1.0/100
        male35 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_35_44'] * 1.0/100
        female35 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_35_44'] * 1.0/100
        male45 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_45_54'] * 1.0/100
        female45 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_45_54'] * 1.0/100
        male55 = newStreams * track["percent_male"] * 1.0/100 * track['percent_age_group_55_plus'] * 1.0/100
        female55 = newStreams * (100 - track["percent_male"]) * 1.0/100 * track['percent_age_group_55_plus'] * 1.0/100
        rankings[track['track_name']] = [track['artist_name'], male0, female0, male18, female18, male25, female25, male30, female30, male35, female35, male45, female45, male55, female55]
    sorted_x = sorted(rankings.items(), key=operator.itemgetter(1))
    pp.pprint(sorted_x)

# most weekly streams
def fastestGain():
    path = 'top/'
    listing = os.listdir(path)
    biggest = {}
    for infile in listing:
        with open('top/' + infile, 'rb') as the_file:
            trackList = json.loads(the_file.read())
            for i in range(0, 10):
                track = trackList[i]
                if track['track_name'] in biggest:
                    if biggest[track['track_name']] < track['num_streams']:
                        biggest[track['track_name']] = track['num_streams']
                else:
                    biggest[track['track_name']] = track['num_streams']
                print track['track_name']
    sorted_top = sorted(biggest.items(), key=operator.itemgetter(1))
    pp.pprint(sorted_top)

# number of streams per week
def mostPopularWeeks():
    path = 'top/'
    listing = os.listdir(path)
    weeks = {}
    for infile in listing:
        with open('top/' + infile, 'rb') as the_file:
            trackList = json.loads(the_file.read())
        sum_streams = 0
        for i in range(0, 50):
            sum_streams += trackList[i]['num_streams']
        weeks[infile] = sum_streams
    sorted_top = sorted(weeks.items(), key=operator.itemgetter(1))
    pp.pprint(sorted_top)

# change in streams per week for the latest
def tracksLeavingLatest():
    changes = {}
    with open('top/latest.txt', 'rb') as the_file:
        latest = json.loads(the_file.read())
    with open('top/2014-11-16.txt', 'rb') as the_file:
        oldList = json.loads(the_file.read())
    for track in latest:
        changes[track['track_name']] = track['num_streams'] - oldListContains(track['track_name'], oldList)
    sorted_top = sorted(changes.items(), key=operator.itemgetter(1))
    pp.pprint(sorted_top)

# number of weeks on the charts
def mostConsistent():
    path = 'top/'
    listing = os.listdir(path)
    tracks = {}
    for infile in listing:
        with open('top/' + infile, 'rb') as the_file:
            trackList = json.loads(the_file.read())
        for i in range(0, 50):
            track = trackList[i]
            if track['track_name'] in tracks:
                tracks[track['track_name']] += 1
            else:
                tracks[track['track_name']] = 1
    sorted_top = sorted(tracks.items(), key=operator.itemgetter(1))
    pp.pprint(sorted_top)

# biggest negative change from one week to the next
def leastConsistent():
    path = 'top/'
    listing = os.listdir(path)
    tracks = {}
    with open('top/2014-01-05.txt' , 'rb') as the_file:
        oldList = json.loads(the_file.read())
    for infile in range(1, len(listing) - 1):
        print listing[infile]
        with open('top/' + listing[infile], 'rb') as the_file:
            trackList = json.loads(the_file.read())
        for i in range(0, 50):
            track = trackList[i]
            trackName = track['track_name']
            oldStreams = oldListContains(trackName, oldList)
            if oldStreams != 0:
                streamDiff = track['num_streams'] - oldStreams
                if trackName in tracks:
                    if streamDiff < tracks[trackName]:
                        tracks[trackName] = streamDiff
                else:
                    tracks[trackName] = streamDiff
        oldList = trackList
    sorted_top = sorted(tracks.items(), key=operator.itemgetter(1))
    pp.pprint(sorted_top)

getDailyLatest()
customRanking()