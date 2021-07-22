import os
from pathlib import Path

def generate_tree_html(path, html = ''):
    for file in os.listdir(path):
        # go through each subdir and file in folder. If its dir recursive call, else its .md continue
        rel = path + '/' + file
        file_no_md = file.replace('.md', ' ')
        file_title_name = str.title(file_no_md.replace('-', ' '))
        if os.path.isdir(rel):
            html += "<p class='menu-label'>%s</p>" % (file_title_name)
            html += generate_tree_html(rel)
            html += "</ul>"
        else:
            html += "<ul class='menu-list'><li><a href='/article/%s'>%s</a></li>" % (file_no_md, file_title_name)
    return html
