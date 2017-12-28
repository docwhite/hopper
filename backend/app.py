import os
import sys
import traceback

PRODUCTION = bool(int(os.getenv("PRODUCTION", "1")))

if PRODUCTION:
    sys.path.append('./dependencies')
    sys.path.append('./dependencies/MarkupSafe-1.0')
    sys.path.append('./dependencies/itsdangerous-0.24')
    sys.path.append('./dependencies/RandomWords-0.2.1')
    # TODO add Flask Cache here too.
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

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

@app.route('/')
def index():
    return render_template('index.html')

@cache.cached()
def backend_data():
    return generator.generate()

@app.route('/data')
def data():
    limit = request.args.get('limit', '25')
    limit = int(limit) if limit != '-' else -1
    page = int(request.args.get('page', 0))
    query = request.args.get('query', '')

    result = backend_data()

    if query != '':
        try:
            result = filter(lambda x : eval(query), result)
        except Exception as e:
            msgs = traceback.format_exc().split('\n')
            cutter = filter(lambda x : 'File "<string>", line 1' in x, msgs)

            if not len(cutter):
                raise InvalidUsage(msg, status_code=420)

            cutter = cutter[0]
            index = msgs.index(cutter)

            msg = '<br>'.join(msgs[index:])
            msg = msg.replace(' ', '&nbsp;')
            raise InvalidUsage(msg, status_code=410)

    if limit != -1:
        result = result[(limit * (page-1)):(limit * (page+1))]

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=bool(not PRODUCTION))

