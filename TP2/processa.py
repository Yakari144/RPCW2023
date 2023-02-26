from bs4 import BeautifulSoup

def separaArqs(fn):
    f = open(fn, 'r')
    txt=f.read()
    soup = BeautifulSoup(txt,features="lxml")
    i = 1
    for tag in soup.find_all('arqelem'):
        #send all the content to a new file
        newF = open('xmls/arq' + str(i) + '.xml', 'w')
        newF.write(tag.prettify())
        i += 1

if __name__ == '__main__':
    separaArqs('arq.xml')



