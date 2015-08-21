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
    content = json.loads(urllib2.urlopen("http://charts.spotify.com/api/tracks/most_streamed/global/weekly").read())
    content = content[1:]
    numStreams = []
    mapping = {}
    for date in content:
    	print date
    	if date == "2013-09-15":
    		break
    	track = json.loads(urllib2.urlopen("http://charts.spotify.com/api/tracks/most_streamed/global/weekly/" + date).read())['tracks'][0]
    	print track['track_name'], track['num_streams']
    	numStreams.append(track['num_streams'])
    	mapping[track['num_streams']] = {'album': track['artwork_url'], 'artist': track['artist_name'], 'track': track['track_name']}
    	print(mapping)
    print numStreams
    # with open('dailyTop/latest.txt', 'wb') as write_file:
        # json.dump(content['tracks'], write_file)

getDailyLatest()

# print json.loads(urllib2.urlopen("http://charts.spotify.com/api/tracks/most_streamed/global/weekly/" + "2013-09-15").read())['tracks']