# Final Mark ML Prediction
#### *Fullstack ML Project*
 
 
## Description

This is a fullstack machie learning project consisting of:
* **Machine Learning Model** - This is in the notebooks folder. I used a pre-existing [dataset from Kaggle](https://www.kaggle.com/uciml/student-alcohol-consumption) about some students'marks in relation to many factors including age, gender, test 1 and most interestingly, alcohol consumption. I trained a model though sklearn's linear regression algorithm to estimate their final exam mark based on severalfactors. This model was then saved in a .pickle file to use in the backend Flask server.

* **Flask API** - A python backend server app with an API route that accepts an array input then uses a pre-defned prediction model to return a single final exam mark.

* **React Client Web App** - This client consumes the Flask API by sending it some inputs from the user then receiving an estimate of that student's final mark according to the parameters supplied.
