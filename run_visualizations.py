import pandas as pd
import plotly.express as px
import os
import kagglehub

path = kagglehub.dataset_download("bhushandivekar/video-game-sales-and-industry-data-1980-2024")
csv_path = os.path.join(path, "Video_Games_Sales_Cleaned.csv")
df = pd.read_csv(csv_path)

df['total_sales'] = pd.to_numeric(df['total_sales'], errors='coerce').fillna(0)
df['critic_score'] = pd.to_numeric(df['critic_score'], errors='coerce')

genre_summary = df.groupby('genre').agg(
    total_sales=('total_sales', 'sum'),
    avg_critic_score=('critic_score', 'mean'),
    game_count=('title', 'count')
).reset_index().sort_values(by='total_sales', ascending=False)

fig_pie = px.pie(
    genre_summary, 
    values='total_sales', 
    names='genre', 
    title='Market Share of Video Game Sales by Genre',
    hole=0.4,
    template='plotly_dark'
)
fig_pie.update_traces(textinfo='percent+label')
fig_pie.write_html("pie_chart_genre.html")

print("Files generated: bar_chart_genre.html, bubble_chart_genre.html, pie_chart_genre.html")
