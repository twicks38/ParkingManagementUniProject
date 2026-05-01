from flask import Flask, render_template, request
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

if __name__ == '__main__':
    app.run(debug=True)