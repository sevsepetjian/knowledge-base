import os

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

def generate_tree_dict(path='', folders = {}):
    path = os.path.dirname(os.path.abspath(__file__)) + '/categories'
    for file in os.listdir(path):
        rel = path + '/' + file
        cur_dir_path = Path(rel)
        if os.path.isdir(rel):
            dir_list = os.listdir(cur_dir_path.parent.absolute())
            if any(File.endswith('.md') for File in dir_list):
                append_file(folders, cur_dir_path.parent.name, { file: [] })
                generate_tree_dict(rel, folders)
            else:
                folders[file] = []
                generate_tree_dict(rel, folders)
        else:
            append_file(folders, cur_dir_path.parent.name, file)
    return folders