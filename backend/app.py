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

from flask import Flask, render_template, jsonify, request
from flask.ext.cache import Cache
from generator import generator

app = Flask(__name__)
app._static_folder = STATIC
cache = Cache(config={'CACHE_TYPE': 'simple'})
cache.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

@cache.cached(timeout=50)
def backend_data():
    return generator.generate()

@app.route('/data')
def data():
    limit = int(request.args.get('limit', 25))
    page = int(request.args.get('page', 0))
    print("Request: %s" % (request.args.get('limit', 69)))
    result = backend_data()
    result = result[(limit * (page-1)):(limit * (page+1))]
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=bool(not PRODUCTION))

