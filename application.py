from utils import *
from flask import Flask, render_template, make_response, send_from_directory
import markdown
import os

application = Flask(__name__)

@application.route('/')
def index_page():
    path = os.path.dirname(os.path.abspath(__file__)) + '/categories'
    categories = generate_tree_html.generate_tree_html(path)

    return render_template('index.html', categories = categories)

@application.route('/article/<filename>')
def article_page(filename):
    path = os.path.dirname(os.path.abspath(__file__)) + '/categories'
    categories = generate_tree_html.generate_tree_html(path)
    file_path = find_file.find_file(path, filename + '.md')

    with open(file_path, 'r') as input_file:
        text = input_file.read()

    html = markdown.markdown(text)
    
    return render_template('article.html', html = html, categories = categories)

@application.route('/sw.js')
def sw():
    response = make_response(
        send_from_directory('static', path = 'sw.js')
    )

    response.headers['Content-Type'] = 'application/javascript'

    return response

if __name__ == 'main':
    application.run(debug = True)
