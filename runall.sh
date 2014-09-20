killall node

echo "[start] express ping"
nohup ./lab/express_ping/server.js &

echo "[start] socket io"
nohup ./lab/socket_io/server.js &