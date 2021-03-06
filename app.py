from flask import *

app = Flask(__name__, static_url_path="", static_folder="static")
app.config.from_object(__name__)

app.config.update(dict(
    SECRET_KEY='development key',
    DEBUG='True'))

app.config.from_envvar('FLASKR_SETTINGS', silent=True)

@app.route('/')
def show_start_html():
    return render_template("index.html")


def main():
    app.run()


if __name__ == '__main__':
    main()
