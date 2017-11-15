import os
import sys

from flask import Flask, render_template, jsonify

from generator import generator

PRODUCTION = bool(int(os.getenv("PRODUCTION", "1")))

if PRODUCTION:
    sys.path.append('./dependencies')
    STATIC = os.path.dirname(__file__)
else:
    STATIC = os.path.abspath(
        os.path.join(os.path.dirname(__file__), '..', 'public')
    )

print PRODUCTION
print STATIC

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

