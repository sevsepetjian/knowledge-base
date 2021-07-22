import os

def find_file(path = '', file_name = ''):
    for root, dirs, files in os.walk(path):
        # select file name
        for file in files:
            # check file name
            if file == file_name:
                # print whole path of files
                return os.path.join(root, file)