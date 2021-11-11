# Final Project Prospectus

Topic: Data Privacy Threats— Which groups are the most vulnerable? (Narrative)

## Datasets and Variables

Pews Resarch— Cybersecurity Survey (March 30th—May 3rd, 2016)
usState.json —to draw U.S. Map

"secur" — federated data breach variable
"age" — age
"income" — income
"race" — race
"state" — state (need to merge with state code)


## Site Layout

The narrative discusses the importance of data privacy and which groups are more likely to fall victim to data privacy threats. The conclusion points toward measures taken toward better policy to protect individuals' data privacy.

Section 1: What is data privacy
Section 2: Why is data privacy important?
Section 3: Which groups are most vulnerable to data privacy threats?
            Map (Data breaches by state)
            Scatterplot (Data breaches by age, income)
            Bar Char (Data breaches by race)
Section 4: Analysis and Discussion
Section 5: Conclusion


## Interactive Data Elements

Map:
x — state
y — average number of data breaches per individual within state (colorscale)
Tooltip — y value, and also percent of national total data breaches within state

Scatterplot:
x — income, age (continuous variables)
y — number of data breaches for individuals 

Bar Chart:
x — race (categorical, buckets)
y — percent population that has experienced data breaches, break down by major versus minor data breaches

# Data transformations/ analysis

from "secur"
            -> # data breaches per individual (already available) (federated variable secur)
            —> mean # of data breaches for individual by state
            -> % of national total data breaches by state
            -> total number of data breaches per state
            -> % of total data breaches by race
            


