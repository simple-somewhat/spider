import random
import numpy as np


slide_track = {
                80: [[-47, -44, 0], [0, 0, 0]],
                123: [[-43, -31, 0], [0, 0, 0]]
}


def get_generate_tracks(distance):
    distance += 20
    tracks = [0]
    offsets = [0]
    seconds = random.randint(2, 4)
    for t in np.arange(0.0, seconds, 0.1):
        offset = round((1 - pow((t/seconds), 4))*distance)
        tracks.append(offset - offsets[-1])
        offsets.append(offset)
    tracks.extend([-3, -2, -3, -2, -2, -2, -2, -1, -0, -1, -1, -1])
    return tracks

# print(get_generate_tracks(135))
