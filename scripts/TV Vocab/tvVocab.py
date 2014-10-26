import nltk
import os
from nltk.corpus import PlaintextCorpusReader
import operator

import json
length = 80000
shows = {}

def uniqueWords(text):

    return len(set(text))

def analyzeShow(root):
    corpus_root = root
    wordlists = PlaintextCorpusReader(corpus_root, '.*\.txt')
    words = wordlists.words()
    if(len(words) < length):
        print "Need more words for", root
    words = words[0:length]
    shows[root] = uniqueWords(words)
    print root

for root in os.walk(".").next()[1]:
    analyzeShow(root)

print json.dumps(sorted(shows.items(), key=operator.itemgetter(1)))


