import os
import random
from flask import Flask, render_template, jsonify
from random_words import RandomNicknames, RandomWords, RandomEmails

STATIC = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'public')
)

app = Flask(__name__)
app._static_folder = STATIC

def generateData():
    result = []
    for i in xrange(100):
        gender = 'f' if random.randint(0, 1) == 0 else 'm'
        result.append({
            'id': i,
            'name': RandomNicknames().random_nick(gender=gender),
            'age': random.randint(0, 90),
            'hobby': RandomWords().random_word()
        })

    return result

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def data():
    result = generateData()
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
