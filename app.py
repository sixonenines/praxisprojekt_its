import sys
import io
from flask import Flask, request
import contextlib

app = Flask(__name__)

@app.route('/compile',methods = ['POST', 'GET'])
def compile_code():
    result = ""
    old_stdout = sys.stdout
    new_stdout = io.StringIO()
    sys.stdout = new_stdout
    if request.method == "POST":
        code = request.form.get('code')
        try:
            exec(code)
            result = sys.stdout.getvalue().strip()
            sys.stdout = old_stdout
        except Exception as e:
            print("Fehler beim Ausführen:", e)
            result = sys.stdout.getvalue().strip()
            sys.stdout = old_stdout
    return (f"The Result is: {str(result)}")

if __name__ == '__main__':
    app.run(debug = True)