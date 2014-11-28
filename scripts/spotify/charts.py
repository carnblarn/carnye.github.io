import urllib2
import sys
import json
import pprint
import operator
import time

req = urllib2.Request('http://charts.spotify.com/api/tracks/most_viral/global/daily')
try:
    response = urllib2.urlopen(req)
    obj = json.loads(response.read())
except:
    print "Failed to open page"

pp = pprint.PrettyPrinter(indent=4)
pp.pprint(obj)

trackList = {}
def getWeeksSpent():
    req = urllib2.Request('http://charts.spotify.com/api/tracks/most_viral/global/daily/latest')
    try:
        response = urllib2.urlopen(req)
        dates = json.loads(response.read())['tracks']
    except:
        print "Failed to open page"
    # for date in dates:
    #     req = urllib2.Request('http://charts.spotify.com/api/tracks/most_viral/global/daily/' + date)
    #     response = urllib2.urlopen(req)
    #     tracks = json.loads(response.read())
    #     pp.pprint(tracks)
    #     # with open(  "top/" + date + ".txt", 'wb') as outfile:
    #     #     outfile.write(json.dumps(tracks))
    #     count = 1
    #     # for track in tracks:
    #     #     trackName = track['track_name'] + ' - ' + track['artist_name']
    #     #     print count + ". " + trackName
    #     #     count +=1
    for track in tracks:
        print track['track_name']
getWeeksSpent()

sorted_x = sorted(trackList.items(), key=operator.itemgetter(1))
pp.pprint(sorted_x)