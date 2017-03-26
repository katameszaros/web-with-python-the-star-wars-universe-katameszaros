from flask import *
import requests

app = Flask(__name__, static_url_path="", static_folder="static")
app.config.from_object(__name__)

app.config.update(dict(
    SECRET_KEY='development key',
    DEBUG='True'))

app.config.from_envvar('FLASKR_SETTINGS', silent=True)


def get_all_planets():
    response = requests.get('http://swapi.co/api/planets').json()
    all_planets = response['results']
    return all_planets


@app.route('/')
def show_start_html():
    return render_template("index.html")


def main():
    app.run()


if __name__ == '__main__':
    main()
