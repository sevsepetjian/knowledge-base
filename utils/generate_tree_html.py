import os
from pathlib import Path

def generate_tree_html(path, html = ''):
   # path = Path(__file__).parent.parent
   # full_path = str(path) + '/categories'

    for file in os.listdir(path):
        # go through each subdir and file in folder. If its dir recursive call, else its .md continue
        rel = path + '/' + file
        file_no_md = file.replace('.md', ' ')
        file_title_name = str.title(file_no_md.replace('-', ' '))
        if os.path.isdir(rel):
            html += "<div class='child'><h1>%s</h1>" % (file_title_name)
            html += generate_tree_html(rel)
            html += "</ul></div>"
        else:
            html += "<ul><li><a href='/article/%s'>%s</a></li>" % (file_no_md, file_title_name)
    return html
