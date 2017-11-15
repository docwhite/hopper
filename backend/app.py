import os
import sys

PRODUCTION = bool(int(os.getenv("PRODUCTION", "1")))

if PRODUCTION:
    sys.path.append('./dependencies')
    sys.path.append('./dependencies/MarkupSafe-1.0')
    sys.path.append('./dependencies/itsdangerous-0.24')
    sys.path.append('./dependencies/RandomWords-0.2.1')
    STATIC = os.path.dirname(__file__)
else:
    STATIC = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'public')
    )

from flask import Flask, render_template, jsonify
from generator import generator

app = Flask(__name__)
app._static_folder = STATIC

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    result = generator.generate()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=bool(not PRODUCTION))

