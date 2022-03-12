from itertools import combinations
import math
from typing import List, Sequence, Set, Tuple

# Imagine a sky full of stars, represented by a sequence of
# two-dimensional coordinate points. Defining a "boomerang"
# as a set of 3 stars where if lines are drawn from 2 stars to
# the third vertex star, they would be equal length. Given this
# definition, implement the boomerang_count function, which
# computes the count of unique boomerangs that may be
# formed from a provided list of stars.


def get_equidistant_stars(origin_star: Tuple[int, int], stars: Set[Tuple[int, int]]) -> List:
    """gets stars that have at least one other equidistant star to the origin

    Args:
        origin_star (Tuple[int, int]): 
        stars (Set[Tuple[int, int]]): 

    Returns:
        List: list of numbers - each representing a star
    """
    destinations = []
    distances = []
    unique_distances = {}
    for star in stars:
        a = abs(origin_star[0] - star[0])
        b = abs(origin_star[1] - star[1])
        c_squared = a**2 + b**2
        # second test fails without round ...
        # distance is 1.9999999999999998 from star 2 and 2.0 from star 1
        distance = round(math.sqrt(c_squared), 2)
        destinations.append(star)
        distances.append(distance)

        if distance != 0.0:
            if distance not in unique_distances.keys():
                unique_distances[distance] = 1
            else:
                unique_distances[distance] = unique_distances[distance] + 1

    destination_distances = zip(destinations, distances)

    # assigns number to star to get unique combinations later
    boomerang = [i+1 for i, (dest, dist)
                 in enumerate(destination_distances)
                 if dist in unique_distances.keys() and unique_distances[dist] > 1]

    return boomerang


def boomerang_count(stars: Sequence[Tuple[int, int]]) -> int:
    boomerangs = 0
    for star in stars:
        boomerang = get_equidistant_stars(star, stars)
        boomerang_combos = combinations(boomerang, 2)
        boomerangs += sum(1 for _ in boomerang_combos)

    return boomerangs


# *********************************************************
# Example test cases that must pass.
#
# Examples are provided with ASCII art showing their layout
# and the boomerangs listed as the three stars in the
# boomerang with the vertex star listed in the middle.
# *********************************************************
# Simple 3 stars in a row:
# A--B--C.
# Boomerangs: ABC
test_one = boomerang_count((
    (0, 0),
    (1, 0),
    (2, 0),
))
assert test_one == 1
print(test_one)
# Equilateral triangle:
#   A
#  / \
# B---C
# Boomerangs: ABC, ACB, CAB
test_two = boomerang_count((
    (0, 0),
    (1, math.sqrt(3)),
    (2, 0),
))
assert test_two == 3
print(test_two)

# Hub and Spoke:
#    C
#    |
# B--A--D
# Boomerangs: BAC, CAD, BAD, BCD
test_three = boomerang_count((
    (0, 0),
    (-1, 0),
    (0, 1),
    (1, 0),
))
assert test_three == 4
print(test_three)
