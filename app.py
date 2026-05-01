""""current issues:
 - what would be the maximum number of bookings
 - assign each space to a id in db
 - has to not be able to book on top of existing bookings
 - spaces should only be red during a booking - currently changes as soon as one booking is done no matter for when
 - how can we tell when a space should be red??? would it use the actual current time
 - when bookings finish are they removed from db
 - better ui
 - can book in past
 - what is maximum number of hours booked
 -
"""

import sqlite3
from flask import Flask, render_template, request

#i think this wont be needed when we implement hannahs db, acts as a testing db
def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                time TEXT NOT NULL,
                date TEXT NOT NULL UNIQUE,
                hours INTEGER NOT NULL
            )
        """)
        conn.commit()

DATABASE = 'bookings.db'
init_db()

def insert_data(time,date,hours):
    db = sqlite3.connect(DATABASE)
    with sqlite3.connect(DATABASE) as db:
        db.execute(
            "INSERT INTO bookings (time, date, hours) VALUES (?, ?, ?)",
            (time, date, hours)
    )
    db.commit()

app = Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')

@app.route("/mainmenu")
def mainmenu():
    return render_template("mainmenu.html")

@app.route("/prevbookings")
def prevbookings():
    return render_template("prevbookings.html")

@app.route('/button-clicked', methods=['POST'])
def button_clicked():
    return "Button Clicked"

@app.route('/submit', methods=['POST'])
def submit():
    time = request.form.get('time')
    date = request.form.get('date')
    hours = request.form.get('hours')
    insert_data(time, date, hours)
    return f"{time}, {date}, {hours} saved to DB"
    #load new html template

if __name__ == '__main__':
    app.run(debug=True)