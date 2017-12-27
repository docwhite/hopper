"""Place all the data you want to present to the web frontend in this file, the
generate() function has to return a list of python dictionaries of the
following form:

    [
        {'id': 0, 'name': 'Ramon', 'age': 22, 'hobby': 'coding'},
        {'id': 1, 'name': 'Neus', 'age': 17, 'hobby': 'cooking'},
        ...
    ]

"""

import random

from random_words import RandomNicknames, RandomWords

def generate():
    print("Generating!")
    result = []
    for i in xrange(500):
        gender = 'f' if random.randint(0, 1) == 0 else 'm'
        result.append({
            'id': i,
            'name': RandomNicknames().random_nick(gender=gender),
            'age': random.randint(0, 90),
            'hobby': RandomWords().random_word()
        })

    return result
