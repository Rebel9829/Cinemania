from flask import request, json, Flask
import pandas as pd
import pymongo
from fuzzywuzzy import process
from flask_cors import CORS
import Movie_recommendation_code as file1
import ast

app=Flask(__name__)
CORS(app)
client = pymongo.MongoClient("mongodb+srv://admin-harshit:alumni30@alumniportal.2aiihq6.mongodb.net/cinemania?retryWrites=true&w=majority")
dataset_collection=client['cinemania']['dataset']
dataset_list=list(dataset_collection.find())
df=pd.DataFrame(dataset_list)

pre_dataset_collection=client['cinemania']['pre_dataset']
pre_dataset_list=list(pre_dataset_collection.find())
pre_df=pd.DataFrame(pre_dataset_list)

user_collection=client['cinemania']['users']
user_list=list(user_collection.find())
similarity,similarity_genre,similarity_cast= file1.vectorization(pre_df)

def genre_func(genre_name,df1):
    df_list=[]
    
    for idx,row in df1.iterrows():
        for j in row['genre']:
            if j["name"]==genre_name:
                m_id=row['movie_id']
                m_name=row['movie_title']
                m_image=row['poster_image']
                df_list.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
                if(len(df_list)==30):
                    return df_list
                break
    return df_list

def top_rated(df,count1):
    new_df=df.sort_values(by=['rating'],ascending=False)
    movie_list=[]

    for idx,row in new_df.iterrows():
        m_id=row['movie_id']
        m_name=row['movie_title']
        m_image=row['poster_image']
        movie_list.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
        if(len(movie_list)>count1):
            break

    return movie_list

def trending(df,count1):
    new_df=df.sort_values(by=['count'],ascending=False)
    movie_list=[]

    for idx,row in new_df.iterrows():
        m_id=row['movie_id']
        m_name=row['movie_title']
        m_image=row['poster_image']
        movie_list.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
        if(len(movie_list)>count1):
            break
    
    return movie_list

@app.route("/userid",methods=['POST'])
def func1():
    user_id=request.get_json().get('user_id')
    
    for i in user_list:
        if(str(i['_id'])==user_id):
            watched_movies=i['previouslyWatched']
            break

    recommended_genre_list=[]
    recommended_cast_list=[]
    recommended_overall_list=[]
    top_rated_data=top_rated(df,20)
    popular_data=trending(df,20)

    if len(watched_movies)<5:
        cnt=20//len(watched_movies)
        for i in watched_movies:
            movie_obj=file1.recommend_movies(i,cnt,pre_df,similarity,similarity_genre,similarity_cast)
            recommended_genre_list= recommended_genre_list + movie_obj['genre_based']
            recommended_cast_list= recommended_cast_list + movie_obj['cast_based']
            recommended_overall_list= recommended_overall_list + movie_obj['all_feature']
    
    else:
        cnt=6
        for i in watched_movies:
            movie_obj=file1.recommend_movies(i,cnt,pre_df,similarity,similarity_genre,similarity_cast)
            recommended_genre_list= recommended_genre_list + movie_obj['genre_based']
            recommended_cast_list= recommended_cast_list + movie_obj['cast_based']
            recommended_overall_list= recommended_overall_list + movie_obj['all_feature']
            cnt=cnt-1
            if(cnt==1):
                break
    


    recommended_genre_data=[]
    recommended_cast_data=[]
    recommended_overall_data=[]

    for i in recommended_genre_list:
        for j in dataset_list:
            if(str(j['movie_id'])==i):
                m_id=j['movie_id']
                m_name=j['movie_title']
                m_image=j['poster_image']
                break
        recommended_genre_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})

    for i in recommended_cast_list:
        for j in dataset_list:
            if(str(j['movie_id'])==i):
                m_id=j['movie_id']
                m_name=j['movie_title']
                m_image=j['poster_image']
                break
        recommended_cast_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})

    for i in recommended_overall_list:
        for j in dataset_list:
            if(str(j['movie_id'])==i):
                m_id=j['movie_id']
                m_name=j['movie_title']
                m_image=j['poster_image']
                break
        recommended_overall_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})

    return json.dumps({'recommended_genre':recommended_genre_data, 'recommended_cast':recommended_cast_data, 'recommended_overall':recommended_overall_data, 'top_rated':top_rated_data, 'popular':popular_data}, default=str)


@app.route("/movieid",methods=['POST'])
def func2():
    movie_id=request.get_json().get('movie_id')
    movie_id=str(movie_id)

    recommended_list=file1.similar_movies(movie_id,15,pre_df,similarity)

    movie_data=[]
    for i in dataset_list:
        if(str(i['movie_id'])==movie_id):
            movie_data.append(i)
            break
    
    recommended_data=[]
    for i in recommended_list:
        for j in dataset_list:
            if(str(j['movie_id'])==i):
                m_id=j['movie_id']
                m_name=j['movie_title']
                m_image=j['poster_image']
                break
        recommended_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
    
    return json.dumps({'movie_data':movie_data, 'recommended':recommended_data}, default=str)


@app.route("/category",methods=['POST'])
def func3():
    category=request.get_json().get('category')
    
    movie_data=[]

    if(category=="top_rated"):

        top_rated_list=top_rated(df,50)

        for i in top_rated_list:
            for j in dataset_list:
                if(j['movie_id']==i):
                    m_id=j['movie_id']
                    m_name=j['movie_title']
                    m_image=j['poster_image']
                    break
            movie_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})

    elif(category=="popular"):

        popular_list=trending(df,50)

        for i in popular_list:
            for j in dataset_list:
                if(j['movie_id']==i):
                    m_id=j['movie_id']
                    m_name=j['movie_title']
                    m_image=j['poster_image']
                    break
            movie_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
    
    else:
        genre_list=['Crime', 'Comedy', 'Adventure', 'Action', 'ScienceFiction', 'Animation', 'Family', 'Drama', 'Romance', 'Mystery', 'Fantasy', 'Thriller', 'War', 'Western', 'History', 'Horror', 'Music', 'TVMovie', 'Documentary']

        for i in genre_list:
            if(i==category):
                movie_data=genre_func(category, df)
                break

    return json.dumps({'movie_data':movie_data}, default=str)


@app.route("/search",methods=['POST'])
def func4():
    movie_name=request.form['movie_name']

    movies_list=pre_df['movie_title']
    movie_name=process.extractOne(movie_name,movies_list)[0]
    movie_id=df[df['movie_title']==movie_name].iloc[0]
    movie_id=movie_id['movie_id']

    movies_list=file1.similar_movies(str(movie_id),50,pre_df,similarity)

    movies_data=[]
    for i in movies_list:
        for j in dataset_list:
            if(str(j['movie_id'])==i):
                m_id=j['movie_id']
                m_name=j['movie_title']
                m_image=j['poster_image']
                break
        movies_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})

    return json.dumps({'movie_data':movies_data}, default=str)


@app.route("/all",methods=['GET'])
def func5():
    # dataset_list=list(dataset_collection.find())
    
    all_data=[]
    cnt=0
    for i in dataset_list:
        m_id=i['movie_id']
        m_name=i['movie_title']
        m_image=i['poster_image']
        all_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
        cnt=cnt+1
        if(cnt==100):
            break

    return json.dumps({'all_movies':all_data}, default=str)


# update in mongodb
@app.route("/addmovie",methods=['POST'])
def func6():
    movie_details1=request.json
    movie_details=[]
    movie_details.append(movie_details1)
    one_row_df=pd.DataFrame(movie_details)

    global dataset_collection
    dataset_collection.insert_one(movie_details[0])
    new_dataset_list=list(dataset_collection.find())
    new_df=pd.DataFrame(new_dataset_list)
    global dataset_list
    dataset_list=new_dataset_list
    global df
    df=new_df

    pre_movie_details_df=file1.preprocess_dataset(one_row_df)
    first_row=pre_movie_details_df[0]
    pre_movie_details={'movie_id':first_row['movie_id'],
          'movie_title':first_row['movie_title'],
          'overview':first_row['overview'],
          'genre':first_row['genre'],
          'release_date':first_row['release_date'],
          'runtime':first_row['runtime'],
          'Director':first_row['director'],
          'Writer':first_row['writer'],
          'Cast':first_row['cast'],
          'tagline':first_row['tagline'],
          'poster_image':first_row['poster_image'],
          'background_image':first_row['background_image'],
          'language':first_row['language'],
          'country':first_row['country'],
          'rating':first_row['rating'],
          'A-rated':first_row['A_rated'],
          'trailer':first_row['trailer'],
          'count':first_row['count']}
    global pre_dataset_collection
    pre_dataset_collection.insert_one(pre_movie_details)
    new_pre_dataset_list=list(pre_dataset_collection.find())
    new_pre_df=pd.DataFrame(new_pre_dataset_list)
    global pre_dataset_list
    pre_dataset_list=new_pre_dataset_list
    global pre_df
    pre_df=new_pre_df
    
    all_data=[]
    cnt=0
    for i in dataset_list:
        m_id=i['movie_id']
        m_name=i['movie_title']
        m_image=i['poster_image']
        all_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
        cnt=cnt+1
        if(cnt==100):
            break

    return json.dumps({'all_movies':all_data}, default=str)


@app.route("/updatemovie",methods=['POST'])
def func7():
    movie_details=request.form['movie_details']   #[{}]
    one_row_df=pd.DataFrame(movie_details)

    global dataset_collection
    dataset_collection.replace_one({'movie_id':movie_details[0]['movie_id']}, movie_details[0])
    new_dataset_list=list(dataset_collection.find())
    new_df=pd.DataFrame(new_dataset_list)
    global dataset_list
    dataset_list=new_dataset_list
    global df
    df=new_df

    
    pre_movie_details_df=file1.preprocess_dataset(one_row_df)
    first_row=pre_movie_details_df[0]
    pre_movie_details={'movie_id':first_row['movie_id'],
          'movie_title':first_row['movie_title'],
          'overview':first_row['overview'],
          'genre':first_row['genre'],
          'release_date':first_row['release_date'],
          'runtime':first_row['runtime'],
          'Director':first_row['director'],
          'Writer':first_row['writer'],
          'Cast':first_row['cast'],
          'tagline':first_row['tagline'],
          'poster_image':first_row['poster_image'],
          'background_image':first_row['background_image'],
          'language':first_row['language'],
          'country':first_row['country'],
          'rating':first_row['rating'],
          'A-rated':first_row['A_rated'],
          'trailer':first_row['trailer'],
          'count':first_row['count']}
    global pre_dataset_collection
    pre_dataset_collection.replace_one({'movie_id':pre_movie_details['movie_id']}, pre_movie_details)
    new_pre_dataset_list=list(pre_dataset_collection.find())
    new_pre_df=pd.DataFrame(new_pre_dataset_list)
    global pre_dataset_list
    pre_dataset_list=new_pre_dataset_list
    global pre_df
    pre_df=new_pre_df

    all_data=[]
    cnt=0
    for i in dataset_list:
        m_id=i['movie_id']
        m_name=i['movie_title']
        m_image=i['poster_image']
        all_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
        cnt=cnt+1
        if(cnt==100):
            break

    return json.dumps({'all_movies':all_data}, default=str)


@app.route("/deletemovie",methods=['POST'])
def func8():
    movie_id=request.form['movie_id']

    global dataset_collection
    dataset_collection.delete_one({'movie_id':movie_id})
    new_dataset_list=list(dataset_collection.find())
    new_df=pd.DataFrame(new_dataset_list)
    global dataset_list
    dataset_list=new_dataset_list
    global df
    df=new_df

    global pre_dataset_collection
    pre_dataset_collection.delete_one({'movie_id':movie_id})
    new_pre_dataset_list=list(pre_dataset_collection.find())
    new_pre_df=pd.DataFrame(new_pre_dataset_list)
    global pre_dataset_list
    pre_dataset_list=new_pre_dataset_list
    global pre_df
    pre_df=new_pre_df
    
    all_data=[]
    cnt=0
    for i in dataset_list:
        m_id=i['movie_id']
        m_name=i['movie_title']
        m_image=i['poster_image']
        all_data.append({'movie_id':m_id, 'name':m_name, 'image':m_image})
        cnt=cnt+1
        if(cnt==100):
            break

    return json.dumps({'all_movies':all_data}, default=str)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)