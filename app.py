from flask import Flask, render_template
import markdown
import os

app = Flask(__name__)
root_dir = os.path.dirname(os.path.abspath(__file__))
for subdir, dirs, files in os.walk(root_dir + '/categories'):
    for sub in dirs:
        print(sub)
    for file in files:
        print(file)
# sub_dir = os.listdir(root_dir + '/categories')
# for file in sub_dir:
#     print(os.listdir(root_dir + '/categories/' + file))
@app.route('/')
def home_page():
    with open(root_dir + './README.md', 'r') as input_file:
        text = input_file.read()
    html = markdown.markdown(text)
    
    return render_template('index.html', name='Sevag', html = html)

if __name__ == 'main':
    app.run(debug = True)