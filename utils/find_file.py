import os

def find_file(path = '', file_name = ''):
    for root, dirs, files in os.walk(path):
        # select file name
        for file in files:
            # check the extension of files
            if file == file_name:
                # print whole path of files
                return os.path.join(root, file)