from flask import Flask, jsonify, request
import pickle
import numpy as np
from flask_cors import CORS

#load model from file
pickle_in = open("marksmodel.pickle", "rb")
model = pickle.load(pickle_in)

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def test():
    return "Service Working!"

@app.route('/predict', methods=['POST'])
def predict():
    #change request body to json
    data = request.get_json(force=True)

    #parse values from string to int
    predict_request = [int(data["sex"]), int(data["age"]), int(data["studytime"]), int(data["failures"]), int(data["romantic"]), int(data["goout"]), int(data["Dalc"]), int(data["Walc"]), int(data["G1"]), int(data["G2"]),]

    #convert request to a proper np array that can be understood by predicter
    predict_request = np.array([predict_request])

    # Make A prediction with order sex, age, studytime, failures, romantic, goout, Dalc, Walc, G1, G2
    prediction = model.predict(predict_request)

    return jsonify(prediction[0])


if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8080, debug=True)
    app.run(port=5000, debug=True)
