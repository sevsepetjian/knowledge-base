from flask import Flask, render_template
import markdown
import os

app = Flask(__name__)

root_dir = os.path.dirname(os.path.abspath(__file__)) + '/categories'
# https://stackoverflow.com/questions/41113929/generate-an-html-directory-tree-in-python
def generate_tree(path, folders = {}): 
    for file in os.listdir(path):
        rel = path + '/' + file
        if os.path.isdir(rel):
            print(file)
            generate_tree(rel)
        else:
            print(file)
    return folders

print(generate_tree(root_dir))
# dict = {}
# dict['first_name'] = 'Sevag'
# dict['last_name'] = 'Sepetjian'
# dict['arr'] = []
# dict['arr'].append('Appeneded')
# print(dict)

# dict = {
#     'computer-science': 'cs.md',
#     'philosophy': [
#         { 'jungian': ['jungian.md'] },
#         'philosophy.md'
#     ]
# }

# dict['computer-science'] = 'python.md'

# print(dict)
# for items in dict:
#     print(items)

# for path, dirs, files in os.walk(root_dir):
#     for dir in dirs:
#         for file in os.listdir(path + '/' + dir):
#             print(file)
@app.route('/')
def home_page():
    with open(root_dir + './computer-science/cs.md', 'r') as input_file:
        text = input_file.read()
    html = markdown.markdown(text)
    
    return render_template('index.html', name='Sevag', html = html)

if __name__ == 'main':
    app.run(debug = True)