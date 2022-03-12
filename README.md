# Software Engineer Take Home Exercise
### An Evaluation of Software Engineering Habits and Skills for Rightfoot

## Instructions
This evaluation is meant to highlight your coding and analytical thinking skills. Your efforts
will be evaluated on the basis of correctness, style, runtime and space complexity, effective
use of data structures and algorithms, and command of selected programming languages.

This evaluation should take about 1-2 hours to complete, but no longer than 3. You are
prohibited from utilizing any materials beyond the content in this challenge, online or
offline, to assist your completion of it. With exception you may employ online static
resources for the code review, which on a basis of trust we expect you to only use outside
resources for that task.

Upon completion, upload your take home exercise via the personalized Greenhouse link
Testee
### *Scott Long*

## About Us
Rightfoot is a platform providing debt management and repayment solutions. We are an
agile company developing decoupled client applications backed by an API service mesh in
a Kubernetes environment. We are excited to develop applications as we develop talent
and strong teams.
Visit our public site at https://rightfoot.com.

## Open Ended Questions

### var, let, const

What is an appropriate use of the ECMAScript keywords var, let, and const. Explain why you
might or might not use each, and why they provide the desired behavior. Examples are
welcome but not required.
''

### Improvements to Your Preferred Language
What are 3 nuances, missing features, or personal anti-patterns in your preferred language
(selected from TypeScript, Python, Go, Java, or C++)? Explain why they are undesirable.
Explain your understanding of why your preferred language behaves the way it currently
does and has not, or will not, implement your desired change.
''

## Code Review

Please review the following code for improvements to clarity, style, correctness, etc. Justify
the suggestions or changes requested.

The following code is client TypeScript code based on our application’s code to compute the
balances for a user’s student loans over time based on interest accrued, and monthly
payments made.

You may choose what manner you wish to perform the review. You may make comments
inline in this document or in an online review product, such as a GitHub repository Pull
Request with comments.

[code review]()
[refactored code](computeStudentLoan.ts)

Coded Data Structures & Algorithms Problem
Code a solution to the following problem, coding for the optimal space and runtime
complexity. You may select from any of the following languages: TypeScript, Python, Go,
Java, or C++. You are permitted to submit the code inline in this document, or as a link to
another online source, such as GitHub (gist or repo), Codeshare.io, etc. The written code
must satisfy the provided test cases. Provide additional test cases that prove the
completeness of the solution if appropriate, with explanation of the value of those test
cases. The function prototype is provided in Python but can be modified as appropriate to
the selected language. If there are additional assumptions you make based on absence of
information or clarity in the prompt, please declare them. Style, including comments and
documentation patterns, counts.
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
( 0, 0),
(-1, 0),
( 0, 1),
( 1, 0),
)) == 4