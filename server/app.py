from application import app
import socket

hostname = socket.gethostname()

ip_address = socket.gethostbyname(hostname)

if __name__ == '__main__':
    app.run(host=ip_address,debug=True)