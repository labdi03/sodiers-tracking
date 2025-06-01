from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='../frontend', static_url_path='')

latest_position = {'lat': 0.0, 'lon': 0.0}

@app.route('/api/gps', methods=['POST'])
def receive_gps():
    data = request.get_json()
    if 'lat' in data and 'lon' in data:
        latest_position['lat'] = data['lat']
        latest_position['lon'] = data['lon']
        return jsonify({"status": "success"})
    return jsonify({"status": "error"}), 400

@app.route('/api/position')
def get_position():
    return jsonify(latest_position)

@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
