from flask import Flask, render_template
import markdown
import os

app = Flask(__name__)

root_dir = os.path.dirname(os.path.abspath(__file__)) + '/categories'
# https://stackoverflow.com/questions/41113929/generate-an-html-directory-tree-in-python
def generate_tree(path, folders = {}, current_dir = ''): 
    for file in os.listdir(path):
        rel = path + '/' + file
        if os.path.isdir(rel):
            current_dir = file
            folders[file] = []
            generate_tree(rel, folders, current_dir)
        # elif os.path.isdir(path + '/' + current_dir) and current_dir != '':
        #     print(current_dir)
        #     current_dir = file
        #     generate_tree(rel, folders, current_dir)
        else:
            folders[current_dir].append(file)
            current_dir = file
    return folders

print(generate_tree(root_dir, {}, ''))

@app.route('/')
def home_page():
    with open(root_dir + './computer-science/cs.md', 'r') as input_file:
        text = input_file.read()
    html = markdown.markdown(text)
    
    return render_template('index.html', name='Sevag', html = html)

if __name__ == 'main':
    app.run(debug = True)