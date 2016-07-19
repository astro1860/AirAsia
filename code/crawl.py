from __future__ import print_function
import pdb
import xml.etree.ElementTree as ET
from datetime import datetime


#tree = ET.parse('data/xml_crawl/JakartaCentral_1.xml')
#tree = ET.parse('data/xml_crawl/JakartaSouth_1.xml')
tree = ET.parse('data/xml_crawl/Ulaanbaatar.xml')
#tree = ET.parse('data/xml_crawl/chengdu.xml')

root_1 = tree.getroot()
print ("date", "concentration", sep=',')
# we need to locate to <channel>
for channel in root_1:
	for item in channel.findall('item'):
		time_text = item.find('title').text
		time = datetime.strptime(time_text, '%Y-%m-%d %H:%M:%S') #except shenyang
		#time = datetime.strptime(time_text, '%m/%d/%Y %I:%M:%S %p').strftime("%Y-%m-%d %H:%M:%S") #nur for shenyang=!!
		conc = int(float(item.find('Conc').text))
		#print time, conc
		print(time, conc,sep=',')


# print "check point"
