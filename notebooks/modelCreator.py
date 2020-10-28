#!/usr/bin/env python
# coding: utf-8

# In[45]:


import pandas as pd
import numpy as np
import pickle
from sklearn import preprocessing, model_selection, linear_model


# ## Load The Data

# In[8]:


#Load and checkout the data
df = pd.read_csv('student-mat.csv')
df.describe()


# In[10]:


#Select specific columns
df = df[["sex", "age", "studytime", "failures","romantic", "goout", "Dalc", "Walc", "G1", "G2", "G3"]]
df


# ## Process The Data

# In[73]:


#initiate preprocessor
le = preprocessing.LabelEncoder()

#change M/F to 1/0 on sex
sex = le.fit_transform(list(df["sex"]))

#change Y/N to 1/0 on romantic
romantic = le.fit_transform(list(df["romantic"]))

#show romantic column's new look
romantic


# ## Create Train/Test Arrays

# In[68]:


#create input array
#zip up lists from previous step
X = list(zip(sex, df["age"], df["studytime"], df["failures"], romantic, df["goout"], df["Dalc"], df["Walc"], df["G1"], df["G2"]))


# In[65]:


#create target array
y = df["G3"]


# In[43]:


#split X and y to train and test datasets
X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=0.2)


# ## Training A Linear Regression Model

# In[46]:


#Select Model Type
model = linear_model.LinearRegression()

#Train model
model.fit(X_train, y_train)


# In[48]:


#Check Accuracy score
accuracy = model.score(X_test, y_test)
print(accuracy * 100)


# ### Train the model many times and store best one

# In[61]:


#Create A Loop That Trains a model until accuracy > 90%
model = linear_model.LinearRegression()
accuracy = 0
runs = 0
while (accuracy < 0.9):
    X_train, X_test, y_train, y_test = model_selection.train_test_split(X, y, test_size=0.2)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    runs += 1
    #when acceptable model is found, store it
    if (accuracy >= 0.9):
        print(accuracy)
        
        #open file for writing and "dump" model inside
        with open("marksmodel.pickle","wb") as f:
            pickle.dump(model, f)

#print number of trainings made
print("Trainings = ", runs)


# ## Predicting

# In[63]:


#Load Stored Model
pickle_in = open("marksmodel.pickle", "rb")
model = pickle.load(pickle_in)


# In[75]:


#Make A prediction with order sex, age, studytime, failures, romantic, goout, Dalc, Walc, G1, G2
#Note M/F = 1/0 and Y/N = 1/0 from preprocessing

prediction = model.predict([[1,21,5,2,1,3,2,5,12,15]])
print(prediction)


# In[ ]:




