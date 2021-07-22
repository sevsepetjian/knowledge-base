import os
import os
from pathlib import Path

# appends a file to any folder inside the dictionary
def append_file(folders, folder_name, file):
    for k,v in folders.items():
        if k == folder_name:
            folders[folder_name].append(file)
        else:
            for folder in v:
                if isinstance(folder, dict):
                    if folder_name in folder:
                        folder[folder_name].append(file)
                    else:
                        append_file(folder, folder_name, file)

# Creates a data structure for any folder specificed in path
def generate_tree_dict(path='', folders = {}):
    for file in os.listdir(path):
        rel = path + '/' + file
        cur_dir_path = Path(rel)
        if os.path.isdir(rel):
            dir_list = os.listdir(cur_dir_path.parent.absolute())
            # This check assumes that if there is a .md file inside of this folder than it is a subdir. So it creates another dictionary and appends it to the parent dictionary value. Else it creates a normal folder strucutre.
            if any(File.endswith('.md') for File in dir_list):
                append_file(folders, cur_dir_path.parent.name, { file: [] })
                generate_tree_dict(rel, folders)
            else:
                folders[file] = []
                generate_tree_dict(rel, folders)
        else:
            # else is for .md files
            append_file(folders, cur_dir_path.parent.name, file)
    return folders