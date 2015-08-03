import math
from math import sqrt
import csv

def confidence(ups, downs):
    n = ups + downs

    if n == 0:
        return 0

    z = 1.96 #1.44 = 85%, 1.96 = 95%
    phat = float(ups) / n
    return ((phat + z*z/(2*n) + z * sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n)) - ((phat + z*z/(2*n) - z * sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n))


ups = 1000
downs = 100
userWeight = 1
confidenceAtVote =  confidence(4, 10)
print confidenceAtVote

# print (.85 - confidence(ups, downs)) * (ups - downs)  / 50

print userWeight + 1.0/(userWeight *2 ) * ((.85 - confidence(ups, downs))/.85 * math.sqrt(ups - downs)  / 20) *  (confidenceAtVote)
vals = []

for num in range(1, 100):
    confidenceAtVote = confidence(num, num)
    vals.append(1.0/(userWeight *2 ) * ((.85 - confidence(ups, downs))/.85 * math.sqrt(ups - downs)  / 20) *  (confidenceAtVote))
    print 1.0/(userWeight *2 ) * ((.85 - confidence(ups, downs))/.85 * math.sqrt(ups - downs)  / 20) *  (confidenceAtVote)

with open('vals.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',',quoting=csv.QUOTE_MINIMAL)
    spamwriter.writerow(vals)