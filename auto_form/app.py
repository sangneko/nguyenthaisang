from flask import Flask, render_template
from form_filler import auto_fill_form
import threading

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/run')
def run_form():
    threading.Thread(target=auto_fill_form).start()
    return "📝 Đã chạy điền form! Vui lòng kiểm tra."

if __name__ == '__main__':
    app.run(debug=True)
