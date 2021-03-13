def enumerate_to_file(dirname, data):

    filename = '%s/enumeratedData.js' %dirname

    import pprint
    output = pprint.pformat(data)
    with open(filename, 'w') as file:
        file.write(
            'export default %s' %output
        )

'''
    enumerates all the animes, and writes the outcome a JS file
    note: need to update the list of channels in line 49
'''
def get_anime():

    import requests

    '''
        this function expects to receive a channel name
        and enumerates all the embed urls to the videos in the channel
    '''
    def get(name, elaborate = False):
        
        instance = 'peertube.interhop.org'
        type = 'video-channels'
        what = 'videos'

        url = 'https://%s/api/v1/%s/%s/%s?count=25&sort=name' %(instance, type, name, what)

        r = requests.get(url)
        json = r.json()

        if json['total'] > 25:
            # assume channel contains 25 videos in total by default, and re-compute if necessary
            url = 'https://%s/api/v1/%s/%s/%s?count=%s&sort=name' %(instance, type, name, what, json['total'])
                
            r = requests.get(url)
            json = r.json()

        videos = [ 
            { 
                'name': item['name'], 
                'url': 'https://%s%s' %(instance, item['embedPath']),
            } if elaborate else
            'https://%s%s' %(instance, item['embedPath'])
        for item in json['data'] ]

        return videos

    data = {}
    for channel in ['toradora', 'xxxholic', 'attack_on_titans', 'magi', 'no_game_no_life', 'gurren_lagann', 'sword_art_online', 'kyoukai_no_kanata']:
        data[channel] = get(channel)

    for channel in ['feature', 'shorts']:
        data[channel] = get(channel, True)

    enumerate_to_file('anime', data)

'''
    enumerates all the mangas, and writes the outcome a JS file
'''
def get_manga():

    import os

    def get_volumes(volumes, manga_path, extra_path, prefix):

        def get_url(path, img=''):

            short_path = path.replace(extra_path, '')
            ans = img and '%s/%s/%s' %(prefix, short_path, img) or '%s/%s' %(prefix, short_path)
            return ans.replace('///', '/')

        ans = {}
        
        for volume in volumes:

            ans[volume] = {}

            volume_path = '%s/%s' %(manga_path, volume)

            if os.path.isfile(volume_path):
                # for now, assume it's the cover for the manga
                ans['cover'] = get_url(volume_path)
                continue
            
            chapters = os.listdir(volume_path)
            chapters.sort()

            for chapter in chapters:

                path = '%s/%s' %(volume_path, chapter)

                if os.path.isfile(path):
                    # for now, assume it's the cover for the volume
                    ans[volume]['cover'] = get_url(path)
                    continue
                
                imgs = os.listdir(path)
                imgs.sort()
                
                ans[volume][chapter] = [ get_url(path, img) for img in imgs]
        
        return ans

    '''
        this function expects to receive a dir that includes separate dirs for each manga
        
        1. 
        
        a manga has to either contain directories for volumes, xor directories for submangas.

        for example, 
            hellsing / { dawn, main } 
            death-note / { 01, 02, 03 }

        a submanga has to contain directories for volumes

        2. 

        a manga cannot contain a cover for now
        a sumbanga or a volume can contain a cover

    '''
    def get_mangajson(root, extra_path, prefix=''):

        ans = {}

        for manga in os.listdir(root):

            if manga == '.git':
                continue

            manga_path = '%s/%s' %(root, manga)
            lst = os.listdir(manga_path)

            volumes = [item for item in lst if item.isnumeric()]
            submangas = [item for item in lst if not item.isnumeric()]

            ans[manga] = {}
            if len(submangas) == 0:
                volumes.sort()
                ans[manga]['volumes'] = get_volumes(volumes, manga_path, extra_path, prefix)
            else:
                for submanga in submangas:
                    submanga_path = '%s/%s' %(manga_path, submanga)
                    ans[manga][submanga] = {}
                    sub_volumes = os.listdir(submanga_path)
                    ans[manga][submanga]['volumes'] = get_volumes(sub_volumes, submanga_path, extra_path, prefix)

        return ans

    root = '../../../manga-data'
    data = get_mangajson(root, root, 'https://raw.githubusercontent.com/high-otaku/manga-data/master')
    enumerate_to_file('manga', data)

def main():
    get_anime()
    get_manga()

if __name__ == '__main__':
    main()