import os
from flask import Flask, render_template, jsonify

STATIC = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'public')
)

app = Flask(__name__)
app._static_folder = STATIC

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    result = [
        {'name': "Ramon", 'surname': "Blanquer", 'age': 22},
        {'name': "Neus", 'surname': "Blanquer", 'age': 17},
        {'name': "Maite", 'surname': "Ruiz", 'age': 47}
    ]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
