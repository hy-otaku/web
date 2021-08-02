class Uploader:

    import requests

    def __init__(self, instance, username, password):

        self.base = 'https://%s/api/v1' %instance

        self.username = username
        self.password = password

        self.access_token = self.get_access()

        print('Uploader initialized. access_token:', self.access_token)

    def get_access(self):

        # GET { client_id, client_secret }
        url = '%s/oauth-clients/local/' %self.base
        local = requests.get(url).json()

        # send a POST req to get the access_token
        url = '%s/users/token' %self.base
        data = {
            'client_id': local['client_id'],
            'client_secret': local['client_secret'],
            'grant_type': 'password',
            'response_type': 'code',
            'username': self.username,
            'password': self.password
        }
        response = requests.post(url, data).json()

        return response['access_token']

    def create_channel(self, arm_name, channel_name):

        # POST 
        url = '%s/video-channels' %self.base

        headers = {
            'Authorization': 'Bearer {0}'.format(self.access_token)
        } 

        data = {
            'displayName': arm_name,
            'name': channel_name
        }

        response = requests.post(
            url, 
            headers=headers, 
            data=data
        ).json()
        
        try:
            return response['videoChannel']['id']
        except:
            return -1

    def upload_video(self, channel_id, video_name, filepath):

        # POST 
        url = '%s/videos/upload' %self.base

        headers = {
            'Authorization': 'Bearer {0}'.format(self.access_token)
        } 

        data = {
            'channelId': channel_id,
            'privacy': '1', # public
            'commentsEnabled': True,
            'name': video_name,
        }

        from mimetypes import guess_type
        file_mime_type = guess_type(filepath)[0]
        print('file_mime_type:', file_mime_type)
        
        with open(filepath, 'rb') as f:
            response = requests.post(
                url,
                headers=headers,
                data=data,
                files={'videofile': (filepath, f, file_mime_type)}
            ).json()

            return response

def upload_from_scratch(instance, username, password, count=30):

    import os

    uploader = Uploader(instance, username, password)
    print('creating uploader for', instance, 'with username:', username, ', password:', password)

    anime_data = [
        {
            'path': 'gurren-lagann',
            'title': 'գուրրեն լագանն'     
        },
        {
            'path': 'xxxholic',
            'title': 'եռիքսահոլիք'
        },
        {
            'path': 'sword-art-online',
            'title': 'թրերի վարպետ օնլայն'
        },
        {
            'path': 'magi',
            'title': 'մագի'
        },
        # {
        #     path: 'makoto-shinkai',
        #     title: 'մակոտո շինկայ',
        #     shorts: True
        # },
        {
            'path': 'nogame-nolife',
            'title': 'չկա խաղ՝ չկա կյանք',
        },
        {
            'path': 'kyoukai-no-kanata',
            'title': 'սահմանից այն կողմ',
        },
        # {
        #     path: 'feature',
        #     feature: True,
        # },
        {
            'path': 'attack-on-titan',
            'title': 'տիտանների գրոհը',
        },
        {
            'path': 'toradora',
            'title': 'տորադորա',
        },
    ]

    for anime in anime_data:
        
        anime_path = '../../../anime/%s' %anime['path']
        channel_name = anime['path'].replace('-', '_')

        print('creating channel «%s» under %s' %(anime['title'], channel_name))
        channel_id = uploader.create_channel(anime['title'], channel_name)
        print('channel id:', channel_id)

        if channel_id == -1:
            print('channel already existed')
            continue

        lst = os.listdir(anime_path)[:count]
        for (index, video) in enumerate(lst):
            num = index > 8 and index + 1 or '0%s' %(index + 1)
            video_name = '%s %s.mp4' %(anime['title'], num)
            print('uploading %s' %video_name)

            video_path = '%s/%s' %(anime_path, video)
            uploader.upload_video(channel_id, video_name, video_path)

def main():

    '''
        instance list:
        » peertube.iriseden.eu

        unable to create an account 
            ( waiting for verification e-mail ):
        » vault.mle.party
        » myfreetube.de

        haven't tried yet:
        » video.ploud.fr

    '''

    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--username')
    parser.add_argument('-p', '--password')
    parser.add_argument('-i', '--instance', default='peertube.iriseden.eu')
    args = parser.parse_args()

    upload_from_scratch(args.instance, args.username, args.password)

if __name__ == '__main__':
    main()