import requests
import os

class Downloader:

    def __init__(self, manga_url, dest):

        self.manga_url = manga_url
        self.dest = dest

        print('Downloader initialized. Url: %s, Destination: %s.' %(self.manga_url, self.dest))

    def download(self, url, filename):

        # set stream to True, this will return the stream content.
        r = requests.get(url, stream = True)

        if not r.status_code == 200:
            print('image %s failed to be retrieved.' %url)
            return

        # set decode_content value to True, 
        # otherwise the downloaded image file's size will be zero.
        r.raw.decode_content = True
        print('loaded img to %s' %filename)
        
        with open(filename,'wb') as f:
            import shutil
            shutil.copyfileobj(r.raw, f)

    def get_pages(self, url):

        html = requests.get(url).text

        from bs4 import BeautifulSoup
        parsed_html = BeautifulSoup(html, features='html.parser')

        # the filterings are catered to the wmanga.ru website
        # .find('center') extracts the html within <center /> tags
        # .findAll('a') extracts all <a /> tags
        pages = parsed_html.body.find('center').findAll('a', {'class': 'gallery'})
        # extract and return the hrefs
        return [el.get('href') for el in pages]

    def download_chapter(self, url, dest):

        print('downloading the chapter from %s to %s.' %(url, dest))
   
        os.mkdir(dest)
        
        for page_url in self.get_pages(url):
            page_num = page_url.split('-')[-1]
            filename = '%s/%s' %(dest, page_num)
            self.download(page_url, filename)

    def download_volume(self, vol, first, count):

        vol_url = '%s/%s' %(self.manga_url, self.get_num(vol))
        vol_dir = '%s/%s' %(self.dest, self.get_num(vol))

        print('downloading the volume %s into folder %s.' %(vol, vol_dir))
        
        os.mkdir(vol_dir)

        for chapter in range(first, first + count):
            chapter_url = '%s/%s' %(vol_url, self.get_num(chapter))
            chapter_dir = '%s/%s' %(vol_dir, self.get_num(chapter))
            self.download_chapter(chapter_url, chapter_dir)

    def get_num(self, num):

        if num > 9:
            return num
        else:
            return '0%s' %num

def main():

    '''
        sample arguments run with:
        `
            --manga death_note --volume 1 --first-chapter 1 --chapter-count 7
        `

        may need to install:
            requests: `pip install requests`
            bs4: `pip install bs4`

    '''

    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('-d', '--destination', default='../../../manga-wip')
    parser.add_argument('-m', '--manga')
    parser.add_argument('-v', '--volume', type=int)
    parser.add_argument('-f', '--first-chapter', type=int)
    parser.add_argument('-c', '--chapter-count', type=int)
    
    args = parser.parse_args()

    manga_url = '%s/%s' %('http://wmanga.ru/starter/manga_chapter', args.manga)
    destination = '%s/%s' %(args.destination, args.manga.replace('_', '-'))

    downloader = Downloader(manga_url, destination)
    downloader.download_volume(args.volume, args.first_chapter, args.chapter_count)

if __name__ == '__main__':
    main()