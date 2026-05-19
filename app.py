""""current issues:
 - what would be the maximum number of bookings
 - has to not be able to book on top of existing bookings
 - spaces should only be red during a booking - currently changes as soon as one booking is done no matter for when
 - how can we tell when a space should be red??? would it use the actual current time
 - when bookings finish are they removed from db
 - can book in past
 - what is maximum number of hours bookable
"""

"""
to do:
 - pull all backend data on startup of application (automatically checks for currently reserved spaces)
 - add functionality for the is_available
 - validation to ensure that bookings cannot be overlapping on the same space 
 - pk issues - is it the autoincrement number or the space ID?
 - edit, delete, manage bookings from manage booking page
 - different car parks? data will need to be stored across the three of them, 3 different databases? might be tough
 - add comments across code to address broad points and to increase readability
 - input validation - error messages?
"""

import sqlite3
from flask import Flask, render_template, request

app = Flask(__name__)
DATABASE = 'bookings.db'

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                space_id INTEGER NOT NULL,
                time TEXT NOT NULL,
                date TEXT NOT NULL,
                hours INTEGER NOT NULL,
                is_available CHECK (is_available IN (0, 1))
            )
        """)
        conn.commit()

init_db()

def insert_data(time, date, hours, space_id):
    with sqlite3.connect(DATABASE) as conn:
        conn.execute("""
            INSERT INTO bookings (space_id, time, date, hours, is_available)
            VALUES (?, ?, ?, ?, ?)
        """, (space_id, time, date, hours, 1))
        conn.commit()

def return_entire_database():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings")
    database_contents  = cursor.fetchall()
    conn.close()
    return database_contents

return_entire_database()

def return_time_only(passed_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT time FROM bookings WHERE id = ?", (passed_id,))
    returned_time = cursor.fetchone()
    conn.close()
    return returned_time


def return_date_only(passed_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT date FROM bookings WHERE id = ?", (passed_id,))
    returned_date = cursor.fetchone()
    conn.close()
    return returned_date


def return_hours_only(passed_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT hours FROM bookings WHERE id = ?", (passed_id,))
    returned_hours = cursor.fetchone()
    conn.close()
    return returned_hours


def return_is_available(passed_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT is_available FROM bookings WHERE id = ?", (passed_id,))
    returned_availability = cursor.fetchone()
    conn.close()
    return returned_availability


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
    space_id = request.form.get('passed_id')
    insert_data(time, date, hours, space_id)
    return f"{space_id}, {time}, {date}, {hours} saved to DB"

@app.route('/get-bookings')
def get_bookings():
    return return_entire_database()

if __name__ == '__main__':
    app.run(debug=True)