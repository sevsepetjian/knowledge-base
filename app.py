from flask import Flask, render_template
from pathlib import Path
import markdown
import os

app = Flask(__name__)

root_dir = os.path.dirname(os.path.abspath(__file__)) + '/categories'

def append_file(folders, folder_name, file):
    for k,v in folders.items():
        if k == folder_name:
            print(folder_name)
            folders[folder_name].append(file)
        else:
            for folder in v:
                if isinstance(folder, dict):
                    if folder_name in folder:
                        folder[folder_name].append(file)
                    else:
                        append_file(folder, folder_name, file)

def generate_tree(path, folders = {}): 
    for file in os.listdir(path):
        rel = path + '/' + file
        cur_dir_path = Path(rel)
        if os.path.isdir(rel):
            dir_list = os.listdir(cur_dir_path.parent.absolute())
            if any(File.endswith('.md') for File in dir_list):
                append_file(folders, cur_dir_path.parent.name, { file: [] })
                generate_tree(rel, folders)
            else:
                folders[file] = []
                generate_tree(rel, folders)
        else:
            append_file(folders, cur_dir_path.parent.name, file)
    return folders

print(generate_tree(root_dir, {}))

folders = {
    'computer-science': ['cs.md'], 
    'philosophy': [{'jungian': [{ 'freudian': [] }]}, 'tes.md', {'jungin': []}]
}


@app.route('/')
def home_page():
    with open(root_dir + './computer-science/cs.md', 'r') as input_file:
        text = input_file.read()
    html = markdown.markdown(text)
    
    return render_template('index.html', name='Sevag', html = html)

if __name__ == 'main':
    app.run(debug = True)