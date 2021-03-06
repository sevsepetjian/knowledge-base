import os
from pathlib import Path

def generate_tree_html(path, html = ''):
    for file in os.listdir(path):
        # go through each subdir and file in folder. If its dir recursive call, else its .md continue
        rel = path + '/' + file
        file_no_md = file.replace('.md', ' ')
        file_title_name = str.title(file_no_md.replace('-', ' '))
        cur_dir_path = Path(rel)
        dir_list = os.listdir(cur_dir_path.parent.absolute())
        if os.path.isdir(rel):
            html += "<div class='menu-item-container'><div class='menu-container'><p class='menu-label'>%s</p><i class='fas fa-chevron-right'></i></div><ul id='%s' class='menu-list is-hidden'>" % (file_title_name, file_no_md)
            html += generate_tree_html(rel)
            html += "</ul></div>"
        else:
            html += "<li><a class='menu-item' href='/article/%s'>%s</a></li>" % (file_no_md, file_title_name)
    return html
