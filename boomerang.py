import math
from typing import Sequence, Tuple


# Imagine a sky full of stars, represented by a sequence of
# two-dimensional coordinate points. Defining a "boomerang"
# as a set of 3 stars where if lines are drawn from 2 stars to
# the third vertex star, they would be equal length. Given this
# definition, implement the boomerang_count function, which
# computes the count of unique boomerangs that may be
# formed from a provided list of stars.
def boomerang_count(stars: Sequence[Tuple[int, int]]) -> int:
    pass


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
assert boomerang_count((
    (0, 0),
    (1, 0),
    (2, 0),
)) == 1

# Equilateral triangle:
# A
# / \
# B---C
# Boomerangs: ABC, ACB, CAB
assert boomerang_count((
    (0, 0),
    (1, math.sqrt(3)),
    (2, 0),
)) == 3

# Hub and Spoke:
# C
# |
# B--A--D
# Boomerangs: BAC, CAD, BAD, BCD
assert boomerang_count((
    (0, 0),
    (-1, 0),
    (0, 1),
    (1, 0),
)) == 4
